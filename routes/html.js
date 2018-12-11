var utils = require("../utils/utils");
var auth = require("../auth/auth");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("splash", {
      layout: false
    });
  });

  app.get("/register", function(req, res) {
    res.render("register");
  });

  app.get("/dashboard", function(req, res) {
    utils.getNewsData(function(newsData) {
      var parsedNews = utils.parseNewsData(newsData);
      res.render("index", { newsFeed: parsedNews });
    });
  });

  app.get("/trade", auth.authenticate("jwtStrategy"), function(req, res) {
    res.render("trade");
  });

  app.get("/settings", auth.authenticate("jwtStrategy"), function(req, res) {
    res.render("settings");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
