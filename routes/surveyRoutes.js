const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer'); // require mailer class
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

// PARSE WEBHOOK DATA FROM SENDGRID
const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url'); // part of NODE library!!!

const Survey = mongoose.model('surveys');

// 1. check that user is logged in
// 2. check that user has enough credits

module.exports = (app) => {

  // authentication required
  app.get('/api/surveys', requireLogin,  async (req, res) => {
      // req.user = the user
      const surveys = await Survey
        .find({ _user: req.user.id })
        .select({ recipients: false });
      res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('thanks for completing our survey!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice'); // this is the query string
    // process logic for incoming webhook data

    const events = _.chain(req.body)
      .map( (event) => {
        const match = p.test(new URL(event.url).pathname);
        if (match) {
          return {
            email: event.email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      .compact() // filters out undefined
      .uniqBy('email', 'surveyId') // ensures uniqueness on emails
      .each( event => {
        // run an update query on MongoDB / MLab
        Survey.updateOne({
          _id: event.surveyId,
          recipients: {
            $elemMatch: { email: event.email, responded: false }
          }
        },
        {
          $inc: { [event.choice]: 1 },
          $set: { 'recipients.$.responded': true},
          lastResponded: new Date()
        }).exec(); // execute the query
      })
      .value();

    console.log(events);
    res.send({}); // sendgrid will only access this route handler and they don't care what is sent back

  });

  // requires req.user authorization argument
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    // create survey collection in preparation for the DB - save it below
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map( (email) => ({email: email.trim()}) ),
      _user: req.user.id,
      dateSent: Date.now()
      // add custom url prop for user based on response
    });

    // check that email sent successfully then save the survey document
    const mailer = new Mailer(survey, surveyTemplate(survey));

    // Send Actual Email
    // ========================================================
    try{ // if anything goes wrong with sendig the email or updating the user credits
      // IMPORTANT!!!
      // mailer.send is an async function so we need to update this route handler callback to be async
      await mailer.send(); // this method comes from the class and uses the template from above

      // once the mailer sends off successfully then save the actual survey to the db
      await survey.save();
      // remove credits
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user); // send the response back to the client with the returned/updated user data!
    } catch(err) {
      res.status(422).send(err);
    }

  });


}
