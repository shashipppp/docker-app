const Post = require('../models/PostSchema');

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.send(200).json({
      status: 'Success',
      length: posts.length,
      data: posts,
    });
  }catch(e) {
    res.send(400).json({
      status: 'Error',
      error: e,
    });
  }
}

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);

    res.send(200).json({
      status: 'Success',
      data: post,
    });
  }catch(e) {
    res.send(400).json({
      status: 'Error',
      error: e,
    });
  }
}

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.send(200).json({
      status: 'Success',
      data: post,
    });
  }catch(e) {
    res.send(400).json({
      status: 'Error',
      error: e,
    });
  }
}

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.send(200).json({
      status: 'Success',
      data: post,
    });
  }catch(e) {
    res.send(400).json({
      status: 'Error',
      error: e,
    });
  }
}

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    res.send(200).json({
      status: 'Success',
    });
  }catch(e) {
    res.send(400).json({
      status: 'Error',
      error: e,
    });
  }
}