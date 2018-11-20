var db = require("../models");

module.exports = function (app) {


    app.get("/api/listmembers", function (req, res) {
        db.Member_details.findAll({}).then(function (dbMember_details) {
            res.json(dbMember_details);
        });
    });

    app.get("/api/getmember/:id", function(req, res){
        db.Member_details.findOne({
            where:{
                id: req.params.id
            }
        }).then(function(dbMember_details){
            console.log(dbMember_details);
            res.json(dbMember_details);
        });
    });


    app.post("/api/members", function (req, res) {
        console.log("Inside the API : " + req.body);
        db.Member_details.create(req.body).then(function (dbMember_details) {
            console.log("record successfully created");
            res.json({
                "Message": "Created Member record",
                "Name ": dbMember_details.last_name
            });
        }).catch(function(err) {
            console.log("Library error : " + err);
            res.status(422).send(err.errors);
            console.log("*************");
            console.log(err.errors);
        });
    });
};

// models.Item.create({
//     title: req.body.title,
//     UserId: req.body.UserId
// }).then(function (item) {
//     res.json({
//         "Message": "Created item.",
//         "Item": item
//     });
// }).catch(function (err) {
//     res.json(err);
// });