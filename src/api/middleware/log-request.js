const debug = require('lib/debug')('http:api:middleware:logRequest')

module.exports = logRequestInit

function logRequestInit () {
  return logRequest
}

function logRequest (req, res, next) {
  const data = {
    method: req.method,
    path: req.path,
    params: req.params,
    headers: req.headers,
    query: req.query,
    body: req.body
  }

  debug(data)

  next()
}
