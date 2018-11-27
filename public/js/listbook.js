$(document).ready(function () {

    getBook();

    function getBook() {
        $.get("api/listbook", function (data) {
            var rowsToAdd = [];
            rowsToAdd.push(data);
            console.log(data);
            console.log("---------------");
            console.log(rowsToAdd);

            var table = new Tabulator("#booklist-table", {
                data: data,
                height: "350px",
                layout: "fitColumns",
                pagination: "local",
                paginationSize: 6,
                movableColumns: true,
                columns: [{ title: "ISBN", field: "isbn", headerFilter: "input" },
                { title: "Book Title", field: "title", headerFilter: "input" },
                { title: "Book Author", field: "book_author", headerFilter: "input" },
                { title: "Summary", field: "book_summary" },
                { title: "Location", field: "rack_location" },
                { title: "Edition", field: "edition_number" },
                { title: "Status", field: "stock_status" },
                ],
                rowClick: function (e, row) {
                    alert("Row " + row.getIndex() + " Clicked!!!!")
                },

            });
        });
    };
});