import http from 'http'
import path from 'path'
import fs from 'fs'

import debug from 'debug'

import params from '../../params'
import { initConfig } from './config'
import wSocket from './wSocket/wSocket'

const logerror = debug('tetris:error')
, loginfo = debug('tetris:info')

const server = http.createServer((req, res) => {	
	const getFile = (file) => path.resolve(__dirname, `../../${file}`)
	const notFound = '404 Not found'
	switch (req.url) {
		case '/':
			return fs.readFile(getFile('index.html'), (err, data) => {
				if (err)
					throw err
				res.end(data)
			})
		case '/bundle.js':
			return fs.readFile(getFile(`build${req.url}`), (err, data) => {
				if (err)
					throw err
				res.end(data)
			})
		default:
			res.writeHead(404, {
				'Content-Length': Buffer.byteLength(notFound),
				'Content-Type': 'text/plain'
			})
			res.end(notFound)
	}
})

const wsocket = new wSocket(server)

initConfig(wsocket.wServer)


server.listen(process.env.SERVER_PORT, () => {
	loginfo(`Listening on port :${process.env.SERVER_PORT}`)
})

process.once('SIGINT', (code) => {
  wsocket.close()
})
module.exports = server

