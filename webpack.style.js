const fs = require('fs')
const sass = require('sass')

let embedStyles = fs.readFileSync('./source-code/embed.scss', 'utf8')
// Use a sass compiler to convert the SCSS to CSS
embedStyles = sass.renderSync({ data: embedStyles }).css.toString()

module.exports = embedStyles
