$(document).ready(function(){

    var delinquencyList = [];
    var given = moment("2018-11-18", "YYYY-MM-DD");
    var current = moment().startOf('day');
    var delList = $("tbody");
    var delContainer = $(".tbl-container");
    var numberofDays = 0;
    var fineAmt = 0.0;
    var txnSelected = [];
  
    getMembers();
    
// This function gets the member rentals that has the due date thats past. The code calculates the number of days the book is over due and applies a fine amount of 10 cents per day
    function getMembers() {
        $.get("/api/listdelmembers", function(data){
            var rowsToAdd = [];

            delinquencyList = data;
            for(i=0;i< delinquencyList.length;i++)
            {
                given = moment(delinquencyList[i].return_due_date, "YYYY-MM-DD");
                numberofDays = moment.duration(given.diff(current)).asDays();
                fineAmt = Math.round(Math.abs(numberofDays * 0.10));
                rowsToAdd.push(createDelRow(delinquencyList[i]));
            }
            renderDelList(rowsToAdd);
        });
    };

    function createDelRow(delinquencyData) {
        var newTr = $("<tr>");
        newTr.data("memberdelq",delinquencyData);
        newTr.append("<td>" + delinquencyData.id + "</td>");
        newTr.append("<td>" + delinquencyData.Member_detail.last_name + "</td>");
        newTr.append("<td>" + delinquencyData.Member_detail.first_name + "</td>");
        newTr.append("<td>" + delinquencyData.Rental_book_detail.title + "</td>");
        newTr.append("<td>" + delinquencyData.date_rented + "</td>");
        newTr.append("<td>" + delinquencyData.return_due_date + "</td>");
        newTr.append("<td>" + numberofDays + "</td>");
        newTr.append("<td>" + fineAmt + "</td>");
        console.log("The TR derived*****");
        console.log(newTr);
        console.log("**************");
        return newTr;
    }

    function renderDelList(rows) {
        if (rows.length) {
            console.log(rows);
            $("#member-del-detail").append(rows);
        }
        else
        {
            renderEmpty();
        }
    }

    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("There are no delinquencies");
        delContainer.append(alertDiv);
    }

    $('#member-del-detail').on("click", "tr", function(event) {
        event.preventDefault();
        txnSelected = $(this).data('memberdelq');
        $("#fname").val(txnSelected.Member_detail.first_name);
        $("#lname").val(txnSelected.Member_detail.last_name);
        $("#address1").val(txnSelected.Member_detail.address_line1);
        $("#address2").val(txnSelected.Member_detail.address_line2);
        $("#city").val(txnSelected.Member_detail.city);
        $("#state").val(txnSelected.Member_detail.state);
        $("#zip").val(txnSelected.Member_detail.zipcode);
        $("#emailid").val(txnSelected.Member_detail.email);
    });



// This function sends a correspondence to the member email.
    $('#corsBtn').on("click", function(event) {
        event.preventDefault();
        var $jq = jQuery.noConflict();
        $jq.post('/api/corrsgen', txnSelected) 
        .done(function (data) {
            console.log('response = ' + JSON.stringify(data));
            $jq("#cmsgbody").html(data);
            $jq('#myModal').appendTo("body").modal('show');
        });
        });


    $("#modelclose").on("click", function(event) {
        event.preventDefault();
        location.reload();
    });


    $("#sendEmail").on("click", function(event) {
        event.preventDefault();
        var $jq = jQuery.noConflict();
        $jq.post('/api/sendemail', txnSelected)
        .done(function (data) {
            $jq("#emailMsg").val(data.msg);
            $jq("#sendEmail").prop('disabled',true);
        })
    })


    });
