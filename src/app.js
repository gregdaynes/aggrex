const app = require('express')()
module.exports = app
app.disable('x-powered-by')
app.use('/api', api)
