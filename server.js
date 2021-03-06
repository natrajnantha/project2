// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var Tabulator = require('tabulator-tables');
var moment = require('moment');

// Sets up the Express App
// =============================================================
var app = express();

var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/member-det-api-routes.js")(app);
require("./routes/reports-api-routes.js")(app);
require("./routes/book-maintenance-api-routes.js")(app);
require("./routes/rental-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
// db.sequelize.sync({ force: true }).then(function() {
db.sequelize.sync({ force: false, logging: console.log})
  .then(function () {
    app.listen(PORT, function () {
      console.log("App listening on PORT " + PORT);
    });
  }).catch(function (error) {
    console.log(error)
  });
//help