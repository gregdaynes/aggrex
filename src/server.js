const app = require('app')
const debug = require('lib/debug')('http:server')
const { httpPort, httpMaxConnectionTime } = require('lib/env')

const server = app.listen(httpPort, () => {
  debug(`App started on port ${httpPort}`)
})

process.on('uncaughtException', (err) => {
  shutdownGracefully(err, () => processExit())
})

process.on('unhandledRejection', (err) => {
  shutdownGracefully(err, () => processExit())
})

function shutdownGracefully (err, callback) {
  debug('error', err, err.stack)

  debug('Shutting down gracefully, waiting for connections to close')
  server.close(() => callback())

  setTimeout(() => {
    debug('Connections not closed in time, forced shutdown')
    callback()
  }, httpMaxConnectionTime).unref()
}

function processExit () {
  debug('Process exiting')
  process.exit(1)
}
