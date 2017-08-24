const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

// order of operation: model first, then passport
require('./models/User');
require('./services/passport');


// connect to cloud MongoDB
mongoose.connect(keys.mongoURI);

// setup Express
const app = express();
console.log('Google key:', keys.googleClientID);
//====================================================
// MiddleWare to integrate passport and cookie sessions
//====================================================
// express to use cookieSession when processing routes
app.use(
  cookieSession({
    // 30 days * 24 hours/day * 60 min/hour * 60 sec/min * 1000 milliseconds to 1 sec
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// run express handlers
require('./routes/authRoutes')(app);


//====================================================
// PORTS
//====================================================
// get environment var from Heroku
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
