const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

// takes argument app from express on index.js
module.exports = app => {
  // express can take any number of middlewares like: requireLogin
  // requireLogin will get called by the app.post handler
  app.post('/api/stripe', requireLogin, async (req, res) => {

    //console.log('stripe request body>>>>>',req.body);
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    // access model using req.user (this uses passport) and add credits
    // passport is connected to express in the index.js file:
    // passport.initialize();
    // passport.session();
    //console.log(charge);

    // req.user is the currently authorized user through the user model
    req.user.credits += 5;
    const user = await req.user.save(); // async request

    res.send(user);
  })

};
