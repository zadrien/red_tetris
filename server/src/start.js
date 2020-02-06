require("babel-polyfill")

if (process.env.NODE_ENV !== "production") {
	require = require('esm')(module)
	module.exports = require('./main.js')
} else {
	module.exports = require('./main.js')
}

