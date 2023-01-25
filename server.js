const ENV = require('./config/env')
const express = require('express')
const mongoose = require('./db/connection')

const app = express()

app.use(express.json())

const userRoutes = require('./routes/userRoutes')
app.use(userRoutes)

app.listen(ENV.EXT_PORT, () => console.log(`listening on port ${ENV.EXT_PORT}`))

