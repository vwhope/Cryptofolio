var utils = require("../utils/utils");

module.exports = function(app) {
  app.get("/api/:coin", function(req, res) {
    var coin = req.params.coin;
    utils.getCoinData(coin, function(coinData) {
      res.json(coinData);
    });
  });
};
