const { getAllUsers, userRegister, userLogin } = require('./user.controller')
const { getAllPosts } = require('./post.controller')
const { getAllProfiles } = require('./profile.controller')

module.exports = {
  getAllUsers,
  userRegister,
  userLogin,
  getAllPosts,
  getAllProfiles,
}
