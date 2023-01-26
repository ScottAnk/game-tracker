const express = require('express')

const Game = require('../model/game')
const Collection = require('../model/collection')
const { requireToken } = require('../lib/auth')

const router = express.Router()

//CREATE
router.post('/', requireToken, (req, res, next) => {
  Game.create(req.body.game).then(res.sendStatus(205)).catch(next)
  // TODO send back the results of a new index on the collection or redirect to the main page if I have a persistent login
})

//INDEX
router.get('/', requireToken, async (req, res, next) => {
  let gameFilter = {}
  if (req.query.collection) {
    const collection = await Collection.findById(req.query.collection)
    gameFilter = { _id: { $in: collection.games } }
  }
  Game.find(gameFilter)
    .then((games) => res.status(200).json({ games: games }))
    .catch(next)
})

//SHOW
router.get('/:id', requireToken, (req, res, next) => {
  Game.findById(req.params.id)
    .then((game) => res.status(200).json({ game: game }))
    .catch(next)
})

//UPDATE
router.patch('/:id', requireToken, (req, res, next) => {
  Game.findByIdAndUpdate(req.params.id, req.body.game, {
    returnDocument: 'after',
  })
    .then((updatedGame) => res.status(200).json({ game: updatedGame }))
    .catch(next)
})

//DELETE
router.delete('/:id', requireToken, (req, res, next) => {
  // TODO send back the results of a new index on the collection or redirect to the main page if I have a persistent login
  Game.findByIdAndDelete(req.params.id).then(res.sendStatus(205))
})

module.exports = router
