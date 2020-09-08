const debug = require('lib/debug')('component:article:service')
const { toObjectId, toString } = require('lib/utils')

const schema = require('./article-schema')

const repo = require('./articles-repo')

module.exports = {
  all,
  create,
  fetch,
  findById,
  findBySlug,
  findBySource,
  findBy,
  destroy
}

function handleError (...args) {
  return function (err) {
    debug('error', ...args, err)

    if (err.validation) {
      const message = err.errors.map(error => error.message).join('; ')
      throw new Error(message)
    }

    throw new Error(err)
  }
}

function all (repoFn = repo.allArticles) {
  debug('all')

  return repoFn()
    .then(res => res.map(schema))
    .then(res => Promise.all(res))
    .catch(handleError('all'))
}

function create (article, repoFn = repo.createArticle) {
  debug('create', article)

  return Promise.resolve(article)
    .then(res => schema(res))
    .then(res => repoFn(res))
    .catch(handleError('create', article))
}

function fetch (article, repoFn = repo.fetchArticle) {
  debug('fetch', article)

  return Promise.resolve(article)
    .then(res => schema(res))
    .then(res => repoFn(res))
    .catch(handleError('fetch', article))
}

function findById (id, repoFn = repo.findArticleById) {
  debug('findById', id)

  if (!id) return Promise.resolve()

  return toObjectId(id)
    .then(res => repoFn(res))
    .catch(handleError('findById', id))
}

function findBySlug (slug, repoFn = repo.findArticleBySlug) {
  debug('findBySlug', slug)

  if (!slug) return Promise.resolve()

  return toString(slug)
    .then(res => repoFn(res))
    .catch(handleError('findBySlug', slug))
}

function findBySource (source, repoFn = repo.findArticlesBySourceId) {
  debug('findBySource', source)

  if (!source) return Promise.resolve()

  const sourceId = source._id
    ? source._id.toString()
    : source

  return toObjectId(sourceId)
    .then(res => repoFn(res))
    .then(res => res.map(schema))
    .then(res => Promise.all(res))
    .catch(handleError('findBySource', source))
}

function findBy ({ id, slug }) {
  debug('findBy', id, slug)

  if ((!id && !slug) || (id && slug)) {
    return Promise.reject(new Error('requires an id or slug'))
  }

  return Promise.all([findById(id), findBySlug(slug)])
    .then(res => res.flat())
    .then(res => res.filter(Boolean))
    .catch(handleError('findBy', id, slug))
}

function destroy (id, repoFn = repo.destroyArticle) {
  debug('destroy', id)

  return toObjectId(id)
    .then(res => repoFn(res))
    .catch(handleError('destroy', id))
}
