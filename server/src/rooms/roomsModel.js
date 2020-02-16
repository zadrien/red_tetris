import _ from 'lodash'
import { Tetraminos } from '../Game/tetraminos'
import { isPlaying } from './helpers'

export default function Lobby(io, id, name, mode) {
	this.io = io.sockets.in(id)
	this.id = id
	this.name = name
	this.mode = selectMode(mode)
	this.host = undefined
	this.users = {}
	this.start = false
	this.pieces = []
	this.broad = setInterval(function () {
		this.startBroadcast()
	}.bind(this), 500)
	this.ping('CHECK')
}

Lobby.prototype.kill = function() {
	if (this.broad)
		clearInterval(this.broad)
	if (this.start) {
		this.io.in(this.id).emit("LEAVE", { state: "QUIT", msg: "Server may intentionaly kill this lobby" })
		_.map(this.users, (user) => {
			user.stopGame()
		})
	}
	return true
}

Lobby.prototype.newPlayer = function (user) {
	if (this.start)
		throw new Error("Lobby as already started")
	this.users[user.socket.id] = user
	user.join(this)
	if (this.host === undefined)
		this.host = user
	user.Notify("JOINED", { state: "JOINED", room: {id: this.id, name: this.name, mode: this.mode }})		
	user.Notify("HOST", { host: this.host.socket.id === user.socket.id })
	user.initGame(this.mode)
	this.ping('CHECK')
	return true
}

Lobby.prototype.startGame = function (user) {
	if (user.socket.id === this.host.socket.id) {
		this.start = true
		// this.io.in(this.id).emit("START", { start: this.start })
		var ids = Object.keys(this.users)
		ids.map(id => {
			this.users[id].Notify("START", { start: this.start })
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
	this.start = false
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
	
	// delete user.game
	delete this.users[user.socket.id] // BECUSE OF U
	console.log(Object.keys(this.users).length)
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
		this.host.Notify("START", { start: this.start })
	} else {
		user.Notify("START", { start: !this.start})
		user.Notify("GAMEOVER", { winner: false }) // maybe not necessary
	}
}

Lobby.prototype.startBroadcast = function () {
	var id = Object.keys(this.users)
	if (!id)
		return
	var arr = []
	id.map((v, k) => {
		arr.push(this.users[v].get())
	})
	this.io.in(this.id).emit("PLAYERS", arr)
}

Lobby.prototype.pieceCallback = function (id, nbr) { // remove id
	let p = this.pieces[nbr]
	if (!p) {
		p = Tetraminos()
		this.pieces.push(p)
	}
	return p
}

Lobby.prototype.mallusCallback = function (userID) {
	let ids = Object.keys(this.users)
	
	// console.log(this.users)
	console.log(ids.length)
	if (ids.length < 2)
		return false
	ids.map(id => {
		if (id !== userID)
			this.users[id].getMalus()
	})
	return true
}

Lobby.prototype.ping = function (event) {
	var mode = this.mode === true ? "invisible" : "classic"
	var nbr = Object.keys(this.users).length
	let info = {
		id: this.id,
		name: this.name,
		mode: mode,
		nbrUser: nbr,
		isStarted: this.start
	}
	try {
		this.io.emit(event, { room : info })
	} catch(err) {
		console.log(err)
	}
}

function selectMode(mode) {
	if (mode === "classic")
		return false;
	else if (mode === "invisible")
		return true;
	return false;
}
