const express = require('express')
const { getAllProfiles } = require('../../controllers')
const router = express.Router()

router.route('/').get(getAllProfiles)

module.exports = router
