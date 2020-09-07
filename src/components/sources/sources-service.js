const debug = require('lib/debug')('component:source:service')
const { toObjectId, toString } = require('lib/utils')

const schema = require('./source-schema')

const repo = require('./sources-repo')

module.exports = {
  all,
  create,
  findById,
  findBySlug,
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

function all (repoFn = repo.allSources) {
  debug('all')

  return repoFn()
    .then(res => res.map(schema))
    .then(res => Promise.all(res))
    .catch(handleError('all'))
}

function create (source, repoFn = repo.createSource) {
  debug('create', source)

  return Promise.resolve(source)
    .then(res => schema(res))
    .then(res => repoFn(res))
    .catch(handleError('create', source))
}

function findById (id, repoFn = repo.findSourceById) {
  debug('findById', id)

  if (!id) return Promise.resolve()

  return toObjectId(id)
    .then(res => repoFn(res))
    .catch(handleError('findById', id))
}

function findBySlug (slug, repoFn = repo.findSourceBySlug) {
  debug('findBySlug', slug)

  if (!slug) return Promise.resolve()

  return toString(slug)
    .then(res => repoFn(res))
    .catch(handleError('findBySlug', slug))
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

function destroy (id, repoFn = repo.destroySource) {
  debug('destroy', id)

  return toObjectId(id)
    .then(res => repoFn(res))
    .catch(handleError('destroy', id))
}
