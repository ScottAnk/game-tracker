const express = require('express')
const bcrypt = require('bcrypt')

const {createUserToken} = require('../lib/auth')
const User = require('../model/user')

const router = express.Router()

router.post('/sign-up', (req, res, next) => {
  bcrypt
    .hash(req.body.credentials.password, 10)
    .then((passwordHash) =>
      User.create({
        userName: req.body.credentials.userName,
        passwordHash: passwordHash,
      })
    )
    .then((user) => res.status(201).json(user))
    .catch(next)
})

router.post('/sign-in', (req, res, next) => {
  User.findOne({ userName: req.body.credentials.userName })
    .then((user) => createUserToken(req, user))
    .then((token) => res.json({ token: token }))
    .catch(next)
})
module.exports = router
