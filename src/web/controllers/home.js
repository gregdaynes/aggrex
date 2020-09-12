const debug = require('lib/debug')('http:web:controller:home')
const sourceComponent = require('components/sources')

module.exports = {
  index
}

async function index (req, res) {
  debug('index', req.params)

  const sources = await sourceComponent.all()

  res.view = 'home'
  res.locals = {
    sources,

    title: 'home'
  }
}
