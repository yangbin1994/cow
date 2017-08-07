const fs = require('fs')
const path = require('path')
const lessToJs = require('less-vars-to-js')

module.exports = () => {
  const themePath = path.join(__dirname, './src/styles/cover.less')
  return lessToJs(fs.readFileSync(themePath, 'utf8'))
}
