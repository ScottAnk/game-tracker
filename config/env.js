const EXT_PORT = 8000
const DATABASE_URL = 'mongodb://localhost/game-tracker-dev'
const MONGODB_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

module.exports = {
  EXT_PORT,
  DATABASE_URL,
  MONGODB_OPTIONS
}