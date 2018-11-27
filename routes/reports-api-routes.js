var db = require("../models");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const moment = require('moment');
var current = moment().startOf('day').format('MMMM Do YYYY');

const app = express();
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


module.exports = function (app) {

     
    app.get("/api/listdelmembers", function (req, res) {        
        db.Member_rental_info.findAll({where: { return_due_date: { [Op.lt]: new Date() } , rental_status: { [Op.notIn]: ["RETURNED", "COMPLETED"] }}, include: [{model: db.Member_details},{model: db.Rental_book_details}]}).then(function (dbMember_rental_info) {
                res.json(dbMember_rental_info);
        });
    });

    app.post("/api/corrsgen", function (req, res) {

        const output = formatEmail(req);
    
        res.json(output);
    });

    app.post("/api/sendemail", function (req, res) {
        console.log("sendemail API call");
        console.log(req.body);

        const output = formatEmail(req);
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'testlibrary.manager@gmail.com',
                pass: 'ucla2018'  
            },
            tls:{
              rejectUnauthorized:false
            }
          });
        
          // setup email data with unicode symbols
          let mailOptions = {
              from: '"UCLA Bootcamp library manager" <testlibrary.manager@gmail.com>', // sender address
            to: `${req.body.Member_detail.email}`, // list of receivers
            subject: `${req.body.Rental_book_detail.title} Book - Delinquent...`, // Subject line
              html: output // html body
          };
        
          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  res.json({msg:'Error in sending email'});
                  return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);   
              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
              res.json({msg:'Email has been sent'});
          });
       
    });


    function formatEmail(req) {
        return ` 
        <ul style="list-style: none">
        <h2> The UCLA Bootcamp public Library </h2> 


        <h5> ${current}</h5>

            <li> ${req.body.Member_detail.first_name} ${req.body.Member_detail.last_name} </li>
            <li> ${req.body.Member_detail.address_line1} </li>
            <li> ${req.body.Member_detail.address_line2} </li>
            <li> ${req.body.Member_detail.city}, ${req.body.Member_detail.state} </li>
            <li> ${req.body.Member_detail.zipcode} </li>

        </ul>
        <h6> Dear ${req.body.Member_detail.first_name} ${req.body.Member_detail.last_name}, </h6>
        <p> This is to bring to your attention that 
        the book titled ${req.body.Rental_book_detail.title} that you borrowed on ${moment(req.body.date_rented).format('MMMM Do YYYY')} is overdue. It was due to be returned 
        on ${moment(req.body.return_due_date).format('MMMM Do YYYY')}. Please make arrangements to return the book or contact us if you have any questions  </p>

        <h5>Best Regards</h5>

        <h4>Library Management</h4>
        `
    }

};




