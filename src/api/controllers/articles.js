const debug = require('lib/debug')('http:api:controller:articles')
const {
  all,
  findById
} = require('components/articles')

module.exports = {
  index
}

function index (req, res) {
  debug('index', req.data)

  const ids = req.data.ids
  const status = fetchParam('status', req) === 'true'

  const articles = (ids.length)
    ? findByIds(ids)
    : all()

  return Promise.resolve(articles)
    .then(filterStatus(status))
    .then(mapFn(stringifyObjectId()))
    .then(setResponseData(res))
}

function fetchParam (paramName, req) {
  return [
    req.query[`${paramName}`],
    req.body[`${paramName}`],
    req.data[`${paramName}`]
  ].filter(Boolean).reverse()[0]
}

function findByIds (ids) {
  const data = ids.flatMap(id => findById(id))
  return Promise.all(data)
    .then(flatten())
}

function filterStatus (filter) {
  return function filterStatus (items) {
    if (!filter) return items
    return items.filter(item => item.status === filter)
  }
}

function flatten (depth) {
  return function flatten (arr) {
    return arr.flat(depth)
  }
}

function setResponseData (res) {
  return function setResponseData (data) {
    res.data = { data: data }
    return data
  }
}

function mapFn (fn) {
  return function map (arr) {
    return arr.map(fn)
  }
}

function stringifyObjectId () {
  return function object (source) {
    source._id = source._id.toString()
    return source
  }
}
