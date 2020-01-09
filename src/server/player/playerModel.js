import Board from '../Game/Board'
const events = require('events')

function Player(socket, name) {
	this.socket = socket
	this.name = name
	this.game = undefined
	this.isPlaying = false
	this.controller = this.controller.bind(this)
	this.socket.on("CONTROLLER", this.controller)

//	console.log(`New player ${socket.id} ${name}`)
}

Player.prototype.get = function () {
	let display
	if (this.game)
		display = this.game.get()
	else
		display = undefined
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

Player.prototype.controller = function (data) {
//	console.log(`${this.socket.id} - ${data}`)
	if (!this.game)
		return 
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


Player.prototype.initGame = function (mode) {
	this.eventEmitter = new events.EventEmitter()
	this.game = new Board(this.eventEmitter, mode)
	this.socket.emit("DISPLAY", this.game.get())	
}

Player.prototype.start = function (getPiece, sendMallus, end) {
	this.eventEmitter.on('display', (data) => { this.socket.emit("DISPLAY", data) })
	this.eventEmitter.on('mallus', () => { sendMallus(this.socket.id) })
	this.eventEmitter.on('add', (data) => {
		if (!this.game.add(getPiece(this.socket.id, data)))
			end(this.socket.id)
	})

	this.socket.on('disconnect', () => {
		if (this.game)
			this.stopGame()
	})
	this.socket.on('QUIT', () => {
		this.game.stop()
		this.eventEmitter.removeAllListener()
	})
	this.game.start()
	this.isPlaying = true
}


Player.prototype.stopGame = function () {
	if (!this.game)
		return false
	this.game.stop()
	this.isPlaying = false
	delete this.game // to check

	return true
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
