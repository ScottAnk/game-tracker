const ENV = require('../config/env.js')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(ENV.DATABASE_URL, ENV.MONGODB_OPTIONS)

mongoose.connection.on('open', ()=> {console.log('mongodb connected')})
mongoose.connection.on('close', ()=> {console.log('mongodb closed')})
mongoose.connection.on('error', (error)=> {console.log(error)})

module.exports = mongoose