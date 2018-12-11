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
            email: user.email
          };
          var token = jwt.encode(payload, cfg.jwtSecret);
          // Store & return token
          req.session.token = token;
          req.session.firstName = user.firstName;
          req.session.lastName = user.lastName;
          req.session.email = user.email;
          req.session.createdAt = user.createdAt;
          res.json({
            token: token,
            email: req.session.email,
            userName: req.session.firstName + " " + req.session.lastName
          });
        } else {
          res.status(401).send({ error: "Unauthorized" });
        }
      });
    } else {
      res.status(401).send({ error: "Unauthorized" });
    }
  });

  app.post("/api/newUser", function(req, res) {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
      .then(function(response) {
        res.status(200).json(response);
      })
      .catch(function(error) {
        res.status(302).json(error);
      });
  });

  app.get(
    "/api/getMultipleCoinPrices/:symbols",
    auth.authenticate("jwtStrategy"),
    function(req, res) {
      console.log(req.params.symbols);
      utils.getMultipleCoinPrices(req.params.symbols, function(data) {
        res.json(data);
      });
    }
  );

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
      if (snapshotInfo) {
        utils.compileInfo(snapshotInfo, function(compiledInfo) {
          res.json(compiledInfo);
        });
      }
    });
  });

  // This route handles Transactions which can be either buying or selling
  app.post("/api/trade", function(req, res) {
    var transactionType = req.body.transactionType;
    var userEmail = req.body.email;
    var coinName = req.body.coinName;
    var quantity = parseFloat(req.body.quantity);
    var symbol = req.body.symbol;
    // If a purchase is to be made
    if (transactionType === "buy") {
      //Check the database if user has this type of currency
      utils.getHoldings(userEmail, symbol, function(holdings) {
        if (holdings) {
          // If user has this currency, update quantity
          var parsedHoldinsgsObj = JSON.parse(JSON.stringify(holdings));
          var currentHoldings = parseFloat(parsedHoldinsgsObj.holdings);
          currentHoldings += quantity;
          utils.updateHoldings(userEmail, symbol, currentHoldings, function() {
            // Add transaction to database
            utils.createTransactionRecord(
              transactionType,
              coinName,
              quantity,
              userEmail,
              function(response) {
                res.status(200).json(response);
              }
            );
          });
        } else {
          // User does not have any currency of that type therefore a new entry will be
          // created.
          utils.createPortfolioEntry(
            quantity,
            true,
            symbol,
            coinName,
            userEmail,
            function() {
              // Add transaction to database
              utils.createTransactionRecord(
                transactionType,
                coinName,
                quantity,
                userEmail,
                function(response) {
                  res.status(200).json(response);
                }
              );
            }
          );
        }
      });
    } else if (transactionType === "sell") {
      // Query database, check to see if the user has the item they are trying to sell
      utils.getHoldings(userEmail, symbol, function(holdings) {
        var parsedHoldinsgsObj = JSON.parse(JSON.stringify(holdings));
        var currentHoldings = parseFloat(parsedHoldinsgsObj.holdings);
        // If user has the item they are trying to sell
        if (currentHoldings) {
          // If the quantity of the current holding is more than what user is trying to
          // sell make no change to the database and return status and message
          if (currentHoldings < quantity) {
            res
              .status(302)
              .json({ message: "Cannot sell more items that what you hold" });
          } else if (currentHoldings === quantity) {
            // If the current holding is equal to the quantity of coin being sold
            // remove the coin from the portfolio and create transaction record
            utils.removeFromPortfolio(userEmail, symbol, function() {
              utils.createTransactionRecord(
                transactionType,
                coinName,
                quantity,
                userEmail,
                function(response) {
                  res.status(200).json(response);
                }
              );
            });
          } else {
            // Else subtract the quantity from the current holding and update the portfolio and create
            // transaction record
            currentHoldings -= quantity;
            utils.updateHoldings(
              userEmail,
              symbol,
              currentHoldings,
              function() {
                utils.createTransactionRecord(
                  transactionType,
                  coinName,
                  quantity,
                  userEmail,
                  function(response) {
                    res.status(200).json(response);
                  }
                );
              }
            );
          }
        } else {
          res
            .status(302)
            .json({ message: "Cannot sell coin that you do not own" });
        }
      });
    }
  });

  app.put("/api/updatePassword", auth.authenticate("jwtStrategy"), function(
    req,
    res
  ) {
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
      userName: req.session.firstName + " " + req.session.lastName,
      createdAt: req.session.createdAt
    });
  });

  app.get("/api/:coin", auth.authenticate("jwtStrategy"), function(req, res) {
    var coin = req.params.coin;
    utils.getCoinData(coin, function(coinData) {
      res.json(coinData);
    });
  });
};
