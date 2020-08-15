const Ajv = require('ajv')
const slug = require('./slug')
const objectId = require('./objectId')

const ajv = new Ajv({
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true
})

ajv.addKeyword('slugify', slug)
ajv.addKeyword('objectId', objectId)

exports.schema = (schema) => ajv.compile(schema)

exports.custom = (props, defaultValue) => {
  if (defaultValue) props.default = defaultValue
  return props
}
