import fs from 'fs'
import path from 'path'

export function readFile(file) {
  return fs.readFileSync(file)
}

export function getAllFiles(src) {
  let files = []
  if (!fs.existsSync(src)) {
    return files
  }
  const dirs = fs.readdirSync(src)
  dirs.forEach((item) => {
    const dirPath = path.join(src, item)
    const stat = fs.statSync(dirPath)
    if (stat.isFile()) {
      files.push(dirPath)
    } else if (stat.isDirectory()) {
      files.push(...getAllFiles(dirPath))
    }
  })
  return files
}






