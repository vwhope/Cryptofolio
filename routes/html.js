var db = require("../models");
var utils = require("../utils/utils");

module.exports = function(app) {
  app.get("/", function(req, res) {
    utils.getNewsData(function(newsData) {
      var parsedNews = utils.parseNewsData(newsData);
      db.User.findOne({
        attributes: [],
        where: {
          userName: "demoUser"
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
          newsFeed: parsedNews,
          portfolios: snapshotInfo.Portfolios
        });
      });
    });
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
