module.exports = {
  async: true,
  modifying: true,
  type: 'string',

  compile: (schema) => validate
}

function validate (data, _path, parent, name) {
  // Use data to find the schema param value if it exists
  // otherise use the data as the value
  // Object Injection Sink
  // calling parent[name] directly here is a security risk
  // using to string ensures that the index is not malicious
  // if using an number index use parse int
  parent[name.toString()] = safe(parent[data.toString()] || data)

  return true
}

// Original implementation
// https://lucidar.me/en/web-dev/how-to-slugify-a-string-in-javascript/
function safe (str) {
  str = str.replace(/^\s+|\s+$/g, '')

  // Make the string lowercase
  str = str.toLowerCase()

  // Remove accents, swap ñ for n, etc
  const from = 'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;'
  const to = 'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------'
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(/from.charAt(i)/g, to.charAt(i))
  }

  // Remove invalid chars
  str = str.replace(/[^a-z0-9 -]/g, '')
  // Collapse whitespace and replace by -
    .replace(/\s+/g, '-')
  // Collapse dashes
    .replace(/-+/g, '-')

  // remove trailing hyphen
  str = str.replace(/-$/g, '')

  return str
}
