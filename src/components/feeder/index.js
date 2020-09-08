const debug = require('lib/debug')('component:feeder')

const { parseISO: dateParseISO } = require('date-fns')
const Parser = require('rss-parser')
const articles = require('components/articles')
const authors = require('components/authors')

const parser = new Parser()

module.exports = {
  fetchFromSource
}

async function fetchFromSource (source) {
  debug('fetchFromSource', source)

  if (!source || !source._id) return Promise.resolve([])

  return Promise.resolve(source)
    .then(parseSource())
    .then(getItems())
    .then(makeItems(source))
    .then(writeArticles())
    .then(resolveAll())
    .catch(handleError('fetchFromSource'))
}

const parseSource = () =>
  (source) => parser.parseURL(source.url)

const getItems = () =>
  (feedResults) => feedResults.items

const makeItems = (source) =>
  (rawItems) => rawItems.map(parseItem(source))

const writeArticles = () =>
  (articles) => articles.map(writeArticle())

const writeArticle = () =>
  async (article) => articles.fetch(await article)

const fetchAuthorId =
  async (handle) => await authors.fetch({ handle }).then(author => author._id)

const resolveAll = () =>
  (promises) => Promise.all(promises)

function parseItem (source) {
  return async function parseItem (item) {
    return {
      authorId: await fetchAuthorId(item.author),
      content: item.content,
      description: item.contentSnippet,
      excerpt: item.contentSnippet,
      link: item.link,
      publicationDate: dateParseISO(item.pubDate),
      sourceId: source._id,
      title: item.title
    }
  }
}

function handleError (...args) {
  return function (err) {
    debug('error', ...args, err)

    if (err.validation) {
      const message = err.errors.map(error => error.message).join('; ')
      throw new Error(message)
    }

    throw new Error(err)
  }
}
