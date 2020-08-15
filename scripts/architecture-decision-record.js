(async () => {
  const fs = require('fs')
  const path = require('path')
  const util = require('util')
  const mkdirp = require('mkdirp')
  const pkg = require('~/package.json')
  const slug = require('slug')

  const mkdir = util.promisify(mkdirp)
  const readdir = util.promisify(fs.readdir)
  const readFile = util.promisify(fs.readFile)
  const writeFile = util.promisify(fs.writeFile)

  const getExistingFiles = async (dirpath) => await readdir(dirpath)

  const getTemplate = async (templatePath, encoding = 'utf-8') => await readFile(templatePath, encoding)

  const newFilePath = async (directory, number, name, extension) =>
    path.join(path.resolve(directory), slug(`${number} ${name}`) + extension)

  const getLastNumber = async (files) =>
    Number(files
      .sort((a, b) => a.split('-')[0] - b.split('-')[0])
      .reverse()[0]
      .split('-')[0])

  try {
    if (!process.argv.slice(2).length) throw new Error('requires a name')
    const name = process.argv.slice(2).join(' ')

    // make directory if it doesn't exist
    await mkdirp(pkg.adr.path)

    const template = await getTemplate(pkg.adr.template)
    const extension = path.extname(pkg.adr.template)

    const files = await getExistingFiles(pkg.adr.path)
    const lastNumber = await getLastNumber(files) || '000'
    const nextNumber = `${lastNumber + 1}`.padStart(3, '0')
    const filename = await newFilePath(pkg.adr.path, nextNumber, name, extension)

    // create file with template contents
    await writeFile(filename, template)

    console.log(filename)
  } catch (err) {
    console.error(err)
  }
})()
