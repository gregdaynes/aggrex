const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const chaiSpies = require('chai-spies')
const request = require('supertest')

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
}
