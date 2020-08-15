const debug = require('lib/debug')('http:api:middleware:controller')

module.exports = controllerInit

function controllerInit (fn) {
  return async function controller (req, res, next) {
    let caughtError

    try {
      await fn.call(this, req, res)
    } catch (err) {
      debug('error', err)
      caughtError = err
    } finally {
      next(caughtError)
    }
  }
}
