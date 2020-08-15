const env = process.env

module.exports = {
  httpPort: env.HTTP_PORT,
  httpMaxConnectionTime: env.HTTP_MAX_CONNECTION_TIME
}

function isTest () {
  return env.NODE_ENV === 'test'
}
