var db = require("../models");

// Helper function
function hash (str) {
    var hash = 0;
    if (str.length == 0) {
        return hash;
    }
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

module.exports = function (app) {

  // Register
  /*
      {
        name: "some name",
        password: "some password"
      }
  */
  app.post("/api/users/register", function (req, res) {
    res.body.password = hash(req.body.password);
    db.Users.count({
        where: {
          name: req.body.name
        }
      }).then(function (count){
        if (count === 0) {
          db.Users.create(req.body).then(function (user) {
            res.json(user);
          });
        }
        else {
          res.status(500);
          res.send("User already exists.");
        }
    });
  });

  // Login
  /*
      {
        name: "some name",
        password: "some password"
      }
  */
  app.post("/api/users/login", function (req, res) {
    db.Users.findOne({
      where: {
        name: req.body.name,
        password: hash(req.body.password)
      }
    }).then(function (user){
      res.json(user);
    });
  });
}
