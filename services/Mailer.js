const sendGrid = require('sendgrid');
const helper = sendGrid.mail;
const keys = require('./../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) { // recipients is a destructured arguement from the sub record db
      super();

      this.sendGridApi = sendGrid(keys.sendGridKey);
      this.from_email = new helper.Email('no-reply@crux-surveys.com');
      this.subject = subject;
      this.body = new helper.Content('text/html', content);
      this.recipients = this.formatAddresses(recipients);

      // EXTENDED BASE CLASS: provided by helper.Mail
      this.addContent(this.body);

      // CUSTOM METHOD:
      //click tracking allows sendgrid to replace all links with their trackable links
      this.addClickTracking();

      // CUSTOM METHOD:
      this.addRecipients();

  }

  formatAddresses(recipients){ // get destructured email from recipient record
    return recipients.map( ({ email }) => {
      // format with the email helper
      return new helper.Email(email);
    });
  }

  addClickTracking(){
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients(){
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });

    this.addPersonalization(personalize); // method from base clase
  }

  async send(){
    const request = this.sendGridApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON() // defined by base class
    });

    const response = await this.sendGridApi.API(request);
    return response; // response is returned from this async function

  }


}

module.exports = Mailer;
