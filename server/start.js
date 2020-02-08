require("babel-polyfill")

if (process.env.NODE_ENV !== "production") {
	const chokidar = require('chokidar')
	const watcher = chokidar.watch('./src')
	watcher.on('ready', () => {
        watcher.on('all', () => {
            console.log("Clearing cache");
            Object.keys(require.cache).forEach(function (id) {
                if (/[\/\\]src[\/\\]/.test(id))
                    delete require.cache[id]
            })
        })
	})
	require = require('esm')(module)
	module.exports = require('./src/main.js')
} else {
	module.exports = require('./src/main.js')
}

