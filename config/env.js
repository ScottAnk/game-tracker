const EXT_PORT = 8000

const DATABASE_URL =
  process.env.DATABASE_URL || 'mongodb://localhost/game-tracker-dev'

const JWT_SECRET = process.env.JWT_SECRET || 'development-secret'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'lol great password'
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://127.0.0.1:5500'

console.log('database url: ', DATABASE_URL)
module.exports = {
  EXT_PORT,
  DATABASE_URL,
  JWT_SECRET,
  ADMIN_PASSWORD,
  CORS_ORIGIN,
}
