const mongoose = require('../db/connection')

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  minPlayers: {
    type: Number,
    requred: true,
    min: 1
  },
  maxPlayers: {
    type: Number,
    required: true,
    min: 1
  },
  description: {
    type: String,
    required: false
  }
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game