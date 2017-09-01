const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer'); // require mailer class
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

// 1. check that user is logged in
// 2. check that user has enough credits

module.exports = (app) => {

  app.get('/api/surveys/thanks', (req, res) => {
    res.send('thanks for completing our survey!');
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
