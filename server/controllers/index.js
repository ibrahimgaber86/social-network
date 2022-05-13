const { getAllUsers } = require('./user.controller')
const { getAllPosts } = require('./post.controller')
const { getAllProfiles } = require('./profile.controller')

module.exports = { getAllUsers, getAllPosts, getAllProfiles }
