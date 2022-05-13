const express = require('express')
const { getAllPosts } = require('../../controllers')
const router = express.Router()

router.route('/').get(getAllPosts)

module.exports = router
