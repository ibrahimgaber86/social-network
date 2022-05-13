const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
})

module.exports = mongoose.model('Profile', profileSchema)
