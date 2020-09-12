const debug = require('lib/debug')('http:web:controller:article')
const sourceComponent = require('components/sources')
const articleComponent = require('components/articles')

module.exports = {
  index
}

async function index (req, res) {
  debug('index', req.params)

  const sources = await sourceComponent.all()
  const article = await articleComponent.findById(req.params.articleId)
  const source = await sourceComponent.findById(article[0].sourceId)

  res.view = 'article'
  res.locals = {
    sources,
    source: source[0],
    article: article[0],

    title: article[0].title
  }
}
