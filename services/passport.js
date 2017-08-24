// main config library for passport
const passport = require('passport');
const keys = require('./../config/keys');
// main strategy - google
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// mongoose library
const mongoose = require('mongoose');

// this is to fetch data from that collection: only 1 argument
const User = mongoose.model('users');

//====================================================
// STRATEGY - GOOGLE
//====================================================

// ******************************
// serialize user
passport.serializeUser( (user, done) => {
  done(null, user.id) //user.id is a shortcut for: user._id
});

passport.deserializeUser( (id, done) => { // id = the id stored in the cookie
  // search for the user that has the desereialized id
  User.findById(id)
    .then(user => {
      done(null, user)
    })
});


// ******************************
// setup Strategy - Google
// this strategy has a property with string of 'google'
// that will be used with the passport.authenticate method below!!!!!!!!!!!
console.log('Google key:', keys.googleClientID);
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true // allow proxy requests with heroku
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log("google access token:::",accessToken);
      // console.log("refresh token:::",refreshToken);
      // console.log("profile:::",profile.id);
      // create a new user instance and then save it to the db through mongoose.
      // check if user already exists first!
      // this returns a promise
      User.findOne({googleId: profile.id})
        .then(
          (existingUser) => {
            if(existingUser){
              // user exists:
              console.log('cookie key:::::',keys.cookieKey);
              console.log('existing user confirmed', existingUser.id);
              done(null, existingUser);
            } else {
              // no user exists with profile.id:
              new User({googleId: profile.id})
                .save()
                .then( //this will handle the newly created user which is returned from DB
                  (user) => {
                    console.log('new user created');
                    done(null, user);
                  }
                );  // end then method
            }
          },
          (error) => {
            console.log('user query promise fail', error);
          }
        );

    }
  )
);
