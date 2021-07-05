import fs from 'fs'
import path from 'path'

function mkdir(dirPath) {
  console.log(path.dirname(dirPath))
  if (!fs.existsSync(dirPath)) {
    mkdir(path.dirname(dirPath))
    fs.mkdirSync(dirPath)
  }
}

export function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) {
    return false
  }
  mkdir(dest)
  const dirs = fs.readdirSync(src)
  dirs.forEach((item) => {
    const dirPath = path.join(src, item)
    const stat = fs.statSync(dirPath)
    if (stat.isFile()) {
      fs.copyFileSync(dirPath, path.join(dest, item))
    } else if (stat.isDirectory()) {
      copyDirectory(dirPath, path.join(dest, item))
    }
  })
  return true
}





