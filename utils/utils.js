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

var utils = {
  getCoinData: getCoinData,
  getNewsData: getNewsData,
  parseNewsData: parseNewsData
};

module.exports = utils;
