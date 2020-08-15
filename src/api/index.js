const app = require('express').Router()
const bodyParser = require('body-parser')

const normalizeBody = require('./middleware/normalize-body')
const logRequest = require('./middleware/log-request')
const respond = require('./middleware/respond')
const controller = require('./middleware/controller')
const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')

module.exports = app

app.use(bodyParser.json())
app.use(normalizeBody())
app.use(logRequest())

app.use(respond('json'))
app.use(notFound())
app.use(errorHandler())
