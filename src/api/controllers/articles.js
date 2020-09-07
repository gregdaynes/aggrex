const debug = require('lib/debug')('http:api:controller:articles')
const {
  all,
  findById,
  findBySource
} = require('components/articles')

module.exports = {
  index
}

function index (req, res) {
  debug('index', req.data)

  const ids = fetchParam('ids', req)
  const status = fetchParam('status', req) === 'true'
  const sources = fetchParam('sources', req, {})

  let articles
  if (ids.length) {
    articles = findByIds(ids)
  } else if (sources.length) {
    articles = findBySources(sources)
  } else {
    articles = all()
  }

  return Promise.resolve(articles)
    .then(maybe(status, filterStatus(status)))
    .then(mapFn(stringifyObjectId()))
    .then(setResponseData(res))
}

function fetchParam (paramName, req, defaultValue = undefined) {
  const param = [
    req.query[`${paramName}`],
    req.body[`${paramName}`],
    req.data[`${paramName}`]
  ].filter(Boolean).reverse()[0]

  return param || defaultValue
}

function maybe (param, func) {
  return function (res) {
    if (!param) return res

    return func(res)
  }
}

function findByIds (ids) {
  const data = ids.flatMap(id => findById(id))
  return Promise.all(data)
    .then(flatten())
}

function findBySources (sources) {
  const data = sources.flatMap(source => findBySource(source))

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
