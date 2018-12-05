// var db = require("../models");
var utils = require("../utils/utils");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    utils.getNewsData(function(newsData) {
      var parsedNews = utils.parseNewsData(newsData);
      res.render("index", { newsFeed: parsedNews });
    });
    //res.render("index", { newsFeed: data });
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.render("index", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });
  });

  app.get("/login", function(req, res) {
    res.render("login");
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
