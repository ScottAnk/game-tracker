const ENV = require('./config/env')
const express = require('express')

const app = express()

app.use(express.json())


app.listen(ENV.EXT_PORT, () => console.log(`listening on port ${ENV.EXT_PORT}`))

