const mongoose = require('../db/connection')

const collectionSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }, 
  title: {
    type: String,
    required: true
  },
  games: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game"
  }]
})

const Collection = mongoose.model("Collection", collectionSchema)

module.exports = Collection