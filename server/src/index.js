import http from 'http';
import io from 'socket.io'
import fs  from 'fs'
import debug from 'debug'
import _ from 'lodash'

import { fetch, ping, join, leave, start } from './rooms/roomsAPI'
import userController from './player/playerController'

const logerror = debug('tetris:error')
, loginfo = debug('tetris:info')

const initApp = (app, params, cb) => {
	const {host, port} = params
	const handler = (req, res) => {
		const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html'
		fs.readFile(__dirname + file, (err, data) => {
			if (err) {
				logerror(err)
				res.writeHead(500)
				return res.end('Error loading index.html')
			}
			res.writeHead(200)
			res.end(data)
		})
	}    
	app.on('request', handler)
	app.listen({host, port}, () => {
		loginfo(`tetris listen on ${params.url}`)
		cb()
	})
}

const initEngine = io => {
	io.on('connection', function (socket) {
		loginfo("Socket connected: " + socket.id)
		socket.on('login', async function(data) {
			let user
			try {
				user = userController.login(socket, data)
				if (!user)
					return
				socket.emit("login", { name: user.name })
				if (!_.isEmpty(data.room))
					join(io, user, data)
			} catch (err) {
				socket.emit("login", err)
				return 
			}
			socket.on('FETCH', (data) => fetch(io, user, data))
			socket.on('JOIN', (data) => join(io, user, data))
			socket.on("LEAVE", (data) => leave(user, data))
			socket.on("START", (data) => start(user, data))
			socket.on("CHECK", (data) => ping(user, data))
		})
		
		socket.on('disconnect', function() {
			loginfo('Socket disconnected: ' + socket.id);
			userController.logout(socket)			
		})
	})
}

export function create(params) {
	const promise = new Promise( (resolve, reject) => {
		const app = http.createServer()
		initApp(app, params, () => {
			const sock = io(app)
			const stop = (cb) => {
				sock.close()
				app.close( () => {
					app.unref()
				})
				loginfo(`Engine stopped.`)
				cb()
			}	
			initEngine(sock)
			resolve({stop})
		})
	})
	return promise
}
