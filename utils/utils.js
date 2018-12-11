var db = require("../models");

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

function getHoldings(userEmail, symbol, callback) {
  db.Portfolio.findOne({
    attributes: ["holdings"],
    where: {
      UserEmail: userEmail,
      symbol: symbol
    }
  })
    .then(function(holdings) {
      callback(holdings);
    })
    .catch(function(error) {
      callback(error);
    });
}

function updateHoldings(userEmail, symbol, updatedHoldings, callback) {
  db.Portfolio.update(
    {
      holdings: updatedHoldings
    },
    {
      where: {
        UserEmail: userEmail,
        symbol: symbol
      }
    }
  )
    .then(function(response) {
      callback(response);
    })
    .catch(function(error) {
      callback(error);
    });
}

function createTransactionRecord(
  transactionType,
  coinName,
  quantity,
  userEmail,
  callback
) {
  db.Transaction.create({
    type: transactionType,
    currency: coinName,
    quantity: quantity,
    UserEmail: userEmail
  })
    .then(function(response) {
      callback(response);
    })
    .catch(function(error) {
      callback(error);
    });
}

function createPortfolioEntry(
  quantity,
  own,
  symbol,
  coinName,
  userEmail,
  callback
) {
  db.Portfolio.create({
    holdings: quantity,
    own: own,
    symbol: symbol,
    coin: coinName,
    UserEmail: userEmail
  })
    .then(function(response) {
      callback(response);
    })
    .catch(function(error) {
      callback(error);
    });
}

function removeFromPortfolio(userEmail, symbol, callback) {
  db.Portfolio.destroy({
    where: {
      UserEmail: userEmail,
      symbol: symbol
    }
  })
    .then(function(response) {
      callback(response);
    })
    .catch(function(error) {
      callback(error);
    });
}

var utils = {
  getCoinData: getCoinData,
  getNewsData: getNewsData,
  parseNewsData: parseNewsData,
  compileInfo: compileInfo,
  getHoldings: getHoldings,
  updateHoldings: updateHoldings,
  createTransactionRecord: createTransactionRecord,
  createPortfolioEntry: createPortfolioEntry,
  removeFromPortfolio: removeFromPortfolio,
  getMultipleCoinPrices: getMultipleCoinPrices
};

module.exports = utils;
