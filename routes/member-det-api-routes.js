var db = require("../models");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function (app) {

    app.get("/api/indexdashboard", function (req, res) {

        db.Member_details.count().then(function (dbmbrcnt) {
            console.log("******Number of Member****");
            console.log(dbmbrcnt);
            n_dbmbrcnt = dbmbrcnt;

            db.Rental_book_details.count().then(function (dbbkcnt) {
                console.log("******Number of Books****");
                console.log(dbbkcnt);
                n_dbbkcnt = dbbkcnt;

                db.Member_rental_info.count({ where: { rental_status: { [Op.notIn]: ["RETURNED", "OMPLETED"] } } }).then(function (dbtotalrented) {
                    console.log("******Number of Books Rented****");
                    console.log(dbtotalrented);
                    n_dbtotalrented = dbtotalrented;

                    db.Member_rental_info.count({ where: { return_due_date: { [Op.lt]: new Date() } , rental_status: { [Op.notIn]: ["RETURNED", "COMPLETED"] }} }).then(function (dbtotdel) {
                        console.log("******Number of Books Delinquent****");
                        console.log(dbtotdel);

                        res.json({ mbrCount: dbmbrcnt, bookCount: dbbkcnt, rentalCount: dbtotalrented, delinquentCount: dbtotdel });
                    });
                });

            });

        });


    });

    app.get("/api/listmembers", function (req, res) {
        db.Member_details.findAll({}).then(function (dbMember_details) {
            res.json(dbMember_details);
        });
    });

    app.get("/api/getmember/:id", function (req, res) {
        db.Member_details.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbMember_details) {
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
        }).catch(function (err) {
            console.log("Library error : " + err);
            res.status(422).send(err.errors);
            console.log("*************");
            console.log(err.errors);
        });
    });

    app.put("/api/members/", function (req, res) {
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
            }).then(function (dbMember_details) {
                res.json(dbMember_details);
            });
    });
};




