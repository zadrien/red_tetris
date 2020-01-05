import fs  from 'fs'
import debug from 'debug'
import connectToDatabase from './config';
import { fetch, ping, join, leave, start } from './rooms/roomsAPI'
import Game from './player/game'
import {Controller as userController } from './player'

var url = require('url');

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

connectToDatabase("mongodb://localhost:27017/rooms")

const initEngine = io => {
    io.on('connection', function (socket) {
		loginfo("Socket connected: " + socket.id)
		
		socket.on('action', (action) => {
			console.log("Action:", action)
			if(action.type === 'server/ping') {
				socket.emit('action', { type: 'pong' })
			}
		});

		socket.on('login', async function(data) {
			var user
			try {
				user = await userController.login(socket, data)
				if (!user) {
					return
				}
				socket.emit("login", { name: user.name })
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
		const app = require('http').createServer()
		initApp(app, params, () => {
//			import io from 'socket.io'
			const io = require('socket.io')(app)
			const stop = (cb) => {
				io.close()
				app.close( () => {
					app.unref()
				})
				loginfo(`Engine stopped.`)
				cb()
			}	
			initEngine(io)
			resolve({stop})
		})
    })
    return promise
}
