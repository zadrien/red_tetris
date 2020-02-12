import io from 'socket.io'
import debug from 'debug'
import _ from 'lodash'
import params from '../params'

import { connectToDatabase } from './config'

import { fetch, join, leave, start } from './rooms/roomsAPI'
import userController from './player/playerController'

const logerror = debug('tetris:error')
, loginfo = debug('tetris:info')

connectToDatabase(params.server.db)

const server = io.listen(params.server.port)
loginfo(`Listening on: ${params.server.url}`)

server.on('connection', function(socket) {
	loginfo("Socket connected: YOO " + socket.id)
	socket.on('login', async function(data) {
		let user
		try {
			if (!data)
				return
			user = userController.login(socket, data)
			socket.emit("login", { name: user.name })
			if (!_.isEmpty(data.room))
				join(io, user, data)
			socket.on('FETCH', (data) => fetch(server, user, data))
			socket.on('JOIN', (data) => join(server, user, data))
			socket.on("LEAVE", (data) => leave(user, data))
			socket.on("START", (data) => start(user, data))
		} catch (err) {
			socket.emit("login", { err: err.message })
		}
	})
	
	socket.on('disconnect', function() {
		loginfo('Socket disconnected: ' + socket.id);
		userController.logout(socket)			
	})
})