const passport = require('passport')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ENV = require('../config/env')
const { Strategy, ExtractJwt } = require('passport-jwt')
const User = require('../model/user')

const opts = {
  // will use bearer token strategy with JWT
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: ENV.JWT_SECRET,
}

// set up strategy middleware
const strategy = new Strategy(opts, function (jwt_payload, done) {
	User.findById(jwt_payload.id)
		// done callback expects an error and a user. user is optional
		.then((user) => done(null, user))
		.catch((err) => done(err))
})

// register the strategy in passport
passport.use(strategy)
passport.initialize()

// authenticate returns a middleware function that implements passport's registered strategy to attach a .user to req
const requireToken = passport.authenticate('jwt', { session: false })

// function to create user tokens when signing in
const createUserToken = (req, user) => {
	if (
		!req.body.credentials.password ||
		!bcrypt.compareSync(req.body.credentials.password, user.passwordHash)
	) {
		const err = new Error('The provided username or password is incorrect')
		err.statusCode = 422
		throw err
	}
  // return a token good for 10 hours
	return jwt.sign({ id: user._id }, ENV.JWT_SECRET, { expiresIn: 36000 })
}

module.exports = {
	requireToken,
	createUserToken,
}