const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title required to POST blog'],
  },
  body: {
    type: String,
    required: [true, 'Body is required to POST blog'],
  },
});

module.exports = mongoose.model('Post', postSchema);