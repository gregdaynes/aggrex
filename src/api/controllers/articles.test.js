const { expect, request, truncate } = require('test')
const app = require('app')

const { create } = require('components/articles')

describe('API Source Controller', function () {
  beforeEach(async function () { await truncate('articles') })

  describe('index #integration', function () {
    context('with no ids param', function () {
      it('returns a list of all article', async function () {
        const source = await create({
          title: 'test',
          link: 'https://example.com',
          sourceId: 'sourceId-123'
        })

        const expectedArticles = [toJSON(source)]

        return request(app)
          .get('/api/articles')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response =>
            expect(response.body).to.deep.equal({ data: expectedArticles }))
      })
    })

    context('with empty ids param', function () {
      it('returns a list of all articles', async function () {
        const source = await create({
          title: 'test',
          link: 'https://example.com',
          sourceId: 'sourceId-123'
        })

        const expectedArticles = [toJSON(source)]

        return request(app)
          .get('/api/articles')
          .query({ ids: [] })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response =>
            expect(response.body).to.deep.equal({ data: expectedArticles }))
      })
    })

    context('with ids param', function () {
      it('returns a list articles matching ids provided', async function () {
        await create({
          title: 'test',
          link: 'https://example.com',
          sourceId: 'sourceId-123'
        })

        const source = await create({
          title: 'test-2',
          link: 'https://example.com',
          sourceId: 'sourceId-123'
        })

        const expectedArticles = [toJSON(source)]

        return request(app)
          .get('/api/articles')
          .query({ ids: source._id.toString() })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response =>
            expect(response.body).to.deep.equal({ data: expectedArticles }))
      })
    })

    context('only enabled', function () {
      it('returns a list articles that are enabled', async function () {
        await create({
          title: 'test-1',
          link: 'https://example.com',
          sourceId: 'sourceId-123',
          status: false
        })

        const source = await create({
          title: 'test-2',
          link: 'https://example.com',
          sourceId: 'sourceId-123'
        })

        const expectedArticles = [toJSON(source)]

        return request(app)
          .get('/api/articles')
          .set('Accept', 'application/json')
          .query({ status: true })
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response =>
            expect(response.body).to.deep.equal({ data: expectedArticles }))
      })
    })

    context('only specific sources', function () {
      it('returns a list articles that are from the specified source', async function () {
        await create({
          title: 'test-1',
          link: 'https://example.com',
          sourceId: 'sourceId-122'
        })

        const source = await create({
          title: 'test-2',
          link: 'https://example.com',
          sourceId: 'sourceId-123'
        })

        const expectedArticles = [toJSON(source)]

        return request(app)
          .get('/api/articles')
          .set('Accept', 'application/json')
          .query({ sources: source.sourceId.toString() })
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response =>
            expect(response.body).to.deep.equal({ data: expectedArticles }))
      })
    })
  })
})

function toJSON (obj) {
  return JSON.parse(JSON.stringify(obj))
}
