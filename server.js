const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

var PORT = process.env.PORT || 8080;

var db = require("./models");
const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// routes
app.use(require("./routes/api.js"));
// sync sequelize model
db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
