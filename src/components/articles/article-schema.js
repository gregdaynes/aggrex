const { schema, string, url, enabled, datetime, objectId, slug } = require('lib/schema')

const properties = {
  authorId: objectId(),
  content: string(),
  description: string(),
  excerpt: string(),
  link: url(),
  publicationDate: datetime(),
  slug: slug('title'),
  sourceId: objectId(),
  status: enabled(true),
  title: string()
}

const required = [
  'link',
  'sourceId',
  'title'
]

const $async = true
const type = 'object'

module.exports = schema({
  $async,
  type,
  properties,
  required
})
