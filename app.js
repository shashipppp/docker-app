const express = require('express');

const app = express();

app.use('/', (req, res) => {
  res.send('Hi There....');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`node app running on port ${port}`));