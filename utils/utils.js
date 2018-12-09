var request = require("request");

function getCoinData(coinName, callback) {
  var url = "https://min-api.cryptocompare.com/data/histoday?fsym=";
  url += coinName;
  url += "&tsym=USD&limit=6";
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

function getMultipleCoinPrices(coinNames, callback) {
  var url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=";
  url += coinNames;
  url += "&tsyms=USD";
  url += "&api_key=";
  url += process.env.CRYPTOCOMPAREKEY;
  request.get(url, function(error, body) {
    if (error) {
      console.log(error);
    }
    var requestedPrices = JSON.parse(body.body);
    callback(requestedPrices);
  });
}

function getNewsData(callback) {
  var url = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN";
  request.get(url, function(error, body) {
    if (error) {
      console.log(error);
    }
    var newsFeed = JSON.parse(body.body);
    var newsFeedData = newsFeed.Data;
    callback(newsFeedData);
  });
}

function parseNewsData(newsData) {
  var feedArray = [];
  for (var id in newsData) {
    if (newsData.hasOwnProperty(id)) {
      var feed = {
        title: newsData[id].title,
        imageUrl: newsData[id].imageurl,
        link: newsData[id].url
      };
      feedArray.push(feed);
    }
  }
  return feedArray;
}

function compileInfo(dataToCompile, callback) {
  var parsedData = JSON.parse(JSON.stringify(dataToCompile));
  var arrayOfSymbols = [];
  for (var symbol in parsedData.Portfolios) {
    if (parsedData.Portfolios.hasOwnProperty(symbol)) {
      arrayOfSymbols.push(parsedData.Portfolios[symbol].symbol);
    }
  }
  var symbolsToString = arrayOfSymbols.toString();
  getMultipleCoinPrices(symbolsToString, function(prices) {
    var compiledData = {
      Portfolios: parsedData.Portfolios,
      Transactions: parsedData.Transactions
    };
    for (var i = 0; i < parsedData.Portfolios.length; i++) {
      if (prices.hasOwnProperty(parsedData.Portfolios[i].symbol)) {
        parsedData.Portfolios[i].price =
          prices[parsedData.Portfolios[i].symbol].USD;
      }
    }
    callback(compiledData);
  });
}

var utils = {
  getCoinData: getCoinData,
  getNewsData: getNewsData,
  parseNewsData: parseNewsData,
  compileInfo: compileInfo
};

module.exports = utils;
