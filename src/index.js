import path from 'path'
import utils from 'loader-utils'
import { copyDirectory } from './lib'

export default async function loader(content) {
  var callback = this.async()
  const options = utils.getOptions(this)

  const context = this.context
  const outputPath = this._compiler.outputPath
  const target = path.join(outputPath, path.basename(context))

  copyDirectory(context, target)

  const esModule = typeof options.esModule !== 'undefined' ? options.esModule : false
  const jsUrl = `./${path.basename(context)}/Build/UnityLoader.js`
  const jsonUrl = `./${path.basename(context)}/Build/builds.json`


  const importPath = utils.stringifyRequest(this, `!${path.join(__dirname, 'runtime/index.js')}`)
  const rtn = `loadJs('${jsUrl}','${jsonUrl}')`
  const res = esModule ? `import loadJs from ${importPath}; export default ${rtn};`
    : `var loadJs = require(${importPath});module.exports=${rtn};`
  callback(null, res)
}