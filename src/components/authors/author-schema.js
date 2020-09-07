const { schema, string, slug } = require('lib/schema')

const properties = {
  handle: string(),
  slug: slug('handle')
}

const required = [
  'handle',
  'slug'
]

const $async = true
const type = 'object'

module.exports = schema({
  $async,
  type,
  properties,
  required
})
