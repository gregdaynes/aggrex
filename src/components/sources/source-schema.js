const { schema, name, url, enabled, slug, seconds } = require('lib/schema')

const properties = {
  name: name(),
  url: url(),
  enabled: enabled(true),
  slug: slug('name'),
  fetchInterval: seconds(1800)
}

const required = [
  'name',
  'url'
]

const $async = true
const type = 'object'

module.exports = schema({
  $async,
  type,
  properties,
  required
})
