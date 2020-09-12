const debug = require('lib/debug')('http:web:controller:source')
const sourceComponent = require('components/sources')
const articleComponent = require('components/articles')

module.exports = {
  index
}

async function index (req, res) {
  debug('index', req.params)

  const sources = await sourceComponent.all()
  const source = await sourceComponent
    .findBySlug(req.params.sourceSlug)
  const articles = await articleComponent
    .findBySource(source[0])
    .then(sortPublicationDateDesc)

  res.view = 'source'
  res.locals = {
    sources,
    source: source[0],
    articles,

    title: source[0].title
  }
}

const sortPublicationDateDesc = (articles) =>
  articles.sort((a, b) => (a.publicationDate < b.publicationDate) ? 1 : -1)
