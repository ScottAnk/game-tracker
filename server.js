const express = require('express')
const cors = require('cors')

const ENV = require('./config/env')
const mongoose = require('./db/connection')
const requestLogger = require('./lib/requestLogger')

const app = express()

app.use(cors({ origin: ENV.CORS_ORIGIN }))
app.use(express.json())
app.use(requestLogger)

const userRoutes = require('./routes/userRoutes')
const gameRoutes = require('./routes/gameRoutes')
const collectionRoutes = require('./routes/collectionRoutes')
const adminRoutes = require('./routes/adminRoutes')
app.use(userRoutes)
app.use('/games', gameRoutes)
app.use('/collections', collectionRoutes)
app.use('/admin', adminRoutes)

app.listen(ENV.EXT_PORT, () => console.log(`listening on port ${ENV.EXT_PORT}`))
