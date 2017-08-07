import fs from 'fs'
import path from 'path'

/**
 * https://github.com/sorrycc/roadhog#mock
 */
var dist = {}
fs.readdirSync(path.join(__dirname, 'mock')).forEach(function (fileName) {
    var descripe = require(path.join(__dirname, 'mock', fileName))
    Object.assign(dist, descripe)
})

export default dist
