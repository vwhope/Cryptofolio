var db = require("../models");
var cfg = require("../auth/config");
var utils = require("../utils/utils");
var jwt = require("jwt-simple");
var auth = require("../auth/auth");

module.exports = function(app) {
  app.get("/user", auth.authenticate(), function(req, res) {
    db.User.findOne({
      where: {
        id: req.user.id
      }
    }).then(function(user) {
      res.json(user);
    });
  });

  app.post("/authenticate", function(req, res) {
    if (req.body.email && req.body.password) {
      var email = req.body.email;
      var password = req.body.password;
      db.User.findOne({
        where: {
          email: email,
          password: password
        }
      }).then(function(user) {
        console.log(user);
        if (user) {
          var payload = {
            id: user.id
          };
          var token = jwt.encode(payload, cfg.jwtSecret);
          // Store token into cookieSession
          req.session.token = token;
          res.json({
            token: token
          });
        } else {
          res.sendStatus(401);
        }
      });
    } else {
      res.sendStatus(401);
    }
  });

  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  app.get("/api/:coin", function(req, res) {
    var coin = req.params.coin;
    utils.getCoinData(coin, function(coinData) {
      res.json(coinData);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
