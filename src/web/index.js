const app = require('express').Router()

const logRequest = require('../api/middleware/log-request')
const respond = require('./middleware/respond')
const controller = require('../api/middleware/controller')
const errorHandler = require('../api/middleware/error-handler')
const notFound = require('./middleware/not-found')

const { index: home } = require('./controllers/home')
const { index: source } = require('./controllers/source')
const { index: article } = require('./controllers/article')

module.exports = app

app.use(logRequest())

app.get('/', controller(home))
app.get('/source/:sourceSlug', controller(source))
app.get('/article/:articleId', controller(article))

app.use(notFound())
app.use(respond())

app.use(errorHandler())
