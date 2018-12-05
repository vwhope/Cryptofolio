var db = require("../models");
var utils = require("../utils/utils");

module.exports = function(app) {
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
        userName: req.params.user
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
      res.render("index", {
        transactions: snapshotInfo.Transactions,
        newsFeed: []
      });
    });
  });
};
