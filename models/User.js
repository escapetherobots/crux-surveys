const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

// create collection in DB called 'users'
// 2 arguments mean that you want to create a collection
// this will check if collection exists, if not it will create it at runtime
mongoose.model('users', userSchema);
