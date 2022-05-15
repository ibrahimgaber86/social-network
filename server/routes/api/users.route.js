const express = require('express')
const passport = require('passport')
const router = express.Router()

const { getAllUsers, userRegister, userLogin } = require('../../controllers')

router.route('/').get(getAllUsers)
router.route('/register').post(userRegister)
router.route('/login').post(userLogin)
router
  .route('/protected')
  .get(passport.authenticate('jwt', { session: false }), (req, res) =>
    res.send('sucess')
  )

module.exports = router
