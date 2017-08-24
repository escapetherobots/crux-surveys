const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send({ hi: "world"});
});

// get environment var from Heroku
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
