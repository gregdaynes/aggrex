const { expect, truncate } = require('test')
const schema = require('./source-schema')

const {
  createSource,
  findSourceById,
  findSourceBySlug,
  destroySource
} = require('./sources-repo')

describe('Sources Repo', function () {
  beforeEach(async function () { await truncate('sources') })

  describe('createSource #integration', function () {
    const subject = createSource

    it('creates a source and returns it', async function () {
      const source = await schema({
        name: 'test',
        url: 'https://example.com'
      })

      const results = await subject(source)

      expect(results).to.have.any.key('_id')
      expect(results.name).to.equal(source.name)
    })
  })

  describe('findSourceById #integration', function () {
    const subject = findSourceById

    it('returns source by id', async function () {
      const source = await schema({
        name: 'test',
        url: 'https://example.com'
      })

      const createdSource = await createSource(source)
      const results = await subject(createdSource._id)

      expect(results[0].name).to.equal(source.name)
    })
  })

  describe('findSourceBySlug #integration', function () {
    const subject = findSourceBySlug

    it('returns source by slug', async function () {
      const source = await schema({
        name: 'test',
        url: 'https://example.com'
      })

      const createdSource = await createSource(source)
      const results = await subject(createdSource.slug)

      expect(results[0].name).to.equal(source.name)
    })
  })

  describe('destroySource #integration', function () {
    const subject = destroySource

    it('returns a success and count, after deleting a source', async function () {
      const source = await schema({
        name: 'test',
        url: 'https://example.com'
      })

      const createdSource = await createSource(source)
      const results = await subject(createdSource._id)

      expect(results.deletedCount).to.equal(1)
      expect(results.success).to.equal(true)
    })

    context('when an id does not exist', function () {
      it('returns a success and count, after deleting a source', async function () {
        const results = await subject(['123456789012'])

        expect(results.deletedCount).to.equal(0)
        expect(results.success).to.equal(true)
      })
    })
  })
})
