const env = process.env

module.exports = {
  databaseUrl: env.MONGO_URL,
  databaseName: isTest() ? env.MONGO_DB_TEST : env.MONGO_DB,
  httpPort: env.HTTP_PORT,
  httpMaxConnectionTime: env.HTTP_MAX_CONNECTION_TIME
}

function isTest () {
  return env.NODE_ENV === 'test'
}
