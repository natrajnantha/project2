// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {


  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/newmember", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/newmember.html"));
  });

  app.get("/editmember", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/editmember.html"));
  });

  app.get("/listmember", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/listmembers.html"));
  });

  app.get("/report1", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/listdelinquency.html"));
  });

};
