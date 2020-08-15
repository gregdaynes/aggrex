const { expect, spy, truncate } = require('test')

const {
  create,
  findById,
  findBySlug,
  findBy,
  destroy
} = require('./articles-service')

const schema = require('./article-schema')

describe('Article Service', function () {
  beforeEach(async function () { await truncate('articles') })

  describe('create', function () {
    const subject = create

    it('creates article and returns the persisted version #integration', async function () {
      const article = await schema({
        title: 'test',
        link: 'https://example.com',
        sourceId: 'sourceId-123'
      })

      const results = await subject(article)

      expect(results.title).to.equal('test')
      expect(results.slug).to.equal('test')
      expect(results).to.have.any.keys('_id')
    })

    context('with invalid article data', function () {
      it('throws a validation error #unit', async function () {
        const repoSpy = spy(function () {})
        const article = {
          title: 'test'
        }

        await expect(subject(article, repoSpy))
          .to.be.rejectedWith('should have required property \'link\'')
      })
    })
  })

  describe('findBy...', function () {
    describe('findById', function () {
      const subject = findById

      it('returns article by id #integration', async function () {
        const article = await schema({
          title: 'test',
          link: 'https://example.com',
          sourceId: 'sourceId-123'
        })

        const createdArticle = await create(article)
        const results = await subject(createdArticle._id)

        expect(results[0].title).to.equal('test')
        expect(results[0].slug).to.equal('test')
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

      it('returns article by slug #integration', async function () {
        const article = await schema({
          title: 'test',
          link: 'https://example.com',
          sourceId: 'sourceId-123'
        })

        const createdArticle = await create(article)
        const results = await subject(createdArticle.slug)

        expect(results[0].title).to.equal('test')
        expect(results[0].slug).to.equal('test')
        expect(results[0]).to.have.any.keys('_id')
      })

      it('returns empty when id not found #integration', async function () {
        const results = await subject('123456789012')
        expect(results).to.be.empty
      })
    })

    describe('findBy', function () {
      const subject = findBy

      it('returns article by id #integration', async function () {
        const article = await schema({
          title: 'test',
          link: 'https://example.com',
          sourceId: 'sourceId-123'
        })

        const createdArticle = await create(article)
        const results = await subject({ id: createdArticle._id })

        expect(results[0].title).to.equal('test')
        expect(results[0].slug).to.equal('test')
        expect(results[0]).to.have.any.keys('_id')
      })

      it('returns article by slug #integration', async function () {
        const article = await schema({
          title: 'test',
          link: 'https://example.com',
          sourceId: 'sourceId-123'
        })

        const createdArticle = await create(article)
        const results = await subject({ slug: createdArticle.slug })

        expect(results[0].title).to.equal('test')
        expect(results[0].slug).to.equal('test')
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

    it('deletes article by id #integration', async function () {
      const article = await create({
        title: 'test',
        link: 'https://example.com',
        sourceId: 'sourceId-123'
      })

      const results = await subject(article._id)

      expect(results.success).to.equal(true)
      expect(results.deletedCount).to.equal(1)
    })

    context('with invalid article id', function () {
      it('throws a type error for ObjectId requirements #unit', async function () {
        const repoSpy = spy(function () {})
        const id = 'abc-123'

        await expect(subject(id, repoSpy))
          .to.be.rejectedWith('TypeError: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
      })
    })
  })
})
