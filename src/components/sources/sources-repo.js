const debug = require('lib/debug')('component:source:repo')
const { databaseName } = require('lib/env')

const {
  close,
  connect,
  destroy,
  find,
  insertOne,
  useDatabase,
  useCollection
} = require('lib/database')

const collectionName = 'sources'

module.exports = {
  allSources,
  createSource,
  findSourceById,
  findSourceBySlug,
  destroySource
}

function allSources () {
  debug('allSources')

  const connection = connect()

  return connection
    .then(useDatabase(databaseName))
    .then(useCollection(collectionName))
    .then(find({}))
    .then(handleFoundResult())
    .finally(close(connection))
}

function createSource (source) {
  debug('createSource', source)

  const connection = connect()

  return connection
    .then(useDatabase(databaseName))
    .then(useCollection(collectionName))
    .then(insertOne(source))
    .then(handleCreateResult())
    .finally(close(connection))
}

function findSourceById (id) {
  debug('findSouceById', id)

  const query = { _id: id }

  const connection = connect()

  return connection
    .then(useDatabase(databaseName))
    .then(useCollection(collectionName))
    .then(find(query))
    .then(handleFoundResult())
    .finally(close(connection))
}

function findSourceBySlug (slug) {
  debug('findSouceBySlug', slug)

  const query = { slug }

  const connection = connect()

  return connection
    .then(useDatabase(databaseName))
    .then(useCollection(collectionName))
    .then(find(query))
    .then(handleFoundResult())
    .finally(close(connection))
}

function destroySource (id) {
  debug('destroySource', id)

  const query = { _id: { $in: [id] } }

  const connection = connect()

  return connection
    .then(useDatabase(databaseName))
    .then(useCollection(collectionName))
    .then(destroy(query))
    .then(handleDeleteResult())
    .finally(close(connection))
}

const handleCreateResult = () =>
  function ({ ops }) {
    return ops[0]
  }

const handleDeleteResult = () =>
  function ({ deletedCount }) {
    return { success: true, deletedCount }
  }

const handleFoundResult = () =>
  function handleFoundResult (results) {
    return results.toArray()
  }
