const { expect } = require('test')

const schema = require('./source-schema')

function schemaProp (prop, type = true) {
  return (type)
    ? schema.schema.properties[prop.toString()].type
    : schema.schema.properties[prop.toString()]
}

describe('Source Schema #unit', function () {
  describe('Properties types', function () {
    it('name is a string', function () {
      expect(schemaProp('name')).to.be.equal('string')
    })

    it('url is a string', function () {
      expect(schemaProp('url')).to.be.equal('string')
    })

    it('enabled is a boolean', function () {
      expect(schemaProp('enabled')).to.be.equal('boolean')
    })

    it('slug is a string', function () {
      expect(schemaProp('slug')).to.be.equal('string')
    })

    it('fetchInterval is a number', function () {
      expect(schemaProp('fetchInterval')).to.be.equal('number')
    })
  })

  describe('Required properties', function () {
    it('requires a name', function () {
      const props = schema.schema.required
      expect(props).includes('name')
    })

    it('requires a url', function () {
      const props = schema.schema.required
      expect(props).includes('url')
    })
  })

  it('returns an object with data passed', async function () {
    const name = 'test'
    const url = 'url'
    const enabled = false
    const slug = 'test'
    const fetchInterval = 123

    const results = await schema({ name, url, enabled, slug, fetchInterval })

    expect(results.name).to.deep.equal(name)
    expect(results.url).to.deep.equal(url)
  })

  it('returns an object with defaults', async function () {
    const name = 'test'
    const url = 'url'

    const results = await schema({ name, url })

    expect(results.enabled).to.be.true
    expect(results.slug).to.deep.equal('test')
    expect(results.fetchInterval).to.deep.equal(1800)
  })

  it('returns slug as name converted to a url safe string', async function () {
    const name = 'bAd string !@#'
    const url = 'url'

    const results = await schema({ name, url })

    expect(results.slug).to.equal('bad-string')
  })

  context('With invalid data', function () {
    it('returns an error', async function () {
      await expect(schema({ name: 'test' }))
        .to.be.rejectedWith('validation failed')
    })
  })
})
