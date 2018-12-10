var db = require("../models");
var cfg = require("../auth/config");
var utils = require("../utils/utils");
var jwt = require("jwt-simple");
var auth = require("../auth/auth");

module.exports = function(app) {
  // Authenticate user and returns JWT
  app.post("/api/authenticate", function(req, res) {
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
            user: user.userName,
            email: email
          };
          var token = jwt.encode(payload, cfg.jwtSecret);
          // Store & return token
          req.session.email = email;
          req.session.created = created;
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

  app.get("/api/snapshot/:email", auth.authenticate("jwtStrategy"), function(
    req,
    res
  ) {
    db.User.findOne({
      attributes: [],
      where: {
        email: req.params.email
      },
      include: [
        {
          model: db.Portfolio,
          attributes: ["coin", "symbol", "holdings"]
        },
        {
          model: db.Transaction,
          attributes: ["type", "currency", "quantity"]
        }
      ]
    }).then(function(snapshotInfo) {
      utils.compileInfo(snapshotInfo, function(compiledInfo) {
        res.json(compiledInfo);
      });
    });
  });

  app.put("/api/updatePassword", function(req, res) {
    db.User.update(
      { password: req.body.password },
      { where: { email: req.body.email } }
    )
      .then(function(response) {
        res.status(200).json(response);
      })
      .catch(function(error) {
        res.status(304);
        console.log(error);
      });
  });

  app.get("/api/isLoggedIn", auth.authenticate("jwtStrategy"), function(
    req,
    res
  ) {
    res.status(200).json({
      email: req.session.email,
      userName: req.session.user.firstName + " " + req.session.user.lastName,
      createdAt: req.session.user.createdAt
    });
  });

  app.get("/api/:coin", auth.authenticate("jwtStrategy"), function(req, res) {
    var coin = req.params.coin;
    utils.getCoinData(coin, function(coinData) {
      res.json(coinData);
    });
  });
};
