(async () => {
  const fs = require('fs')
  const Path = require('path')
  const Util = require('util')
  const Slug = require('slug')

  const readdir = Util.promisify(fs.readdir)
  const readFile = Util.promisify(fs.readFile)
  const writeFile = Util.promisify(fs.writeFile)

  const filePath = (path) => Path.join(__dirname, `../${path}`)

  const getContents = async (path, encoding = 'utf-8') => await readFile(path, encoding)

  const markdownLink = (path) => `- [${Path.basename(path, '.md')}](${path})`

  const directoryLinkList = async (path) => {
    const dirPath = Path.dirname(path)

    const addDirectoryToFilename = (name) => Path.join(dirPath, name)

    return await readdir(filePath(dirPath))
      .then(filenames => filenames.map(addDirectoryToFilename))
      .then(paths => paths.map(markdownLink))
      .then(links => links.join('\n'))
  }

  const isDirectoryGlob = (path) => path.substr(-1) === '*'

  const headerToNestedList = (heading) => {
    let [indentation, text] = heading.split(/ (.+)/)
    indentation = indentation.replace(/#/g, '- ')
    return `${indentation}[${text}](#${Slug(text)})`
  }

  const replaceIncludePaths = async (source) => {
    const includes = source.matchAll(/^\/.*$/gm)
    if (!includes) return source

    for (const match of includes) {
      const matchPath = match[0].substr(1)
      const includeContent = (isDirectoryGlob(matchPath))
        ? await directoryLinkList(matchPath)
        : await getContents(filePath(matchPath))

      source = source.replace(match[0], includeContent.trim())
    }

    return source
  }

  const replaceTableOfContents = async (source) => {
    const tocTag = source.match(/^{{.?TOC.?}}$/gm)[0]
    if (!tocTag) return source

    const matchedHeaders = source.matchAll(/^#+\s.*$/gm)
    const tableOfContents = ['## Table of Contents']

    for (const heading of matchedHeaders) {
      tableOfContents.push(headerToNestedList(heading[0]))
    }

    return source.replace(tocTag, tableOfContents.join('\n'))
  }

  try {
    const [source, destination] = process.argv.slice(2)

    await getContents(source)
      .then(replaceIncludePaths)
      .then(replaceTableOfContents)
      .then((content) => writeFile(filePath(destination), content))
  } catch (err) {
    console.error(err)
  }
})()
