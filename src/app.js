const app = require('express')()
const api = require('api')

module.exports = app

app.disable('x-powered-by')
app.use('/api', api)
