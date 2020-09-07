const debug = require('lib/debug')('http:api:middleware:normalizeQuery')

module.exports = normalizeQueryInit

function normalizeQueryInit () {
  return normalizeQuery
}

function normalizeQuery (req, _res, next) {
  debug(req.query)
  if (!req.query) req.query = {}

  const ids = (req.query.ids)
    ? req.query.ids.split(',')
    : []

  const slugs = req.query.slugs
    ? req.query.slugs.split(',')
    : []

  req.data.ids = [...req.data.ids || [], ...ids]
  req.data.slugs = [...req.data.slugs || [], ...slugs]

  next()
}
