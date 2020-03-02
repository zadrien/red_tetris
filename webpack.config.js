const path = require('path')

module.exports = {
	entry: './src/client/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
		  		query:{
					presets: [
						"@babel/preset-env",
						"@babel/preset-react"
					]
		  		}
			},
			{
				test: /\.css$/i,
				loader: ['style-loader', 'css-loader']
			}
		]
	  }
}