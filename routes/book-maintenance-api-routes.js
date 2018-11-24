var db = require("../models");

module.exports = function (app) {

    app.get("/api/listbook", function (req, res) {
        db.Rental_book_details.findAll({}).then(function (dbBook_details) {
            res.json(dbBook_details);
            console.log("works")
        });
    });
    app.get("/api/getbook/:id", function(req, res){
        db.Rental_book_details.findOne({
            where:{
                id: req.params.id
            }
        }).then(function(dbBook_details){
            console.log(dbBook_details);
            res.json(dbBook_details);
        });
    });
    app.post("/api/addbook", function (req, res) {
        console.log("Inside the API : " + req.body);
        db.Rental_book_details.create(req.body).then(function (dbBook_details) {
            console.log("record successfully created");
            res.json({
                "Message": "Created Book record",
                 });
        }).catch(function(err) {
            console.log("Library error : " + err);
            res.status(422).send(err.errors);
            console.log("*************");
            console.log(err.errors);
        });
    });
    app.put("/api/editbook/", function(req, res){
        db.Rental_book_details.update({
            title: req.body.title,
            book_author: req.body.author,
            book_summary: req.body.summary,
            rack_location: req.body.location,
            edition_number: req.body.edition,
           
        }, {
            where: {
                id: req.body.id
            }
        }).then(function(dbBook_details){
            res.json(dbBook_details);
        });
    });
};


