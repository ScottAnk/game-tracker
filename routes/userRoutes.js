const express = require('express')
const bcrypt = require('bcrypt')

const { createUserToken } = require('../lib/auth')
const User = require('../model/user')
const Collection = require('../model/collection')

const router = express.Router()

router.post('/sign-up', (req, res, next) => {
  if (
    !req.body.credentials ||
    !req.body.credentials.password ||
    !req.body.credentials.userName
  ) {
    res.status(400).json({ error: 'sign up requires username and password' })
    throw new Error('breakPromise')
  }
  User.findOne({ userName: req.body.credentials.userName })
    .then((user) => {
      if (user) {
        res.status(409).json({ error: 'that username already exists' })
        throw new Error('breakPromise')
      }
    })
    .then(() => bcrypt.hash(req.body.credentials.password, 10))
    .then(async (passwordHash) => {
      // TODO this could just be a promise chain
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
    .then((user) => res.sendStatus(201))
    .catch((error) => {
      if (error.message === 'breakPromise') {
        next()
      } else {
        throw error
      }
    })
})

router.post('/sign-in', (req, res, next) => {
  User.findOne({ userName: req.body.credentials.userName })
    // TODO need to check if a user was found
    .then((user) => createUserToken(req, user))
    .then((token) => res.json({ token: token }))
    .catch(next)
})
module.exports = router
