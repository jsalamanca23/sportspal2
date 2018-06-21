var db = require("../models");

module.exports = function (app) {

  // Login Screen
  app.get("/login", function (req, res) {
    res.render("login", {}); // send some object here
  });

  // Create Event Screen
  app.get("/create", function (req, res) {
    res.render("create", {}); // send some object here
  });

  // Personal/All Events Screen
  app.get("/events", function (req, res) {
    res.render("events", {}); // send some object here
  });
}
