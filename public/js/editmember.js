$(document).ready(function () {

    var fname = $("#fname");
    var lname = $("#lname");
    var inputdob = $("#inputdob")
    var inputAddress1 = $("#inputAddress1");
    var inputAddress2 = $("#inputAddress2");
    var inputAddress3 = $("#inputAddress3");
    var inputCity = $("#inputCity");
    var inputState = $("#inputState");
    var inputZip = $("#inputZip");
    var inputphone = $("#inputphone");
    var inputDoj = $("#inputDoj");
    var inputemail = $("#inputemail");
    var inputstatus = $("#status");
    var sessionMemberid = "";

    $(document).on("submit", "#member-frm-id", handleMemberFetchSubmit);
    $(document).on("submit", "#member-frm", handleMemberFormSubmit);

    function handleMemberFetchSubmit(event) {
        event.preventDefault();
        memberID = $("#inpid").val().trim();

// Call the get method to read the member record based on the input id        
        $.get("/api/getmember/" + memberID, function(memberdetail){
            console.log("Member info", memberdetail);
            if (memberdetail){
            console.log("Member first name " + memberdetail.first_name);
            $("#fname").val(memberdetail.first_name);
            $("#lname").val(memberdetail.last_name);
            $("#inputdob").val(memberdetail.date_of_birth);
            $("#inputAddress1").val(memberdetail.address_line1);
            $("#inputAddress2").val(memberdetail.address_line2);
            $("#inputAddress3").val(memberdetail.address_line3);
            $("#inputCity").val(memberdetail.city);
            $("#inputState").val(memberdetail.state);
            $("#inputZip").val(memberdetail.zipcode);
            $("#inputphone").val(memberdetail.phone);
            $("#inputDoj").val(memberdetail.date_of_join);
            $("#inputemail").val(memberdetail.email);
            $("#status").val(memberdetail.status);
            sessionMemberid = memberdetail.id;
        } else {
            alert("Member info not found");
        }
            
        })
    };

// This function updates the member details to member_details table    
    function handleMemberFormSubmit(event) {
        event.preventDefault();

        updateMember({
            id: sessionMemberid,
            first_name: fname.val().trim(),
            last_name: lname.val().trim(),
            date_of_birth: inputdob.val().trim(),
            address_line1: inputAddress1.val().trim(),
            address_line2: inputAddress2.val().trim(),
            address_line3: inputAddress3.val().trim(),
            city: inputCity.val().trim(),
            state: inputState.val().trim(),
            zipcode: inputZip.val().trim(),
            phone: inputphone.val().trim(),
            email: inputemail.val().trim(),
            date_of_join: inputDoj.val().trim(),
            status: inputstatus.val().trim()
        });

    }

// Call put method to update the member info to the member_details table    
    function updateMember(memberData) {

        $.ajax({
            method: "PUT",
            url: "/api/members/",
            data: memberData,
            success: function(data, textStatus, xhr){
                alert("Member record updated successfully");
            },
            error: function(xhr, textStatus, errorThrown){
                console.log(xhr);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });

    }

});