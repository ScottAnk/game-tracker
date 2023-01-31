const bcrypt = require('bcrypt')

const mongoose = require('../db/connection')
const User = require('../model/user')
const Game = require('../model/game')
const Collection = require('../model/collection')
const ENV = require('../config/env')

const adminSeed = {
  userName: 'Admin',
  password: ENV.ADMIN_PASSWORD,
}
const userSeeds = [
  {
    userName: 'A',
    password: 'A',
  },
  {
    userName: 'B',
    password: 'B',
  },
  {
    userName: 'C',
    password: 'C',
  },
]

const gameSeeds = [
  {
    title: '7 Wonders',
    minPlayers: 2,
    maxPlayers: 7,
    description:
      "Pick the best and pass the rest. In this drafting game you're competing to create the most prosperous civilization by mixing science, commerse, military might, resource gathering, and -of course- constructing your civilizations Great Wonder",
  },
  {
    title: 'Galaxy Trucker',
    minPlayers: 2,
    maxPlayers: 4,
    description:
      'Prepare for unkown dangers by building the best spaceship possible',
  },
  {
    title: 'Wingspan',
    minPlayers: 1,
    maxPlayers: 5,
    description:
      'Attract a beautiful and diverse collection of birds to your wildlife preserve',
  },
  {
    title: 'Photosynthesis',
    minPlayers: 2,
    maxPlayers: 4,
    description:
      'Trees compete for sunlight to grow taller as the sun moves around the board',
  },
  {
    title: 'Bargain Quest',
    minPlayers: 2,
    maxPlayers: 6,
    description:
      'Sell heroes the gear they need to defeat monsters threatening your town',
  },
  {
    title: 'Root',
    minPlayers: 2,
    maxPlayers: 4,
    description:
      'Decide the fate of the forest as woodland factions fight for contrasting goals',
  },
  {
    title: 'Power Grid',
    minPlayers: 2,
    maxPlayers: 6,
    description:
      'Bid, network, and manage resources in a race to supply the most cities with power',
  },
  {
    title: 'Spirit Island',
    minPlayers: 1,
    maxPlayers: 4,
    description:
      'Island Psirits join forces using elemental powers to defend their home from invaders',
  },
  {
    title: 'Munchkin',
    minPlayers: 3,
    maxPlayers: 6,
    description: 'Attack and loot in this humerous, card-based dungeon crawler',
  },
  {
    title: 'Inis',
    minPlayers: 2,
    maxPlayers: 4,
    description:
      'Claim the crown through merit and wisdom in this Celtic island struggle',
  },
  {
    title: 'Mariposas',
    minPlayers: 2,
    maxPlayers: 5,
    description:
      'Guide monarch butterflies on their journey along eastern North America',
  },
  {
    title: 'CATAN',
    minPlayers: 3,
    maxPlayers: 4,
    description:
      'Collect and trade resources to build up the island of Catan in this modern classic',
  },
  {
    title: 'Codenames',
    minPlayers: 2,
    maxPlayers: 8,
    description:
      'Give your team clever one-word clues to help them spot their agents in the field',
  },
  {
    title: 'Sushi Go!',
    minPlayers: 2,
    maxPlayers: 5,
    description:
      'Pass the sushi around, but keep the best for yourself. Save room for dessert!',
  },
  {
    title: 'Gloomhaven',
    minPlayers: 1,
    maxPlayers: 4,
    description:
      'Vanquish monsters with strategic cardplay. Fulfill your quest to leave your legacy!',
  },
]

// would love to have an importable buildUser() that handles the new collection
const dropDatabase = () => {
  return mongoose.connection.db
    .dropDatabase()
    .then(() => {
      console.log('dropped sucessfully')
      return bcrypt.hash(adminSeed.password, 10)
    })
    .then((passwordHash) => {
      adminSeed.passwordHash = passwordHash
      return User.create(adminSeed)
    })
}

const seedUsers = () => {
  return new Promise((resolve, reject) => {
    try {
      const dbOperations = []
      for (let i = 0; i < userSeeds.length; i++) {
        dbOperations[i] = bcrypt
          .hash(userSeeds[i].password, 10)
          .then((passwordHash) => {
            userSeeds[i].passwordHash = passwordHash
            return User.create(userSeeds[i])
          })
          .then((user) => {
            Collection.create({ ownerId: user._id, title: 'My Games' })
            if (user.userName === 'C') {
              dbOperations.push(
                Collection.create({ ownerId: user._id, title: 'Party Games' })
              )
              dbOperations.push(
                Collection.create({ ownerId: user._id, title: 'Heavy Games' })
              )
              dbOperations.push(
                Collection.create({ ownerId: user._id, title: 'Card Games' })
              )
            }
          })
      }

      Promise.all(dbOperations)
        .then(() => console.log('finished seeding users'))
        .then(resolve)
    } catch (error) {
      reject()
    }
  })
}

const seedGames = async () => {
  const users = await Promise.all([
    User.findOne({ userName: 'A' }),
    User.findOne({ userName: 'B' }),
    User.findOne({ userName: 'C' }),
  ])

  gameSeeds[0].ownerId = users[0]
  gameSeeds[1].ownerId = users[0]
  gameSeeds[2].ownerId = users[1]
  gameSeeds[3].ownerId = users[1]
  gameSeeds[4].ownerId = users[2]
  gameSeeds[5].ownerId = users[2]
  gameSeeds[6].ownerId = users[2]
  gameSeeds[7].ownerId = users[2]
  gameSeeds[8].ownerId = users[2]
  gameSeeds[9].ownerId = users[2]
  gameSeeds[10].ownerId = users[2]
  gameSeeds[11].ownerId = users[2]
  gameSeeds[12].ownerId = users[2]
  gameSeeds[13].ownerId = users[2]
  gameSeeds[14].ownerId = users[2]
  const games = []
  for (let i = 0; i < gameSeeds.length; i++) {
    if (i < 2) {
      gameSeeds[i].ownerId = users[0]._id
    } else if (i < 4) {
      gameSeeds[i].ownerId = users[1]._id
    } else {
      gameSeeds[i].ownerId = users[2]._id
    }
    games[i] = Game.create(gameSeeds[i])
  }

  await Promise.all(games).then((games) => {
    const remainderGameIds = games.slice(4)
    return Promise.all([
      Collection.findOneAndUpdate(
        { ownerId: users[0]._id },
        { games: [games[0]._id, games[1]._id] }
      ).exec(),
      Collection.findOneAndUpdate(
        { ownerId: users[1]._id },
        { games: [games[2]._id, games[3]._id] }
      ).exec(),
      Collection.findOneAndUpdate(
        { ownerId: users[2]._id },
        { games: remainderGameIds }
      ).exec(),
    ])
  })
  console.log('finished seeding games')
}

const resetDatabase = () => {
  return dropDatabase().then(seedUsers).then(seedGames)
}

module.exports = {
  dropDatabase,
  resetDatabase,
}
