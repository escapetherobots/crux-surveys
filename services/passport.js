// main config library for passport
const passport = require('passport');
const keys = require('./../config/keys');
// main strategy - google
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//====================================================
// STRATEGY - GOOGLE
//====================================================
// setup Strategy - Google
// this strategy has a property with string of 'google'
// that will be used with the passport.authenticate method below!!!!!!!!!!!
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("google access token:::",accessToken);
      console.log("refresh token:::",refreshToken);
      console.log("profile:::",profile);
    }
  )
);
