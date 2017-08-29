const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

// order of operation: model first, then passport
require('./models/User');
require('./services/passport');

// connect to cloud MongoDB
mongoose.connect(keys.mongoURI);

// setup Express
const app = express();

//====================================================
// MiddleWare to integrate passport and cookie sessions
//====================================================
// middleware to parse body of any post request to json format!
app.use(bodyParser.json());

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
require('./routes/billingRoutes')(app);

// production environment setup
if(process.env.NODE_ENV === 'production') {
  // Express to serve up production assets = main.js, main.css files
  app.use(express.static('client/build'));

  // if the above line doesn't catch a path then this one will
  // Express will serve up index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })


}


//====================================================
// PORTS
//====================================================
// get environment var from Heroku
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
