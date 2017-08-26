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
  // this will reroute from the callback to passport.authenticate('google')
  // passport.authenticate is a middleware!!!
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),  // 1st middleware
    (req, res) => {                   // 2nd middleware - res.redirect
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout(); // will destroy the cookie
    // res.send(req.user);
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user); //show the requested "current_user" user in the response
  });
}
