const { MongoClient } = require('mongodb')
const debug = require('lib/debug')('lib:database:connection')
const { databaseUrl } = require('lib/env')

const configuration = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

module.exports = {
  close,
  connect,
  destroy,
  find,
  insertOne,
  useDatabase,
  useCollection
}

function close (connection) {
  return () => connection.then(ctx => ctx.close())
}

function connect () {
  debug('connecting')

  return new MongoClient(databaseUrl, configuration).connect()
}

function destroy (query) {
  return (collection) => collection.deleteMany(query)
}

function find (query) {
  return (collection) => collection.find(query)
}

function insertOne (obj) {
  return (collection) => collection.insertOne(obj)
}

function useDatabase (databaseName) {
  return (connection) => connection.db(databaseName)
}

function useCollection (collection) {
  return (database) => database.collection(collection)
}
