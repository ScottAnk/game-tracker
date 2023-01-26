const express = require('express')
const bcrypt = require('bcrypt')

const { createUserToken } = require('../lib/auth')
const User = require('../model/user')
const Collection = require('../model/collection')

const router = express.Router()

router.post('/sign-up', (req, res, next) => {
  // TODO need to check that request includes a user name.
  // TODO need to check if username already exists
  bcrypt
    .hash(req.body.credentials.password, 10)
    .then(async (passwordHash) => {
      const user = await User.create({
        userName: req.body.credentials.userName,
        passwordHash: passwordHash,
      })
      Collection.create({
        ownerId: user._id,
        title: 'My Games',
      })
      return user
    })
    .then((user) => res.status(201).json(user))
    .catch(next)
})

router.post('/sign-in', (req, res, next) => {
  User.findOne({ userName: req.body.credentials.userName })
    // TODO need to check if a user was found
    .then((user) => createUserToken(req, user))
    .then((token) => res.json({ token: token }))
    .catch(next)
})
module.exports = router
