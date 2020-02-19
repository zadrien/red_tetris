import _ from 'lodash'
import { Tetraminos } from '../Game/tetraminos'
import { isPlaying } from './helpers'

export default function Lobby(io, id, name, mode) {
	this.io = io//.sockets.in(id)
	this.id = id
	this.name = name
	this.mode = mode === "classic" ? false : true
	this.host = undefined
	this.users = {}
	this.isOpen = true
	this.pieces = []
	this.broad = setInterval(function () {
		this.startBroadcast(io)
	}.bind(this), 500)
	this.ping('CHECK')
}
Lobby.prototype.get = function () {
	const obj = {
		id: this.id,
		name: this.name,
		mode: this.mode === true ? "invisible": "classic",
		nbrUser: Object.keys(this.users).length,
		isOpen: this.isOpen
	}
	return obj
}

Lobby.prototype.kill = function() {
	if (this.broad)
		clearInterval(this.broad)
	if (!this.isOpen) {
		this.io.in(this.id).emit("LEAVE", { state: "QUIT", msg: "Server may intentionaly kill this lobby" })
		_.map(this.users, (user) => {
			user.stopGame()
		})
	}
	return true
}

Lobby.prototype.newPlayer = function (user) {
	if (!this.isOpen)
		throw new Error("Lobby as already started")
	this.users[user.socket.id] = user
	user.join(this)
	if (this.host === undefined)
		this.host = user
	user.Notify("JOINED", { state: "JOINED", room: this.get() })//{id: this.id, name: this.name, mode: this.mode }})		
	user.Notify("HOST", { host: this.host.socket.id === user.socket.id })
	user.initGame(this.mode)
	this.ping('CHECK')
	return true
}

Lobby.prototype.startGame = function (user) {
	if (user.socket.id === this.host.socket.id) {
		this.isOpen = false
		// this.io.in(this.id).emit("START", { start: this.isOpen })
		var ids = Object.keys(this.users)
		ids.map(id => {
			this.users[id].Notify("START", { start: this.isOpen })
			this.users[id].initGame(this.mode)
			this.users[id].isPlaying = true;
			this.users[id].start(this.pieceCallback.bind(this),
								 this.mallusCallback.bind(this),
								 this.endGameCallback.bind(this))
		})
		this.ping('CHECK')
		return true
	}
	return false
}
Lobby.prototype.resetLobby = function () {
	this.isOpen = true
	this.pieces = []
	this.ping('CHECK')
}

Lobby.prototype.leaveGame = function (user) {
	var leaver = this.users[user.socket.id]
	if (!leaver)
		throw new Error("User not found")
	user.leave(this.id) //
	if (leaver.isPlaying)
		leaver.stopGame()
	
	delete this.users[user.socket.id] // BECUSE OF U
	if (!isPlaying(this.users))
		this.resetLobby()
	if (user.socket.id === this.host.socket.id) {
		this.host = undefined
		var newHost = _.sample(this.users)
		if (newHost) {
			this.host = newHost
			this.host.Notify("HOST", { host: true })
		}
	}
	user.Notify("LEAVE", { state: "QUIT" })
	this.ping('CHECK')
}

Lobby.prototype.endGameCallback = function (id) {
	var user = this.users[id]
	if (!user) 
		return
	if (user.isPlaying)
		user.stopGame()
	var stillPlaying = _.find(this.users, function(u) { return u.isPlaying === true })
	if (_.isEmpty(stillPlaying)) {
		this.resetLobby()
		user.Notify("GAMEOVER", { winner: true })
		this.host.Notify("START", { start: this.isOpen })
	} else {
		user.Notify("START", { start: !this.isOpen})
		user.Notify("GAMEOVER", { winner: false }) // maybe not necessary
	}
}

Lobby.prototype.mallusCallback = function (userID) {
	const users = Object.values(this.users)

	if (users.length < 2)
		return false
	users.forEach(user => {
		if (user.socket.id !== userID)
			user.getMalus()
	});
	// users.map(user => {
	// 	if (user.socket.id !== userID)
	// 		user.getMalus()
	// })
	return true
}

Lobby.prototype.pieceCallback = function (id, nbr) { // remove id
	let p = this.pieces[nbr]
	if (!p) {
		p = Tetraminos()
		this.pieces.push(p)
	}
	return p
}

Lobby.prototype.startBroadcast = function (io) {
	const connectedUsers = Object.values(this.users)
	if (!connectedUsers)
		return 
	const arr = []
	connectedUsers.forEach(user => {
		arr.push(user.get())
	})
	io.to(this.id).emit('PLAYERS', arr)
}

Lobby.prototype.ping = function (event) {
	const data = this.get()
	// var mode = this.mode === true ? "invisible" : "classic"
	// var nbr = Object.keys(this.users).length
	// let info = {
	// 	id: this.id,
	// 	name: this.name,
	// 	mode: mode,
	// 	nbrUser: nbr,
	// 	isStarted: this.isOpen
	// }
	this.io.emit(event, { room : data })

}

// function selectMode(mode) {
// 	if (mode === "classic")
// 		return false;
// 	else if (mode === "invisible")
// 		return true;
// 	return false;
// }
