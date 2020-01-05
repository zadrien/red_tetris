import _ from 'lodash'
import Tetraminos from '../player/tetraminos'
import { showMap } from '../player/helpers'


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
}

Lobby.prototype.newPlayer = function (user) {
	if (this.start)
		return false
	this.users[user.socket.id] = user
	user.socket.join(this.id)
	
	user.Notify("JOINED", { state: "JOINED", room: {id: this.id, name: this.name, mode: this.mode }})
	if (this.host === undefined) {
		this.host = user
		user.Notify("HOST", { host: true })
	} else
		user.Notify("HOST", { host: false })
	// Adding event here
	user.initGame(this.mode)
	return true
}

Lobby.prototype.leave = function (user) {
	console.log(`User(${user.socket.id} leaving room...`)
	if (this.start)
		this.endGameCallback(user.socket.id)
	var leaver = this.users[user.socket.id]
	if (!leaver)
		return
	delete user.game
	user.Notify("LEAVE", { state: "QUIT" })
	user.socket.leave(this.id)
	
	delete this.users[user.socket.id]
	
	if (user.socket.id === this.host.socket.id) {
		console.log("Searching a new host..")
		this.host = undefined
		var newHost = _.sample(this.users)
		if (!newHost)
			return
		this.host = newHost
		this.host.Notify("HOST", { host: true })
		this.host.Notify("START", { start: this.start })
	}

}

Lobby.prototype.startGame = function (user) {
	if (user.socket.id === this.host.socket.id) {
		console.log(`Starting game: ${this.id}`)
		this.start = true
		this.host.Notify("START", { start: this.start })
		var ids = Object.keys(this.users)
		ids.map((id, k) => {
			this.users[id].initGame(this.mode)
			this.users[id].isPlaying = true;
			this.users[id].start(this.mode, this.pieceCallback.bind(this),
								 this.mallusCallback.bind(this),
								 this.endGameCallback.bind(this))
		})
	}
}

Lobby.prototype.endGameCallback = function (id) {
	var user = this.users[id]
	if (!user)
		return
	if (user.isPlaying) {
		user.isPlaying = false
		user.stopGame()
	}
	var stillPlaying = _.find(this.users, function(u) { return u.isPlaying === true })
	if (_.isEmpty(stillPlaying)) {
		console.log(`All game are finished, the winner is ${user.name}`)
		this.pieces = []
		this.start = false
		this.io.in(this.id).emit("GAMEOVER", { winner: user.name })
		this.host.Notify("START", { start: this.start })
		return
	} else
		user.Notify("GAMEOVER", { winner: false }) // maybe not necessary	
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

Lobby.prototype.pieceCallback = function (id, nbr) {
	var p = this.pieces[nbr]
	if (!p) {
		p = Tetraminos()
		this.pieces.push(p)
	}
	return p
}

Lobby.prototype.mallusCallback = function (userID) {
	var ids = Object.keys(this.users)
	ids.map((id, index) => {
		if (id === userID)
			return
		this.users[id].getMalus()
	})
}

Lobby.prototype.ping = function () {
	var mode = this.mode === true ? "invsible" : "classic"
	var nbr = Object.keys(this.users).length
	return {
		id: this.id,
		name: this.name,
		mode: mode,
		nbrUser: nbr,
		isStarted: this.start
	}
}

function selectMode(mode) {
	if (mode === "classic")
		return false;
	else if (mode === "invisible")
		return true;
	return false;
}
