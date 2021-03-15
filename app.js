const express = require("express");
var socket = require("socket.io");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require('mongoose');
const db = require("./connection")
const uri =
  "mongodb+srv://razi:7751930710b@thumbbat.gnmkw.mongodb.net/thumbBat?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Database connection established successfully !!");
})

app.use("/static", express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/", (req, res, next) => {
  res.render("index");
});
app.get("/toss", (req, res, next) => {
  res.render("tossScreen");
});
app.get("/game", (req, res, next) => {
  res.render("game");
});
app.get("/about", (req, res, next) => {
  res.render("about");
});
app.post("/addUser", (req, res, next) => {
  if (db.addUser(req.body.user))
    res.status(200).json("User Created")
  res.status(500).json('Some error occurred. Please try again later.')
});

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 400;
  next(err);
});

app.use((error, req, res, next) => {
  res.render("error", {
    errorMessage: error.message
  });
});

module.exports = app;