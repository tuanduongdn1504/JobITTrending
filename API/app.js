const express = require("express");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const fs = require("fs");
import { PythonShell } from "python-shell";
var schedule = require("node-schedule");
const app = express();

app.use(express.json());
app.use(bodyParser.json());

schedule.scheduleJob({ hour: 16, minute: 55 }, crawling);
function crawling() {
  try {
    // pythonPath: "C:/Users/nguyendhn/Anaconda3/python",
    let options = {
      scriptPath: "./",
      pythonOptions: ["-u"] // get print results in real-time
    };
    PythonShell.run("jobs_crawling_itviec.py", options, function(err, results) {
      console.log("Results: %j", results);
    });
  } catch (err) {
    console.log(err);
  }
}

// Allow origin all
app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const router = express.Router();
const routePath = `${__dirname}/routes/`;
app.use(router);

// Dynamic import route files
fs.readdirSync(routePath).forEach(subRoutePath => {
  fs.readdirSync(routePath + subRoutePath).forEach(fileName => {
    if (`${routePath + subRoutePath}/${fileName.includes("Route")}`) {
      require(`${`${routePath + subRoutePath}/`}${fileName}`)(app, router);
    }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
