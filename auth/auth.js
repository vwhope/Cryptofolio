var passport = require("passport");
var passportJWT = require("passport-jwt");
var cfg = require("./config");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var JWTStrategy = passportJWT.Strategy;
var db = require("../models");
var params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt")
};
var jwtParams = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: function(req) {
    return req.session.token;
  }
};

var localStrategy = new Strategy(params, function(payload, done) {
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

var jwtStrategy = new JWTStrategy(jwtParams, function(jwtPayload, done) {
  if (jwtPayload.expires > Date.now()) {
    return done("jwt expired");
  }
  return done(null, jwtPayload);
});

module.exports = {
  localStrategy: function() {
    return passport.use(localStrategy);
  },

  jwtStrategy: function() {
    return passport.use(jwtStrategy);
  },

  initialize: function() {
    return passport.initialize();
  },

  authenticate: function() {
    return passport.authenticate("jwt", cfg.jwtSession);
  }
};
