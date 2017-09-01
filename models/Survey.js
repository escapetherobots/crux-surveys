const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema], // has sub document of Recipient
  yes: {type: Number, default: 0},
  no: {type: Number, default: 0},
  _user: {type: Schema.Types.ObjectId, ref: 'User'}, // belongs to a User document
  dateSent: Date,
  lastResponded: Date
});

// create collection in DB called 'schemas'
// 2 arguments mean that you want to create a collection
// this will check if collection exists, if not it will create it at runtime
mongoose.model('surveys', surveySchema);
