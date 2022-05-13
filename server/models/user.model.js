const mongoose = require('mongoose')

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
      default: '',
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

module.exports = mongoose.model('User', userSchema)
