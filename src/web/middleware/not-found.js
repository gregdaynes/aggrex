const debug = require('lib/debug')('http:web:middleware:notFound')

module.exports = notFoundInit

function notFoundInit () {
  return notFound
}

function notFound (req, res, next) {
  debug({
    method: req.method,
    path: req.path,
    params: req.params,
    query: req.query,
    body: req.body
  })

  if (!res.view) {
    res.status(404)
    res.view = '404.ejs'
  }

  next()
}
