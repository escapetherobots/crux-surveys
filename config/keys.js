// keys.js - determine dev or prod environment
// node_env on heroku will contain string = production
if(process.env.NODE_ENV === 'production'){
  // production environment - return heroku keys
  module.exports = require('./prod');
  
} else {
  // development environment - return dev keys
  module.exports = require('./dev');
}
