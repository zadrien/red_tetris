import Board from './Game/Board'

function Player(socket, name) {
	this.socket = socket
	this.name = name
	this.nbr = 0
	this.game = undefined
	this.pause = false
	this.isPlaying = false
	this.controller = this.controller.bind(this)
	this.socket.on("CONTROLLER", this.controller)

	console.log(`New player ${socket.id} ${name}`)
}

Player.prototype.get = function () {
	return {
		id: this.socket.id,
		name: this.name,
		isPlaying: this.isPlaying,
		display: this.game.get()
	}
}

Player.prototype.Notify = function (event, data) {
	this.socket.emit(event, data)
}

Player.prototype.controller = function (data) {
	console.log(`${this.socket.id} - ${data}`)
	if (!this.isPlaying)
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
	this.nbr = 0
	this.game = new Board(this.socket, mode)
	this.socket.emit("DISPLAY", this.game.get())	
}

// cb function for a new piece ! and for terminate the session
Player.prototype.start = function (mode, getPiece, sendMallus, end) {
	var cb = function (data) {
		this.stopGame()
		end(this.socket.id);
	}.bind(this)

	var fn = function () {
		if (this.game.down() === false) {
			if (this.game.verify() !== 0)
				sendMallus(this.socket.id)
			var p = getPiece(this.socket.id, this.nbr)
			if (!this.game.add(p)) {
				this.stopGame();
				end(this.socket.id)
			}
			this.nbr++
		}
		if (mode === false)
			this.socket.emit("DISPLAY", this.game.map)
	}.bind(this)
	this.socket.on("disconnect", cb)
	this.socket.on("QUIT", cb)
	
	console.log(`[GAME START] - ${this.name} ${this.socket.id}`)
	this.itr = setInterval(fn, 900)
	this.isPlaying = true;
}

Player.prototype.stopGame = function () {
	if (this.itr === 0)
		return
	clearInterval(this.itr)
	this.isPlaying = false
}

Player.prototype.getMalus = function () {
	if (!this.isPlaying)
		return ;
	if (!this.game.setMalus()) {
		clearInterval(this.itr)
		return false
	}
	return true
}

export default Player
