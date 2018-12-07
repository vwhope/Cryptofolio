//var db = require("../models");
var utils = require("../utils/utils");
var auth = require("../auth/auth");

module.exports = function(app) {
  app.get("/", function() {
    res.render("splash");
  });

  app.get("/dashboard", auth.authenticate("jwtStrategy"), function(req, res) {
    utils.getNewsData(function(newsData) {
      var parsedNews = utils.parseNewsData(newsData);
      res.render("index", { newsFeed: parsedNews });
    });
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.get("/trade", function(req, res) {
    res.render("trade");
  });

  // // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
