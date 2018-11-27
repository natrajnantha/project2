var db = require("../models");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function (app) {

    app.get("/api/listrentalbook", function (req, res) {
        console.log("In listrentalbook API");
        db.Rental_book_details.findAll({where: {stock_status: {[Op.ne]: 'RENTED'}}}).then(function (dbBook_details) {
            res.json(dbBook_details);
        });
    });

    app.post("/api/addrental", function (req, res) {
        var rentalObj = req.body;
        db.Member_rental_info.bulkCreate(rentalObj, {ignoreDuplicates: true}).then(function (dbMember_details) {
                console.log("record successfully created");
            res.json({
                "Message": "Created rental record",
            });
        }).catch(function (err) {
            console.log("Library error : " + err);
            res.status(422).send(err.errors);
            console.log("*************");
            console.log(err.errors);
        });
    });


    app.put("/api/updatebooks", function (req, res) {
        var rentalObj = req.body;

        db.Rental_book_details.update({
            stock_status: 'RENTED'
        }, {
                where: {
                    id: {[Op.in]: rentalObj}
                }
            }).then(function (dbMember_details) {
                res.json(dbMember_details);
            });
    });
};





