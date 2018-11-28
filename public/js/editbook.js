$(document).ready(function () {

    var id = $("#fid")
    var title = $("#fbooktitle")
    var book_author = $("#fbookauthor")
    var book_summary = $("#fbooksummary")
    var rack_location = $("#fracklocation")
    var edition_number = $("#fedition")
    var sessionBookid = "";
    var stock_status = $("#status");

    $(document).on("submit", "#book-frm-id", handleBookFetchSubmit);
    $(document).on("submit", "#book-frm", handleBookFormSubmit);

    function handleBookFetchSubmit(event) {
        event.preventDefault();
        id= $("#fid").val().trim();

        $.get("/api/getbook/" + id, function (bookdetail) {
            $("#fid").val(bookdetail.id);
            $("#fbooktitle").val(bookdetail.title);
            $("#fbookauthor").val(bookdetail.book_author);
            $("#fbooksummary").val(bookdetail.book_summary);
            $("#fracklocation").val(bookdetail.rack_location);
            $("#fedition").val(bookdetail.edition_number);
            sessionBookid = bookdetail.id;
            $("#status").val(stock_status);
        })
    };

    function handleBookFormSubmit(event) {
        event.preventDefault();

        updateBook({
            id: sessionBookid,
            title: title.val().trim(),
            book_author: book_author.val().trim(),
            book_summary: book_summary.val().trim(),
            rack_location: rack_location.val().trim(),
            edition_number: edition_number.val().trim(),
            stock_status: stock_status.val().trim(),

            
        });

    }

    function updateBook(bookData) {
        console.log("Session book id " + sessionBookid);
        
        console.log(bookData);



        $.ajax({
            method: "PUT",
            url: "/api/editbook/",
            data: bookData,
            success: function (data, textStatus, xhr) {
                alert("Book record updated successfully");
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });


    }

});