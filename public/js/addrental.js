$(document).ready(function () {

    var sessionMemberid = "";
    var inputRentalDate = $("#inputRentalDate");
    var inputReturnDate = $("#inputReturnDate");
    var rowsToAdd = [];
    $(document).on("submit", "#member-frm-id", handleMemberFetchSubmit);
    inputRentalDate = moment().format("YYYY-MM-DD");
    inputReturnDate = moment(inputRentalDate).add(7, 'days');

    $("#inputRentalDate").val(inputRentalDate);


    function getBook() {
        $.get("/api/listrentalbook", function (data) {

            var table = new Tabulator("#booklist-table", {
                data: data,
                height: "350px",
                layout: "fitColumns",
                pagination: "local",
                paginationSize: 6,
                movableColumns: true,
                selectable: 3,
                selectableRollingSelection: false,
                tooltips: true,
                tooltips: "Select a book for rental. Maximum allowed - 3 books per rental",
                columns: [{ title: "Book ID", field: "id" },
                { title: "ISBN", field: "isbn" },
                { title: "Book Title", field: "title", headerFilter: "input" },
                { title: "Book Author", field: "book_author", headerFilter: "input" },
                { title: "Summary", field: "book_summary" },
                { title: "Location", field: "rack_location" },
                { title: "Edition", field: "edition_number" },
                { title: "Status", field: "stock_status" },
                ],
                rowClick: function (e, row) {

                    var selectedRows = table.getSelectedRows(data);
                    rowsToAdd = [];
                    $("#selected-books-table").empty();
                    for (i = 0; i < selectedRows.length; i++) {
                        console.log("Row number " + i + " " + selectedRows[i]._row.data.title);
                        var newTr = $("<tr>");
                        newTr.append("<td>" + selectedRows[i]._row.data.id + "</td>");
                        newTr.append("<td>" + selectedRows[i]._row.data.title + "</td>");
                        newTr.append("<td>" + selectedRows[i]._row.data.book_author + "</td>");
                        newTr.append("<td>" + moment(inputReturnDate).format("YYYY-MM-DD") + "</td>");
                        rowsToAdd.push(selectedRows[i]._row.data.id);
                        $("#selected-books-table").append(newTr);
                    }

                },

            });
        });
    };


    function handleMemberFetchSubmit(event) {
        event.preventDefault();
        memberID = $("#inpid").val().trim();

        $("#booklist-table").empty();
        $("#selected-books-table").empty();

        $.get("/api/getmember/" + memberID, function (memberdetail) {
            if (memberdetail) {
                $("#fname").val(memberdetail.first_name);
                $("#lname").val(memberdetail.last_name);
                $("#status").val(memberdetail.status);
                sessionMemberid = memberdetail.id;

                getBook();

            } else {
                alert("Member info not found");
            }

        })
    };

    $("#addRentalBtn").on("click", handleRentalAddClick);

    function handleRentalAddClick(event) {
        event.preventDefault();
        var rentalFullFill = [];
        var rentalBooksIds = [];

        for (i = 0; i < rowsToAdd.length; i++) {


            var rentalRec = {
                date_rented: inputRentalDate,
                date_returned: null,
                return_due_date: inputReturnDate,
                rental_extension_count: 0,
                rental_status: 'RENTED',
                MemberDetailId: memberID,
                RentalBookDetailId: rowsToAdd[i]
            };
            rentalFullFill.push(rentalRec);
            rentalBooksIds.push(rowsToAdd[i]);
        }


// First create the rental rows for the books being rented and associate to the member and books. On successfull bulk create of rental records, then 
// update the books to 'RENTED' status. 
        $.ajax(
            {
                url: "/api/addrental",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(rentalFullFill),
                success: function (data) {
                    console.log("Records created successfully");

                    $.ajax(
                        {
                            url: "/api/updatebooks",
                            type: "PUT",
                            contentType: "application/json",
                            data: JSON.stringify(rentalBooksIds),
                            success: function (data) {
                                console.log("Book Records updated successfully");
                                alert("Rental added successfully");
                            },
                            error: function (xhr) {
                                alert("Error");
                                alert("Rental error during book status update, please check logs");
                            }
                        }
                    )

                },
                error: function (xhr) {
                    alert("Error");
                    alert("Rental error during rental info add, please check logs");
                }
            }
        )

    }
});