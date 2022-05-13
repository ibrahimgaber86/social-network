const { StatusCodes } = require('http-status-codes')
const { Profile } = require('../models')

exports.getAllProfiles = async (req, res) => {
  const allProfile = await Profile.find()
  res.status(StatusCodes.OK).json(allProfile)
}
