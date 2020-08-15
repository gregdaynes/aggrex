#! usr/bin/env node

// ------------------------
// Playground Configuration
// ------------------------

// Hard exit outside of development mode
if (process.env.NODE_ENV !== 'development') process.exit()

const debug = require('lib/debug')('playground', { enable: 'aggrex:*' })

const { compose, pipe, pipeWith } = require('lib/utils')

// Execute the playground and log results
run()
  .then(results => debug('results', results))
  .catch(err => debug('error', err))
  .finally(() => debug('done'))

// -------------------
// Start Of Playground
// -------------------

async function run () {
  return pipeWith(
    1,
    (a) => a * 2,
    (b) => b + 1
  )
}
