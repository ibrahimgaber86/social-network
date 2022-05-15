const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const { User } = require('../models')

exports.getAllUsers = async (req, res) => {
  const allUser = await User.find()
  res.status(StatusCodes.OK).json(allUser)
}

exports.userRegister = async (req, res) => {
  const { email, pwd, userName } = req.body
  if (!email || !pwd || !userName)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(
        [
          `${!userName ? 'name is required' : ''}`,
          `${!email ? 'email is required' : ''}`,
          `${!pwd ? 'password is required' : ''}`,
        ]
          .filter((msg) => msg !== '')
          .join(' , ')
      )

  const userExist = await User.findOne({ email })
  if (userExist)
    return res.status(StatusCodes.BAD_REQUEST).send('user is already exist')

  const avatar = gravatar.url(email, { s: '200', r: 'pg', d: '404' })

  const user = new User({ userName, email, pwd, avatar })

  const savedUser = await user.save()

  res.status(StatusCodes.OK).json(savedUser)
}

exports.userLogin = async (req, res) => {
  const { email, pwd } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      const validPwd = await user.comparePassword(pwd, user.pwd)
      if (validPwd) {
        // return res.send('valid')
        jwt.sign({ id: user._id }, process.env.JWT_KEY, (err, token) => {
          console.log(err)
          res.setHeader('x-access-token', 'Bearer ' + token)
          return res.status(StatusCodes.OK).json({ token: 'Bearer ' + token })
        })
      } else {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send('login failed user name or password is invalid.')
      }
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send('login failed user name or password is invalid..')
    }
  } catch (error) {
    throw error
  }
}
