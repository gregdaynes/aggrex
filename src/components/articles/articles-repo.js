const debug = require('lib/debug')('component:article:repo')
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

module.exports = {
  createArticle,
  findArticleById,
  findArticleBySlug,
  destroyArticle
}

const collectionName = 'articles'

async function createArticle (article) {
  debug('createArticle', article)

  const connection = connect()

  return connection
    .then(useDatabase(databaseName))
    .then(useCollection(collectionName))
    .then(insertOne(article))
    .then(handleCreateResult())
    .finally(close(connection))
}

async function findArticleById (id) {
  debug('findArticleById', id)

  const query = { _id: id }

  const connection = connect()

  return connection
    .then(useDatabase(databaseName))
    .then(useCollection(collectionName))
    .then(find(query))
    .then(handleFoundResult())
    .finally(close(connection))
}

async function findArticleBySlug (slug) {
  debug('findArticleBySlug', slug)

  const query = { slug }

  const connection = connect()

  return connection
    .then(useDatabase(databaseName))
    .then(useCollection(collectionName))
    .then(find(query))
    .then(handleFoundResult())
    .finally(close(connection))
}

function destroyArticle (id) {
  debug('destroyArticle', id)

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
