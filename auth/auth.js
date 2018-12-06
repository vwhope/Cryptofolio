var passport = require("passport");
var passportJWT = require("passport-jwt");
var cfg = require("./config");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var db = require("../models");
var params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt")
};

var strategy = new Strategy(params, function(payload, done) {
  db.User.findOne({
    where: {
      email: payload.email
    }
  }).then(function(user) {
    if (user) {
      return done(null, {
        email: payload.email
      });
    } else {
      return done(new Error("User not found"), null);
    }
  });
});

module.exports = {
  strategy: function() {
    return passport.use(strategy);
  },

  initialize: function() {
    return passport.initialize();
  },

  authenticate: function() {
    return passport.authenticate("jwt", cfg.jwtSession);
  }
};
