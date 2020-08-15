const { ObjectId } = require('bson')

exports.compose = (...fns) => (input) => fns.reduceRight((v, fn) => v.then(fn), Promise.resolve(input))

exports.toString = (data) => Promise.resolve(data).then(res => res.toString())

exports.toObjectId = function toObjectId (data) {
  return Promise.resolve(data)
    .then(res => new ObjectId(res))
}

exports.pipe = function pipe (...fns) {
  return function pipe (input) {
    return fns.reduce((v, fn) => v.then(fn), Promise.resolve(input))
  }
}

exports.pipeWith = function pipe (x, ...fns) {
  return exports.pipe(...fns)(x)
}
