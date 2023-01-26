const ENV = require('./config/env')
const express = require('express')
const mongoose = require('./db/connection')

const app = express()

app.use(express.json())

const userRoutes = require('./routes/userRoutes')
const gameRoutes = require('./routes/gameRoutes')
app.use(userRoutes)
app.use('/games', gameRoutes)

app.listen(ENV.EXT_PORT, () => console.log(`listening on port ${ENV.EXT_PORT}`))
