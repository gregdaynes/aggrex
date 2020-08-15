const debug = require('lib/debug')('http:api:middleware:respond')

module.exports = respondInit

function respondInit () {
  return respond
}

async function respond (req, res, next) {
  const requestData = {
    method: req.method,
    path: req.path
  }

  const data = await res.data

  debug(requestData, data)

  res.status(200)
  res.json(data)
}
