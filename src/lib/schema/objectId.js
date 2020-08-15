const ObjectId = require('bson').ObjectId

module.exports = {
  async: true,
  modifying: true,
  type: 'string',

  compile: (schema) => validate
}

function validate (data, _path, parent, name) {
  // Object Injection Sink
  // calling parent[name] directly here is a security risk
  // using to string ensures that the index is not malicious
  // if using an number index use parse int
  parent[name.toString()] = new ObjectId(data)

  return true
}
