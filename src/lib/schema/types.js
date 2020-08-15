const { custom } = require('./schema')

exports.string = () => ({ type: 'string' })
exports.number = () => ({ type: 'number' })
exports.bool = () => ({ type: 'boolean' })
exports.object = () => ({ type: 'object' })

exports.enabled = (defaultValue) => custom(exports.bool(), defaultValue)
exports.name = (defaultValue) => custom(exports.string(), defaultValue)
exports.seconds = (defaultValue) => custom(exports.number(), defaultValue)
exports.url = (defaultValue) => custom(exports.string(), defaultValue)
exports.datetime = (defaultValue) => custom({ type: 'object', format: 'date-time' }, defaultValue)

exports.objectId = () => ({ objectId: 'string' })

exports.slug = (target) => custom({ type: 'string', slugify: target }, target)
