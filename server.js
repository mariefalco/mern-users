const express = require("express"),
  app = express(),
  path = require("path"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  mongoose = require("mongoose"),
  config = require("./api/config/config"),
  //created model loading
  User = require("./api/models/userModel");

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.db, { useNewUrlParser: true, useCreateIndex: true });

//check mongoose connection
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully!");
});
connection.on("error", err => {
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running. " + err
  );
  process.exit();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// middleware
app.use(passport.initialize());
var passportMiddleware = require("./api/middleware/passport");
passport.use(passportMiddleware);

app.use(express.static(path.join(__dirname, "build")));

module.exports = app;
