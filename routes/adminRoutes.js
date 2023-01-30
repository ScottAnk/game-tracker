const express = require('express')

const { requireToken } = require('../lib/auth')
const { resetDatabase, fillDefaultCollections } = require('../lib/seedDatabase')

const router = express.Router()

router.put('/reset-to-dev', requireToken, (req, res, next) => {
  if (req.user.userName !== 'Admin') {
    res.sendStatus(403)
  }
  resetDatabase()
    .then(() => res.sendStatus(201))
    .catch(next)
})
module.exports = router
