const debug = require('lib/debug')('component:article:repo')
const { databaseName } = require('lib/env')

const {
  close,
  connect,
  destroy,
  find,
  findOrCreate,
  insertOne,
  useDatabase,
  useCollection
} = require('lib/database')

const collectionName = 'articles'

module.exports = {
  allArticles,
  createArticle,
  fetchArticle,
  findArticleById,
  findArticleBySlug,
  findArticlesBySourceId,
  destroyArticle
}

function allArticles () {
  debug('allArticles')

  const connection = connect()

  return connection
    .then(useDatabase(databaseName))
    .then(useCollection(collectionName))
    .then(find({}))
    .then(handleFoundResult())
    .finally(close(connection))
}

function createArticle (article) {
  debug('createArticle', article)

  const connection = connect()

  return connection
    .then(useDatabase(databaseName))
    .then(useCollection(collectionName))
    .then(insertOne(article))
    .then(handleCreateResult())
    .finally(close(connection))
}

function fetchArticle (article) {
  debug('fetchArticle', article)

  const query = { slug: article.slug }

  const connection = connect()

  return connection
    .then(useDatabase(databaseName))
    .then(useCollection(collectionName))
    .then(findOrCreate(query, article))
    .then(handleFindOrCreateResult())
    .finally(close(connection))
}

function findArticleById (id) {
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

function findArticleBySlug (slug) {
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

function findArticlesBySourceId (sourceId) {
  debug('findArticlesBySourceId', sourceId)

  const query = { sourceId }

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

const handleFindOrCreateResult = () =>
  function ({ value }) {
    return value
  }
