const { StatusCodes } = require('http-status-codes')
const { User } = require('../models')

exports.getAllUsers = async (req, res) => {
  const allUser = await User.find()
  res.status(StatusCodes.OK).json(allUser)
}
