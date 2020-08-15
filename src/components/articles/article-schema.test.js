const { expect } = require('test')
const { ObjectId } = require('bson')

const schema = require('./article-schema')

function schemaProp (prop, type = true) {
  return (type)
    ? schema.schema.properties[prop.toString()].type
    : schema.schema.properties[prop.toString()]
}

describe('Content Item Schema #unit', function () {
  describe('Properties types', function () {
    it('content is a string', function () {
      expect(schemaProp('content')).to.be.equal('string')
    })

    it('description is a string', function () {
      expect(schemaProp('description')).to.be.equal('string')
    })

    it('excerpt is a string', function () {
      expect(schemaProp('excerpt')).to.be.equal('string')
    })

    it('link is a string', function () {
      expect(schemaProp('link')).to.be.equal('string')
    })

    it('publicationDate is a string', function () {
      expect(schemaProp('publicationDate')).to.be.equal('object')
    })

    it('slug is a string', function () {
      expect(schemaProp('slug')).to.be.equal('string')
    })

    it('status is a boolean', function () {
      expect(schemaProp('status')).to.be.equal('boolean')
    })

    it('title is a string', function () {
      expect(schemaProp('title')).to.be.equal('string')
    })

    it('authorId is a relation', function () {
      expect(schemaProp('authorId', false)).to.be.deep.equal({ objectId: 'string' })
    })

    it('sourceId is a relation', function () {
      expect(schemaProp('sourceId', false)).to.be.deep.equal({ objectId: 'string' })
    })
  })

  describe('Required properties', function () {
    it('requires a link', function () {
      const props = schema.schema.required
      expect(props).includes('link')
    })

    it('requires a sourceId', function () {
      const props = schema.schema.required
      expect(props).includes('sourceId')
    })

    it('requires a title', function () {
      const props = schema.schema.required
      expect(props).includes('title')
    })
  })

  it('returns an object with data passed', async function () {
    const authorId = 'abcdefghijkl'
    const content = 'test content'
    const description = 'test description'
    const excerpt = 'test excerpt'
    const link = 'https://example.com'
    const publicationDate = new Date()
    const sourceId = '123456789012'
    const status = false
    const title = 'test title'

    const results = await schema({
      content, description, excerpt, link, publicationDate, status, title, authorId, sourceId
    })

    expect(results.authorId).to.deep.equal(new ObjectId(authorId))
    expect(results.sourceId).to.deep.equal(new ObjectId(sourceId))
    expect(results.content).to.deep.equal(content)

    expect(results.description).to.deep.equal(description)
    expect(results.excerpt).to.deep.equal(excerpt)
    expect(results.link).to.deep.equal(link)
    expect(results.publicationDate).to.deep.equal(publicationDate)
    expect(results.status).to.deep.equal(status)
    expect(results.title).to.deep.equal(title)
  })

  it('returns an object with defaults', async function () {
    const link = 'https://example.com'
    const sourceId = '123456789012'
    const title = 'test title'

    const results = await schema({ link, sourceId, title })

    expect(results.status).to.be.true
    expect(results.slug).to.equal('test-title')
  })

  it('returns slug as name converted to a url safe string', async function () {
    const link = 'https://example.com'
    const sourceId = '123456789012'
    const title = 'bAd string !@#'

    const results = await schema({ link, sourceId, title })

    expect(results.slug).to.equal('bad-string')
  })

  context('With invalid data', function () {
    it('returns an error', async function () {
      await expect(schema({ name: 'test' }))
        .to.be.rejectedWith('validation failed')
    })
  })
})
