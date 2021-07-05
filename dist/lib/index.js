"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyDirectory = copyDirectory;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mkdir(dirPath) {
  console.log(_path.default.dirname(dirPath));

  if (!_fs.default.existsSync(dirPath)) {
    mkdir(_path.default.dirname(dirPath));

    _fs.default.mkdirSync(dirPath);
  }
}

function copyDirectory(src, dest) {
  if (!_fs.default.existsSync(src)) {
    return false;
  }

  mkdir(dest);

  const dirs = _fs.default.readdirSync(src);

  dirs.forEach(item => {
    const dirPath = _path.default.join(src, item);

    const stat = _fs.default.statSync(dirPath);

    if (stat.isFile()) {
      _fs.default.copyFileSync(dirPath, _path.default.join(dest, item));
    } else if (stat.isDirectory()) {
      copyDirectory(dirPath, _path.default.join(dest, item));
    }
  });
  return true;
}