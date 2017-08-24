const passport = require('passport');

//====================================================
// HANDLERS
//====================================================
// route handler
module.exports = (app) => {

  app.get('/auth/google', passport.authenticate('google', {
      scope: ['profile', 'email'] // just get profile and email from google account
    })
  );

  // when this route is handled, passport.auth for google will provide auth code!
  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    req.logout(); // will destroy the cookie
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user); //show the requested user in the response
  });
}
