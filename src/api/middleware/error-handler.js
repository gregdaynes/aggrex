const debug = require('lib/debug')('http:api:middleware:errorHandler')

module.exports = errorHandlerInit

function errorHandlerInit () {
  return errorHandler
}

function errorHandler (err, req, res, next) {
  debug('error', err, req.body, res.data)

  if (res.headersSent) return next(err)

  res.status(500)
  res.render('error', { error: err })
}
