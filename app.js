const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

const { MONGO_IP, MONGO_USER, MONGO_PORT, MONGO_PASSWORD, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');
const postRoutes = require('./routes/Post');
const userRoutes = require('./routes/User');

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

const redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT,
  });

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION_SECRET,
  cookie: {
    secure: false,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    maxAge: 30000,
  }
}));
app.use(express.json());
app.use('/api/v1/test', (req, res) => {
  res.send('Hi There....');
});

//localhost:3000/posts
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/users', userRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`node app running on port ${port}`));