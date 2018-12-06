var db = require("../models");
<<<<<<< HEAD
var cfg = require("../auth/config");
=======
>>>>>>> master
var utils = require("../utils/utils");
var jwt = require("jwt-simple");
var auth = require("../auth/auth");

module.exports = function(app) {
  app.get("/test", auth.authenticate("jwtStrategy"), function(req, res) {
    res.render("test");
  });

  // Authenticate user and returns JWT
  app.post("/authenticate", function(req, res) {
    // Validate email and password is sent
    if (req.body.email && req.body.password) {
      var email = req.body.email;
      var password = req.body.password;
      db.User.findOne({
        where: {
          email: email,
          password: password
        }
      }).then(function(user) {
        if (user) {
          var payload = {
            email: email
          };
          var token = jwt.encode(payload, cfg.jwtSecret);
          // Store & return token
          req.session.token = token;
          // res.json({ token: token });
          res.redirect("/test");
        } else {
          res.json({ error: true });
        }
      });
    } else {
      res.status(401).send({ error: "Unauthorized" });
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
