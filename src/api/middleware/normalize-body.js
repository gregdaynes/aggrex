const debug = require('lib/debug')('http:api:middleware:normalizeBody')

module.exports = normalizeBodyInit

function normalizeBodyInit () {
  return normalizeBody
}

function normalizeBody (req, res, next) {
  debug(req.body)

  req.body.ids = [...req.body.ids || []]
  req.body.slugs = [...req.body.slugs || []]

  next()
}
