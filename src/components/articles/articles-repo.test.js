const { expect, truncate } = require('test')
const schema = require('./article-schema')

const {
  createArticle,
  findArticleById,
  findArticleBySlug,
  destroyArticle
} = require('./articles-repo')

describe('Article Repo', function () {
  beforeEach(async function () { await truncate('articles') })

  describe('createArticle #integration', function () {
    const subject = createArticle

    it('creates article and returns it', async function () {
      const article = await schema({
        title: 'test',
        link: 'https://example.com',
        sourceId: 'sourceId-123'
      })

      const results = await subject(article)

      expect(results).to.have.any.key('_id')
      expect(results.title).to.equal(article.title)
    })
  })

  describe('findArticleById #integration', function () {
    const subject = findArticleById

    it('returns article by id', async function () {
      const article = await schema({
        title: 'test',
        link: 'https://example.com',
        sourceId: 'sourceId-123'
      })

      const createdArticle = await createArticle(article)
      const results = await subject(createdArticle._id)

      expect(results[0].name).to.equal(article.name)
    })
  })

  describe('findArticleBySlug #integration', function () {
    const subject = findArticleBySlug

    it('returns article by slug', async function () {
      const article = await schema({
        title: 'test',
        link: 'https://example.com',
        sourceId: 'sourceId-123'
      })

      const createdArticle = await createArticle(article)
      const results = await subject(createdArticle.slug)

      expect(results[0].name).to.equal(article.name)
    })
  })

  describe('destroyArticle #integration', function () {
    const subject = destroyArticle

    it('returns a success and count, after deleting article', async function () {
      const article = await schema({
        title: 'test',
        link: 'https://example.com',
        sourceId: 'sourceId-123'
      })

      const createdArticle = await createArticle(article)
      const results = await subject(createdArticle._id)

      expect(results.deletedCount).to.equal(1)
      expect(results.success).to.equal(true)
    })

    context('when an id does not exist', function () {
      it('returns a success and count, after deleting article', async function () {
        const results = await subject(['123456789012'])

        expect(results.deletedCount).to.equal(0)
        expect(results.success).to.equal(true)
      })
    })
  })
})
