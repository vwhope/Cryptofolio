require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var cookieSession = require("cookie-session");

var db = require("./models");
var auth = require("./auth/auth");
var app = express();
var PORT = process.env.PORT || 3000;

// Setup Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(auth.initialize());
app.use(cookieSession({ name: "session", keys: ["token"] }));

// Setup Passport
app.use(auth.initialize());
auth.localStrategy();
auth.jwtStrategy();

// Setup Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Requrie routes
require("./routes/api")(app);
require("./routes/html")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
