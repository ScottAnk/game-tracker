const mongoose = require('../db/connection')

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User