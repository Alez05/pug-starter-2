const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')

// The path to your JSON files
let dataDirectory = path.join(__dirname, './source-code/data')

// Get the list of JSON files
let dataFiles = fs
  .readdirSync(dataDirectory)
  .filter(
    (file) =>
      file.endsWith('.json') || file.endsWith('.yml') || file.endsWith('.yaml')
  )

// Combine all the JSON data into a single object
let jsonData = {}
for (let file of dataFiles) {
  let filePath = path.join(dataDirectory, file)
  let data
  if (file.endsWith('.json')) {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } else if (file.endsWith('.yml') || file.endsWith('.yaml')) {
    data = yaml.load(fs.readFileSync(filePath, 'utf8'))
  }
  jsonData[file.replace('.json', '').replace('.yml', '').replace('.yaml', '')] =
    data
}

module.exports = jsonData
