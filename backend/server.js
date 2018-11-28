const express = require("express");
const app = express();
const fetch = require("node-fetch");
const path = require("path");

app.use(function(req, res, next) {
  console.log(`${req.method}: ${req.url}`);
  return next();
});

app.use(express.static(path.join(__dirname, "statics")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function(req, res, next) {
  res.send("hello world");
  return next();
});

app.post("/fetchuser", function(req, res, next) {
  const username = req.body.username;
  const url = "https://api.github.com/users/" + `${username}` + "/followers";

  fetch(url)
    .then(res => res.json())
    .then(json => {
      const response = json.map(item => {
        return {
          login: item.login,
          avatar: item.avatar_url,
          url: item.html_url
        };
      });
      res.json(response);
    });
});

app.listen(3000);
