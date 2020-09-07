const app = require('express').Router()
const bodyParser = require('body-parser')

const normalizeRequest = require('./middleware/normalize-request')
const normalizeBody = require('./middleware/normalize-body')
const normalizeQuery = require('./middleware/normalize-query')
const logRequest = require('./middleware/log-request')
const respond = require('./middleware/respond')
const controller = require('./middleware/controller')
const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')

const { index: articleIndex } = require('./controllers/articles')
const { index: sourceIndex } = require('./controllers/sources')

module.exports = app

app.use(bodyParser.json())
app.use(logRequest())
app.use(normalizeRequest())
app.use(normalizeBody())
app.use(normalizeQuery())

app.get('/articles', controller(articleIndex))
app.get('/sources', controller(sourceIndex))

app.use(respond('json'))
app.use(notFound())
app.use(errorHandler())
