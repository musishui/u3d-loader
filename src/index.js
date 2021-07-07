import path from 'path'
import utils from 'loader-utils'
import { getAllFiles, readFile } from './lib'

export default async function loader() {
  var callback = this.async()
  const options = utils.getOptions(this)
  const sourcePath = path.dirname(this.resourcePath)
  const modelName = path.basename(sourcePath)

  let jsUrl = path.posix.join(modelName, 'Build', 'UnityLoader.js')
  let jsonUrl = path.posix.join(modelName, 'Build', 'builds.json')

  if (options.outputPath) {
    jsUrl = path.posix.join(options.outputPath, jsUrl)
    jsonUrl = path.posix.join(options.outputPath, jsonUrl)
  }

  jsUrl = `__webpack_public_path__ + ${JSON.stringify(jsUrl)}`
  jsonUrl = `__webpack_public_path__ + ${JSON.stringify(jsonUrl)}`

  if (options.publicPath) {
    jsUrl = `${options.publicPath.trimEnd('/')}/${jsUrl}`
    jsonUrl = `${options.publicPath.trimEnd('/')}/${jsonUrl}`

    jsUrl = Json.stringify(jsUrl)
    jsonUrl = JSON.stringify(jsonUrl)
  }

  if (options.postTransformPublicPath) {
    jsUrl = options.postTransformPublicPath(jsUrl)
    jsonUrl = options.postTransformPublicPath(jsonUrl)
  }


  const prefix = path.posix.join(options.outputPath || '', modelName)
  const allFiles = getAllFiles(sourcePath)
  allFiles.forEach(file => {
    let rpath = path.posix.join(prefix, path.relative(sourcePath, file))
    this.emitFile(rpath, readFile(file))
  })

  const esModule = typeof options.esModule !== 'undefined' ? options.esModule : false

  const importPath = utils.stringifyRequest(this, `!${path.join(__dirname, 'runtime/index.js')}`)
  const rtn = `loadModel(${jsUrl}, ${jsonUrl})`
  const res = esModule ? `import loadModel from ${importPath}; export default ${rtn};`
    : `var loadModel = require(${importPath});module.exports=${rtn};`

  callback(null, res)
}