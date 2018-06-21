var db = require("../models");

module.exports = function (app) {

  // Retrieve all events
  app.get("/api/events", function (req, res) {
    db.Events.findAll({}).then(function (events) {
      res.json(events);
    });
  });

  // Retrieve all events for a specific user
  app.get("/api/events", function (req, res) {
    var query = {};
    if (req.query.user_id) {
      query["id"] = req.query.user_id;
    }
    db.Events.findAll({
      include: [{
        where: query,
        model: db.Users
      }]
    }).then(function (events) {
      res.json(events);
    });
  });

  // Create an event, also adding an association to our association table
  /*
    {
      name: "Some name",
      description: "some description",
      location: "some location",
      time: "some time in milliseconds"
    }
  */
  app.post("/api/events", function (req, res) {
    db.Events.create({
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      time: req.body.time
    }).then(function (event) {
      db.UsersEvents.create({
        UsersId: req.body.UsersId,
        EventsId: req.body.EventsId
      }).then(function (pair) {
        res.json(event);
      });
    });
  });
}
