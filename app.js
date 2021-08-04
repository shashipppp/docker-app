const express = require('express');
const mongoose = require('mongoose');
const { MONGO_IP, MONGO_USER, MONGO_PORT, MONGO_PASSWORD } = require('./config/config');

const app = express();

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Mongo DB Sucessfuly started....'))
  .catch(err => console.log(err));

app.use('/', (req, res) => {
  res.send('Hi There....');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`node app running on port ${port}`));