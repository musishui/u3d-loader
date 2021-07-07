"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loader;

var _path = _interopRequireDefault(require("path"));

var _loaderUtils = _interopRequireDefault(require("loader-utils"));

var _lib = require("./lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function loader() {
  var callback = this.async();

  const options = _loaderUtils.default.getOptions(this);

  const sourcePath = _path.default.dirname(this.resourcePath);

  const modelName = _path.default.basename(sourcePath);

  let jsUrl = _path.default.posix.join(modelName, 'Build', 'UnityLoader.js');

  let jsonUrl = _path.default.posix.join(modelName, 'Build', 'builds.json');

  if (options.outputPath) {
    jsUrl = _path.default.posix.join(options.outputPath, jsUrl);
    jsonUrl = _path.default.posix.join(options.outputPath, jsonUrl);
  }

  jsUrl = `__webpack_public_path__ + ${JSON.stringify(jsUrl)}`;
  jsonUrl = `__webpack_public_path__ + ${JSON.stringify(jsonUrl)}`;

  if (options.publicPath) {
    jsUrl = `${options.publicPath.trimEnd('/')}/${jsUrl}`;
    jsonUrl = `${options.publicPath.trimEnd('/')}/${jsonUrl}`;
    jsUrl = Json.stringify(jsUrl);
    jsonUrl = JSON.stringify(jsonUrl);
  }

  if (options.postTransformPublicPath) {
    jsUrl = options.postTransformPublicPath(jsUrl);
    jsonUrl = options.postTransformPublicPath(jsonUrl);
  }

  const prefix = _path.default.posix.join(options.outputPath || '', modelName);

  const allFiles = (0, _lib.getAllFiles)(sourcePath);
  allFiles.forEach(file => {
    let rpath = _path.default.posix.join(prefix, _path.default.relative(sourcePath, file));

    this.emitFile(rpath, (0, _lib.readFile)(file));
  });
  const esModule = typeof options.esModule !== 'undefined' ? options.esModule : false;

  const importPath = _loaderUtils.default.stringifyRequest(this, `!${_path.default.join(__dirname, 'runtime/index.js')}`);

  const rtn = `loadModel(${jsUrl}, ${jsonUrl})`;
  const res = esModule ? `import loadModel from ${importPath}; export default ${rtn};` : `var loadModel = require(${importPath});module.exports=${rtn};`;
  callback(null, res);
}