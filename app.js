var express = require("express");
var bodyParser = require("body-parser");
var hbs = require("express-handlebars");

var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");

app.engine("handlebars", hbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

app.use(express.static("public"));

// Routes
require("./controllers/events.js")(app);
require("./controllers/html.js")(app);
require("./controllers/users.js")(app);

db.sequelize.sync({force: false}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
