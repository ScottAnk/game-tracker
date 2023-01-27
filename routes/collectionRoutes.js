const express = require('express')

const { requireToken } = require('../lib/auth')
const Collection = require('../model/collection')

const router = express.Router()

router.get('/', requireToken, (req, res, next) => {
  Collection.find({ ownerId: req.user._id })
    .populate('games')
    .then((collections) => res.status(200).json({ collections: collections }))
    .catch(next)
})

module.exports = router
