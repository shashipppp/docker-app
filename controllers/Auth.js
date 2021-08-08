const User = require('../models/UserSchema');
const bcrypt = require('bcryptjs');

exports.signUp = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      userName,
      password: hashedPassword,
    });

    res.status(200).json({
      status: 'Success',
      data: newUser,
    });
  }catch(e) {
    res.status(400).json({
      status: 'Error',
      error: e,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (!user) throw 'User not found!';

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) throw 'Invalid userName or password!';

    res.session.user = user;
    res.status(200).json({
      status: 'Success',
    });
  }catch(e) {
    res.status(400).json({
      status: 'Error',
      error: e,
    });
  }
};

exports.protect = async (req, res, next) => {
  const { user } = res.session || {};
  if (!user) return Promise.reject('Unauthorized!');

  req.user = user;
  next();
};