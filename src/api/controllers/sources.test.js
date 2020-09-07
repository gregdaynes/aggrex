const { expect, request, truncate } = require('test')
const app = require('app')

const { create } = require('components/sources')

describe('API Source Controller', function () {
  beforeEach(async function () { await truncate('sources') })

  describe('index #integration', function () {
    context('with no ids param', function () {
      it('returns a list of all sources', async function () {
        const source = await create({
          name: 'test',
          url: 'http://example.com'
        })

        const expectedSources = [toJSON(source)]

        return request(app)
          .get('/api/sources')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response =>
            expect(response.body).to.deep.equal({ data: expectedSources }))
      })
    })

    context('with empty ids param', function () {
      it('returns a list of all sources', async function () {
        const source = await create({
          name: 'test',
          url: 'http://example.com'
        })

        const expectedSources = [toJSON(source)]

        return request(app)
          .get('/api/sources')
          .query({ ids: [] })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response =>
            expect(response.body).to.deep.equal({ data: expectedSources }))
      })
    })

    context('with ids param', function () {
      it('returns a list sources matching ids provided', async function () {
        await create({
          name: 'test',
          url: 'http://example.com'
        })

        const source = await create({
          name: 'test 2',
          url: 'http://example.com'
        })

        const expectedSources = [toJSON(source)]

        return request(app)
          .get('/api/sources')
          .query({ ids: source._id.toString() })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response =>
            expect(response.body).to.deep.equal({ data: expectedSources }))
      })
    })

    context('only enabled', function () {
      it('returns a list sources that are enabled', async function () {
        await create({
          name: 'test',
          url: 'http://example.com',
          enabled: false
        })

        const source = await create({
          name: 'test 2',
          url: 'http://example.com'
        })

        const expectedSources = [toJSON(source)]

        return request(app)
          .get('/api/sources')
          .set('Accept', 'application/json')
          .query({ enabled: true })
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response =>
            expect(response.body).to.deep.equal({ data: expectedSources }))
      })
    })
  })
})

function toJSON (obj) {
  return JSON.parse(JSON.stringify(obj))
}
