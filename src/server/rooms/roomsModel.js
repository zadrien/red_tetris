import _ from 'lodash'
import { Tetraminos } from '../Game/tetraminos'
import { isPlaying } from './helpers'
import { roomsDAL } from './roomsDAL'

export default function Lobby(io, id, name, mode) {
	this.io = io
	this.id = id
	this.name = name
	this.mode = mode === "classic" ? false : true
	this.host = undefined
	this.users = {}
	this.isOpen = true
	this.pieces = []
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

Lobby.prototype.kill = async function() {
	this.io.in(this.id).emit("LEAVE", { state: "QUIT", msg: "Server may intentionaly kill this lobby" })
	Object.values(this.users).forEach(user => {
		if (user.isPlaying)
			user.stopGame()
		delete this.users[user.socket.id]
	})
	this.isOpen = true
	try {
		await roomsDAL.update(this.id, this.get())
	} catch (err) {
		console.log(err)
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
	user.Notify("JOINED", { state: "JOINED", room: this.get() })
	user.Notify("HOST", { host: this.host.socket.id === user.socket.id })
	user.initGame(this.mode)
	this.ping('CHECK')
	this.broadcast()
	return true
}

Lobby.prototype.startGame = function (user) {
	if (user.socket.id !== this.host.socket.id)
		throw new Error("You're not the host of this lobby")
	this.isOpen = false
	Object.values(this.users).forEach(user => {
		user.Notify("START", { start: this.isOpen })
		user.start(this.pieceCallback.bind(this),
					this.mallusCallback.bind(this),
					this.endGameCallback.bind(this))
	})
	this.ping('CHECK')
}

Lobby.prototype.resetLobby = function () {
	this.isOpen = true
	this.pieces = []
	Object.values(this.users).forEach(user => {
		user.initGame(this.mode)
		user.isPlaying = false
	})
	this.ping('CHECK')
}

Lobby.prototype.leaveGame = function (user) {
	let leaver = this.users[user.socket.id]
	if (!leaver)
		throw new Error("User not found")
	user.leave(this.id)
	if (leaver.isPlaying)
		leaver.stopGame()
	
	delete this.users[user.socket.id]
	if (!isPlaying(this.users))
		this.resetLobby()
	if (user.socket.id === this.host.socket.id) {
		this.host = undefined
		let newHost = _.sample(this.users)
		if (newHost) {
			this.host = newHost
			this.host.Notify("HOST", { host: true })
		}
	}
	user.Notify("LEAVE", { state: "QUIT" })
	this.ping('CHECK')
	this.broadcast()
}

Lobby.prototype.endGameCallback = function (id) {
	let user = this.users[id]
	if (!user) 
		return
	if (user.isPlaying)
		user.stopGame()
	let stillPlaying = _.find(this.users, function(u) { return u.isPlaying === true })
	if (_.isEmpty(stillPlaying)) {
		user.Notify("GAMEOVER", { winner: true })
		roomsDAL.update(this.id, this.get())
		setTimeout(() => {
			this.io.in(this.id).emit("START", { start: this.isOpen })
			this.io.in(this.id).emit("RESET")
			this.resetLobby()
		}, 3000)
	} else {
		user.Notify("GAMEOVER", { winner: false })
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
	this.broadcast()
	return true
}

Lobby.prototype.pieceCallback = function (id, nbr) { // remove id
	let p = this.pieces[nbr]
	if (!p) {
		p = Tetraminos()
		this.pieces.push(p)
	}
	this.broadcast()
	return p
}

Lobby.prototype.broadcast = function () {
	const connectedUsers = Object.values(this.users)
	const arr = []
	connectedUsers.forEach(user => {
		arr.push(user.get())
	})
	this.io.to(this.id).emit('PLAYERS', arr)
}

Lobby.prototype.ping = function (event) {
	const data = this.get()
	this.io.emit(event, { room : data })

}