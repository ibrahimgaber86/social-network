const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
})

module.exports = mongoose.model('Post', postSchema)
