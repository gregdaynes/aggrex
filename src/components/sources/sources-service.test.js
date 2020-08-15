const { expect, spy, truncate } = require('test')

const {
  create,
  findById,
  findBySlug,
  findBy,
  destroy
} = require('./sources-service')

const schema = require('./source-schema')

describe('Sources Service', function () {
  beforeEach(async function () { await truncate('sources') })

  describe('create', function () {
    const subject = create

    it('creates a source and returns the persisted version #integration', async function () {
      const source = await schema({
        name: 'test name',
        url: 'https://example.com'
      })

      const results = await subject(source)

      expect(results.name).to.equal('test name')
      expect(results.slug).to.equal('test-name')
      expect(results).to.have.any.keys('_id')
    })

    context('with invalid source data', function () {
      it('throws a validation error #unit', async function () {
        const repoSpy = spy(function () {})
        const source = {
          name: 'test name'
        }

        await expect(subject(source, repoSpy))
          .to.be.rejectedWith('should have required property \'url\'')
      })
    })
  })

  describe('findBy...', function () {
    describe('findById', function () {
      const subject = findById

      it('returns a source by id #integration', async function () {
        const source = await schema({
          name: 'test name',
          url: 'https://example.com'
        })
        const createdSource = await create(source)
        const results = await subject(createdSource._id)

        expect(results[0].name).to.equal('test name')
        expect(results[0].slug).to.equal('test-name')
        expect(results[0]).to.have.any.keys('_id')
      })

      it('returns empty when id not found #integration', async function () {
        const results = await subject('123456789012')
        expect(results).to.be.empty
      })

      it('throws a type error for ObjectId requirements #unit', async function () {
        const repoSpy = spy(function () {})
        const id = 'abc-123'

        await expect(subject(id, repoSpy))
          .to.be.rejectedWith('TypeError: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
      })
    })

    describe('findBySlug', function () {
      const subject = findBySlug

      it('returns a source by slug #integration', async function () {
        const source = await schema({
          name: 'test name',
          url: 'https://example.com'
        })
        const createdSource = await create(source)
        const results = await subject(createdSource.slug)

        expect(results[0].name).to.equal('test name')
        expect(results[0].slug).to.equal('test-name')
        expect(results[0]).to.have.any.keys('_id')
      })

      it('returns empty when id not found #integration', async function () {
        const results = await subject('123456789012')
        expect(results).to.be.empty
      })
    })

    describe('findBy', function () {
      const subject = findBy

      it('returns a source by id #integration', async function () {
        const source = await schema({
          name: 'test name',
          url: 'https://example.com'
        })
        const createdSource = await create(source)
        const results = await subject({ id: createdSource._id })

        expect(results[0].name).to.equal('test name')
        expect(results[0].slug).to.equal('test-name')
        expect(results[0]).to.have.any.keys('_id')
      })

      it('returns a source by slug #integration', async function () {
        const source = await schema({
          name: 'test name',
          url: 'https://example.com'
        })
        const createdSource = await create(source)
        const results = await subject({ slug: createdSource.slug })

        expect(results[0].name).to.equal('test name')
        expect(results[0].slug).to.equal('test-name')
        expect(results[0]).to.have.any.keys('_id')
      })

      it('returns empty when id not found #integration', async function () {
        const results = await subject({ id: '123456789012' })
        expect(results).to.be.empty
      })

      it('returns empty when slug not found #integration', async function () {
        const results = await subject({ slug: '1234567890' })
        expect(results).to.be.empty
      })

      it('throws a type error for ObjectId requirements #unit', async function () {
        const id = 'abc-123'

        await expect(subject({ id }))
          .to.be.rejectedWith('TypeError: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
      })

      it('throws an error when both id and slug received #unit', async function () {
        const id = 'abc-123'
        const slug = 'slug'

        await expect(subject({ id, slug }))
          .to.be.rejectedWith('requires an id or slug')
      })
    })
  })

  describe('destroy', function () {
    const subject = destroy

    it('deletes a source by id #integration', async function () {
      const source = await create({
        name: 'test',
        url: 'https://example.com'
      })

      const results = await subject(source._id)

      expect(results.success).to.equal(true)
      expect(results.deletedCount).to.equal(1)
    })

    context('with invalid source id', function () {
      it('throws a type error for ObjectId requirements #unit', async function () {
        const repoSpy = spy(function () {})
        const id = 'abc-123'

        await expect(subject(id, repoSpy))
          .to.be.rejectedWith('TypeError: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
      })
    })
  })
})
