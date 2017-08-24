// keys.js - determine dev or prod environment
// node_env on heroku will contain string = production
if(process.env.NODE_ENV === 'production'){
  // production environment - return heroku keys

  const prodKeys = require('./prod');
  console.log('production keys loading', prodKeys.googleClientID);
  module.exports = prodKeys;
} else {
  // development environment - return dev keys
  console.log('dev keys loading');
  module.exports = require('./dev');
}
