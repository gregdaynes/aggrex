const debug = require('lib/debug')('component:authors:repo')
const { databaseName } = require('lib/env')

const {
  close,
  connect,
  findOrCreate,
  useDatabase,
  useCollection
} = require('lib/database')

const collectionName = 'authors'

module.exports = {
  fetchAuthor
}

function fetchAuthor (author) {
  debug('fetchAuthor', author)

  const query = { handle: author.handle }

  const connection = connect()

  return connection
    .then(useDatabase(databaseName))
    .then(useCollection(collectionName))
    .then(findOrCreate(query, author))
    .then(handleFindOrCreateResult())
    .finally(close(connection))
}

const handleFindOrCreateResult = () =>
  function ({ value }) {
    return value
  }
