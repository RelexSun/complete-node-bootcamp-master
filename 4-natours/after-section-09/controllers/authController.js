const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

// catchAsync is a custom utils for *try catch*
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      user: newUser
    }
  });
});
