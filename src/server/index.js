import fs  from 'fs'
import debug from 'debug'
import connectToDatabase from './config';
import { roomsAPI } from './rooms'
import Game from './player/game'
import { Controller as userController } from './player/playerController'
//var userController = require("./player/playerController")()
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

connectToDatabase("mongodb://database:27017/rooms")

//console.log(userController.login())
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
			console.log("logiiin evennnnnt")
			var player
			try {
				console.log("the fuuuck")
				player = await userController.login(socket, data)
				if (!player) {
					return
				}
				socket.emit("login", { name: player.name })
			} catch (err) {
				console.log("YAAAAAH", err)
				socket.emit("login", err)
				return 
			}
			console.log("??")
			socket.on('FETCH', (data) => roomsAPI.fetch(io, socket, data))
			socket.on('JOIN', (data) => roomsAPI.join(io, socket, data))
			socket.on("LEAVE", (data) => roomsAPI.leave(socket, data))
			socket.on("START", (data) => roomsAPI.start(socket, data))
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
