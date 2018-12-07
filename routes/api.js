var db = require("../models");
var cfg = require("../auth/config");
var utils = require("../utils/utils");
var jwt = require("jwt-simple");
//var auth = require("../auth/auth");

module.exports = function(app) {
  // Authenticate user and returns JWT
  app.post("/authenticate", function(req, res) {
    // Validate email and password is sent in the request
    if (req.body.email && req.body.password) {
      var email = req.body.email;
      var password = req.body.password;
      // Search in DB for user with email and password
      db.User.findOne({
        where: {
          email: email,
          password: password
        }
        // If found, create jwt token and store in cookie
      }).then(function(user) {
        if (user) {
          var payload = {
            email: email
          };
          var token = jwt.encode(payload, cfg.jwtSecret);
          // Store & return token
          req.session.token = token;
          res.json({ token: token });
        } else {
          res.status(401).send({ error: "Unauthorized" });
        }
      });
    } else {
      res.status(401).send({ error: "Unauthorized" });
    }
  });

  app.get("/api/:coin", function(req, res) {
    var coin = req.params.coin;
    utils.getCoinData(coin, function(coinData) {
      res.json(coinData);
    });
  });

  app.get("/api/snapshot/:user", function(req, res) {
    db.User.findOne({
      attributes: [],
      where: {
        userName: "demoUser"
      },
      include: [
        {
          model: db.Portfolio,
          attributes: ["coin", "holdings"]
        },
        {
          model: db.Transaction,
          attributes: ["type", "currency", "quantity"]
        }
      ]
    }).then(function(snapshotInfo) {
      res.json(snapshotInfo);
    });
  });
};
