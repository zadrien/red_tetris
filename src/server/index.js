import http from 'http'
import path from 'path'
import fs from 'fs'

import debug from 'debug'
import io from 'socket.io'

import params from '../../params'
import { initConfig } from './config'
import { fetch, join, leave, start } from './rooms/roomsAPI'
import User from './player/playerController'

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

const ioServer = io(server)

initConfig(ioServer, params)
const userController = new User({})
ioServer.on('connection', function (socket) {
	loginfo(`Socket connected: ${socket.id}`)
	socket.on('login', function(data) {
		let user
		try {
			user = userController.login(socket, data)
			socket.emit("login", { name: user.name })
			if (data.hasOwnProperty('room'))
				join(io, user, data)
			socket.on('FETCH', (data) => fetch(ioServer, user, data))
			socket.on('JOIN', (data) => join(ioServer, user, data))
			socket.on("LEAVE", (data) => leave(user, data))
			socket.on("START", (data) => start(user, data))
		} catch (err) {
			socket.emit("login", { err: err.message })
			logerror(err)
		}
	})
	
	socket.on('disconnect', function() {
		loginfo('Socket disconnected: ' + socket.id);
		userController.logout(socket)			
	})
})

server.listen(params.server.port, () => {
	console.log("Listening on port: ", params.server.url)
})

