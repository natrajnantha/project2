$(document).ready(function(){

    getMembers();
    
    function getMembers() {
        $.get("api/listdelmembers", function(data){
            var rowsToAdd = [];
            rowsToAdd.push(data);
            console.log(data);
            console.log("---------------");
            console.log(rowsToAdd);
    


            // var table = new Tabulator("#member-table", {
            //     data:data,
            //     height:"350px",
            //     layout:"fitColumns",
            //     pagination:"local",
            //     paginationSize:6,
            //     movableColumns:true,
            //     columns:[{title:"ID", field:"id", headerFilter:"input"},
            //              {title:"First Name", field:"first_name", headerFilter:"input"},
            //              {title:"Last Name", field:"last_name",  headerFilter:"input"},
            //              {title:"Address", field:"address_line1"},
            //              {title:"City", field:"city"},
            //              {title:"Zipcode", field:"zipcode"},
            //              {title:"Phone", field:"phone"},
            //              {title:"Join date", field:"date_of_join"},
            //              {title:"Status", field:"status"},
            //             ],
            //             rowClick:function(e, row){
            //                 alert("Row " + row.getIndex() + " Clicked!!!!")
            //             },
            // });
        });
    };
    });