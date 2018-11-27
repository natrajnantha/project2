$(document).ready(function(){

    getMembers();
    
// This function calls the get method to get the dashboard statistics    
    function getMembers() {
        $.get("/api/indexdashboard", function(data){
            console.log(data);
            console.log("---------------");
            $("#lbltotalMembers").text(data.mbrCount);
            $("#lbltotalBooks").html(data.bookCount);
            $("#lbltotalRented").html(data.rentalCount);
            $("#lbltotalDelinquent").html(data.delinquentCount);
        });
    };
    });
