const debug = require('lib/debug')('http:api:controller:sources')
const {
  all,
  findById
} = require('components/sources')

module.exports = {
  index
}

function index (req, res) {
  debug('index', req.body)

  const ids = req.body.ids
  const enabled = req.body.enabled

  const sources = (ids.length)
    ? findByIds(ids)
    : all()

  return Promise.resolve(sources)
    .then(filterEnabled(enabled))
    .then(mapFn(stringifyObjectId()))
    .then(setResponseData(res))
}

function findByIds (ids) {
  const data = ids.flatMap(id => findById(id))
  return Promise.all(data)
    .then(flatten())
}

function filterEnabled (filter) {
  return function filterEnabled (items) {
    if (!filter) return items
    return items.filter(item => item.enabled === filter)
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
