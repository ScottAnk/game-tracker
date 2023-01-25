const express = require('express')
const User = require('../model/user')

const router = express.Router()

router.post('/sign-up',(req, res, next)=>{
  User.create(req.body.user)
  res.sendStatus('201')
})

router.post ('/sign-in', (req, res, next) => {
  User.findOne({userName: req.body.user.userName})
    .then((user) => {
      if(user.passwordHash === req.body.user.passwordHash) {
        res.sendStatus(200)
      } else {
        res.sendStatus(422)
      }
    })
    .catch(next)
    
})
module.exports = router