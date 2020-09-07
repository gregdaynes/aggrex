const debug = require('lib/debug')('http:api:middleware:normalizeRequest')

module.exports = normalizeRequestInit

function normalizeRequestInit () {
  return normalizeRequest
}

function normalizeRequest (req, _res, next) {
  debug(req.data)

  if (!req.data) req.data = {}

  next()
}
