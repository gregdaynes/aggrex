const app = require('express')()
const path = require('path')
const api = require('api')
const web = require('web')

module.exports = app

app.disable('x-powered-by')
app.set('views', path.join(__dirname, 'web/views'))
app.set('view engine', 'ejs')
app.use('/api', api)
app.use('/', web)
