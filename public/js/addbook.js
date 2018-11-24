//$(document).ready(function () {



 $("#addbook-frm").on("submit", function(event){
    event.preventDefault()
    var ISBN = $("#fisbn").val()
    var title = $("#fbooktitle").val()
    var author = $("#fbookauthor").val()
    var summary = $("#fbooksummary").val()
    var location = $("#fracklocation").val()
    var edition = $("#fedition").val()
    var payload = {
      isbn:ISBN,
      title: title,
      book_author: author,
      book_summary:summary,
      rack_location: location,
      edition_number: edition,
        }
    console.log(payload);
    $.post("/api/addbook",payload, function(data){
      console.log(data)
      alert("Book Added")
      
    })
  })
//});