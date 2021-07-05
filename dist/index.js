"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loader;

var _path = _interopRequireDefault(require("path"));

var _loaderUtils = _interopRequireDefault(require("loader-utils"));

var _lib = require("./lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function loader(content) {
  var callback = this.async();

  const options = _loaderUtils.default.getOptions(this);

  const context = this.context;
  const outputPath = this._compiler.outputPath;

  const target = _path.default.join(outputPath, _path.default.basename(context));

  (0, _lib.copyDirectory)(context, target);
  const esModule = typeof options.esModule !== 'undefined' ? options.esModule : false;
  const jsUrl = `./${_path.default.basename(context)}/Build/UnityLoader.js`;
  const jsonUrl = `./${_path.default.basename(context)}/Build/builds.json`;

  const importPath = _loaderUtils.default.stringifyRequest(this, `!${_path.default.join(__dirname, 'runtime/index.js')}`);

  const rtn = `loadJs('${jsUrl}','${jsonUrl}')`;
  const res = esModule ? `import loadJs from ${importPath}; export default ${rtn};` : `var loadJs = require(${importPath});module.exports=${rtn};`;
  callback(null, res);
}