const express = require('express');
require('./services/passport');

// setup Express
const app = express();
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
