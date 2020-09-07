const debug = require('lib/debug')('http:api:middleware:normalizeBody')

module.exports = normalizeBodyInit

function normalizeBodyInit () {
  return normalizeBody
}

function normalizeBody (req, _res, next) {
  debug(req.body)
  if (!req.body) req.body = {}

  req.data.ids = [...req.data.ids || [], ...req.body.ids || []]
  req.data.slugs = [...req.data.slugs || [], ...req.body.slugs || []]

  next()
}
