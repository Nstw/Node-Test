const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");

app.use(function(req, res, next) {
  console.log(`${req.method}: ${req.url}`);
  return next();
});

app.use(express.static(path.join(__dirname, "statics")));

app.get("/", function(req, res, next) {
  res.send("hello world");
  return next();
});

app.get("/github/user/:name", (req, res) => {
  axios.get("https://api.github.com/users/pichaya/followers").then(response => {
    res.send(response.data);
    console.log("here followers: ", response);
  });
});

app.listen(3000);
