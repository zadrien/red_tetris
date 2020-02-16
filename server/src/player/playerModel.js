const events = require('events')
import Board from '../Game/Board'

function Player(socket, name) {
	this.socket = socket
	this.name = name
	this.game = undefined
	this.isPlaying = false
	this.currentLobby = undefined
	this.controller = this.controller.bind(this)
	this.socket.on("CONTROLLER", this.controller)
	
	this.socket.on('disconnect', () => {
		if (this.game)
			this.stopGame()
	})

	this.socket.on('QUIT', () => { // is this necessary ?
		if (this.game) {
			this.game.stop()
			// this.eventEmitter.removeAllListener()
		}
	})
}

Player.prototype.initGame = function (mode) {
	this.eventEmitter = new events.EventEmitter()
	this.game = new Board(this.eventEmitter, mode)
	this.socket.emit("DISPLAY", this.game.get())	
}

Player.prototype.get = function () {
	const display = this.game ? this.game.get() : undefined

	return {
		id: this.socket.id,
		name: this.name,
		isPlaying: this.isPlaying,
		display: display
	}
}

Player.prototype.Notify = function (event, data) {
	this.socket.emit(event, data)
}

Player.prototype.join = function (Lobby) {
	this.socket.join(Lobby.id)
	this.currentLobby = Lobby
}

Player.prototype.leave = function () {
	console.log('this current lobby:', this.currentLobby.id)
	this.socket.leave(this.currentLobby.id)
	this.currentLobby = undefined
}

Player.prototype.disconnect = function () {
	if (!this.currentLobby)
		return false;
	this.currentLobby.leaveGame(this)
	this.currentLobby = undefined
}

Player.prototype.controller = function (data) {
	if (this.game) {
		if (data === 'LEFT')
			this.game.left()
		else if (data === 'UP')
			this.game.rotate()
		else if (data === 'RIGHT')
			this.game.right()
		else if (data === 'DOWN')
			this.game.down()
		else if (data === 'SPACE')
			this.game.place()
	}

}


Player.prototype.start = function (getPiece, sendMallus, end) {
	this.eventEmitter.on('display', (data) => { this.socket.emit("DISPLAY", data) })
	this.eventEmitter.on('mallus', () => { sendMallus(this.socket.id) })
	this.eventEmitter.on('add', (data) => {
		if(this.game)
			if (!this.game.add(getPiece(this.socket.id, data)))
				end(this.socket.id)
	})
	
	if (this.game.start())
		this.isPlaying = true
}


Player.prototype.stopGame = function () {
	if (this.game) {
		this.game.stop()
		this.isPlaying = false
		this.eventEmitter.removeAllListeners()
		return true
	}
	return false
}

// THIS ONE TOO
Player.prototype.getMalus = function () {
	if (!this.isPlaying)
		return false;
	if (!this.game.setMalus()) {
		clearInterval(this.itr)
		return false
	}
	return true
}

export default Player
