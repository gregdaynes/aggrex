const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const chaiSpies = require('chai-spies')
const request = require('supertest')
const { connect, close, useDatabase, useCollection } = require('lib/database')
const { databaseName } = require('lib/env')

chai.use(chaiAsPromised)
chai.use(chaiSpies)

const assert = chai.assert
const expect = chai.expect
const should = chai.should
const spy = chai.spy

module.exports = {
  assert,
  expect,
  request,
  should,
  spy,
  truncate
}

async function truncate (collection) {
  const connection = connect()

  return connection
    .then(useDatabase(databaseName))
    .then(useCollection(collection))
    .then(res => res.deleteMany({}))
    .finally(close(connection))
}
