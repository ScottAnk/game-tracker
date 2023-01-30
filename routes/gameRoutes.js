const express = require('express')

const Game = require('../model/game')
const Collection = require('../model/collection')
const { requireToken } = require('../lib/auth')
const check404 = require('../lib/error')

const router = express.Router()

//CREATE
router.post('/', requireToken, (req, res, next) => {
  req.body.game.ownerId = req.user._id
  Collection.findOne({ ownerId: req.user._id })
    .then((collection) => {
      return Game.create(req.body.game)
        .then((game) => {
          collection.games.push(game._id)
          return collection.save()
        })
        .then(() => res.sendStatus(205))
    })
    .catch(next)
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
    .then(check404)
    .then((game) => res.status(200).json({ game: game }))
    .catch(next)
})

//UPDATE
router.patch('/:id', requireToken, (req, res, next) => {
  Game.findOneAndUpdate(
    { _id: req.params.id, ownerId: req.user._id },
    req.body.game,
    {
      returnDocument: 'after',
      runValidators: true,
    }
  )
    .then(check404)
    .then((updatedGame) => res.sendStatus(205))
    .catch(next)
})

//DELETE
router.delete('/:id', requireToken, (req, res, next) => {
  // TODO send back the results of a new index on the collection or redirect to the main page if I have a persistent login
  Game.findOneAndDelete({ _id: req.params.id, ownerId: req.user._id })
    .then(check404)
    .then((game) => res.sendStatus(205))
    .catch(next)
})

module.exports = router
