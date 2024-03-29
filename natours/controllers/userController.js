const User = require('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.getAllUsers =catchAsync(async (req, res,next) =>{
    const users = await User.find();

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });
});

 exports.getUser = (req, res) =>{
    res.status(500).json({
        status: 'Error',
        message: 'This resource is not yet defined',
    });
};

 exports.createUser = (req, res) =>{
    res.status(500).json({
        status: 'Error',
        message: 'This resource is not yet defined',
    });
};

 exports.updateUser = (req, res) =>{
    res.status(500).json({
        status: 'Error',
        message: 'This resource is not yet defined',
    });
};

exports.deleteUser = (req, res) =>{
    res.status(500).json({
        status: 'Error',
        message: 'This resource is not yet defined',
    });
};
