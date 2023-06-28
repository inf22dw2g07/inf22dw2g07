

const passport = require('passport');
const GitHubStrategy = require("passport-github2").Strategy;

const GITHUB_CLIENT_ID = "b0bca2d4e82e8dadc5f3";
const GITHUB_CLIENT_SECRET = "f25dad5a9a28f83009191ce56c409a4ac30cc7c8";

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3009/auth/github/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});



