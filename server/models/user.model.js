const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: true,
      minlength: 6,
      maxlength: 100,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    pwd: {
      type: String,
      trim: true,
      required: true,
      minlength: 8,
    },
    avatar: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { collection: 'users' }
)
userSchema.pre('save', async function (next) {
  const user = this
  if (!user.isModified('pwd')) return next()

  try {
    const salt = await bcrypt.genSalt(12)
    user.pwd = await bcrypt.hash(user.pwd, salt)
  } catch (err) {
    next(err)
  }
})

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.pwd)
  } catch (error) {
    new Error(error.message)
  }
}

module.exports = mongoose.model('User', userSchema)
