var db = require("../models");

module.exports = function (app) {


    app.get("/api/listdelmembers", function (req, res) {
        db.Member_rental_info.findAll({include: [{model: db.Member_details},{model: db.Rental_book_details}]}).then(function (dbMember_rental_info) {
        // db.Member_rental_info.findAll({include: {all: true}}).then(function (dbMember_rental_info) {
                res.json(dbMember_rental_info);
        });
    });


};




