var request = require("request");

function getCoinData(coinName, callback) {
  var url = "https://min-api.cryptocompare.com/data/histoday?fsym=";
  url += coinName;
  url += "&tsym=USD&limit=7";
  url += "&api_key=";
  url += process.env.CRYPTOCOMPAREKEY;
  request.get(url, function(error, body) {
    if (error) {
      console.log(error);
    }
    var requestedInfo = JSON.parse(body.body);
    var coinData = requestedInfo.Data;
    callback(coinData);
  });
}

var utils = {
  getCoinData: getCoinData
};

module.exports = utils;
