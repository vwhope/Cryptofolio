//var db = require("../models");
var utils = require("../utils/utils");

module.exports = function(app) {
  app.get("/", function(req, res) {
    utils.getNewsData(function(newsData) {
      var parsedNews = utils.parseNewsData(newsData);
      res.render("index", { newsFeed: parsedNews });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
