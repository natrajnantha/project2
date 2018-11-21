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

    app.put("/api/members/", function(req, res){
        db.Member_details.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            date_of_birth: req.body.date_of_birth,
            address_line1: req.body.address_line1,
            address_line2: req.body.address_line2,
            address_line3: req.body.address_line3,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            phone: req.body.phone,
            date_of_join: req.body.date_of_join,
            email: req.body.email,
            status: req.body.status
        }, {
            where: {
                id: req.body.id
            }
        }).then(function(dbMember_details){
            res.json(dbMember_details);
        });
    });
};




