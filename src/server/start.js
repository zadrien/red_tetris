require("babel-polyfill")

require = require('esm')(module)
module.exports = require('./main.js')
