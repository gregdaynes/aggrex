const debug = require('lib/debug')('http:api:middleware:notFound')

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

  const type = req.headers.contentType

  res.status(404)

  switch (type) {
    case 'application/json':
    default:
      res.json({ message: 'not found' })
      break
  }
}
