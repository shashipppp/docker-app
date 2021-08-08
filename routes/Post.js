const express = require('express');

const postController = require('../controllers/Post');
const { protect } = require('../controllers/Auth');

const router = express.Router();

router
  .route('/')
  .get(postController.getAllPosts)
  .post(protect, postController.createPost)

router
  .route('/:id')
  .get(postController.getPost)
  .patch(protect, postController.updatePost)
  .delete(protect, postController.deletePost)

module.exports = router;