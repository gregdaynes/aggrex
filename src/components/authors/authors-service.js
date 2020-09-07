const debug = require('lib/debug')('component:authors:service')

const schema = require('./author-schema')

const repo = require('./authors-repo')

module.exports = {
  fetch
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

function fetch (author, repoFn = repo.fetchAuthor) {
  debug('fetch', author)

  return repoFn(author)
    .then(res => schema(res))
    .catch(handleError('fetchAuthor'))
}
