import io from 'socket.io'
import debug from 'debug'
import _ from 'lodash'
import params from '../params'

import { initConfig } from './config'

import { fetch, join, leave, start } from './rooms/roomsAPI'
import User from './player/playerController'

const userController = new User({})
const logerror = debug('tetris:error')
, loginfo = debug('tetris:info')

const server = io.listen(params.server.port)
loginfo(`Listening on: ${params.server.url}`)

initConfig(server, params)

server.on('connection', function(socket) {
	loginfo(`Socket connected: ${socket.id}`)
	socket.on('login', function(data) {
		let user
		try {
			user = userController.login(socket, data)
			socket.emit("login", { name: user.name })
			if (data.hasOwnProperty('room'))
				join(io, user, data)
			socket.on('FETCH', (data) => fetch(server, user, data))
			socket.on('JOIN', (data) => join(server, user, data))
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

module.exports = server