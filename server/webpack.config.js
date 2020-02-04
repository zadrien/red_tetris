const path = require('path')

module.exports = {
	entry: "./src/start.js",
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'api.bundle.js'
	},
	target: 'node'
}