const EXT_PORT = 8000

const DATABASE_URL = 'mongodb://localhost/game-tracker-dev'

const JWT_SECRET = process.env.JWT_SECRET || 'development-secret'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'lol great password'

module.exports = {
  EXT_PORT,
  DATABASE_URL,
  JWT_SECRET,
  ADMIN_PASSWORD,
}
