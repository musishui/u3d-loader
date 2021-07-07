"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFile = readFile;
exports.getAllFiles = getAllFiles;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readFile(file) {
  return _fs.default.readFileSync(file);
}

function getAllFiles(src) {
  let files = [];

  if (!_fs.default.existsSync(src)) {
    return files;
  }

  const dirs = _fs.default.readdirSync(src);

  dirs.forEach(item => {
    const dirPath = _path.default.join(src, item);

    const stat = _fs.default.statSync(dirPath);

    if (stat.isFile()) {
      files.push(dirPath);
    } else if (stat.isDirectory()) {
      files.push(...getAllFiles(dirPath));
    }
  });
  return files;
}