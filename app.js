var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var studentRouter = require("./routes/student");

var app = express();
var mongoose = require("mongoose");

var dev_db_url =
  "mongodb+srv://Gauthier:23novembre2001@iut.k4fqx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/student", studentRouter);

module.exports = app;
