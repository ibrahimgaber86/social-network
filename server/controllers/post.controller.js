const { StatusCodes } = require('http-status-codes')
const { Post } = require('../models')

exports.getAllPosts = async (req, res) => {
  const allPost = await Post.find()
  res.status(StatusCodes.OK).json(allPost)
}
