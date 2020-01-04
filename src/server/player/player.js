import Game from './game'

export default class Player {
	constructor(socket, name = "*********") {
		this.socket = socket
		this.name = name
		this.nbr = 0
		this.game = undefined
		this.pause = false
		this.isPlaying = false
		console.log(`New player ${socket.id} ${name}`)

		this.controller = this.controller.bind(this)
		this.socket.on("CONTROLLER", this.controller)
  }


	initGame(mode) {
		this.nbr = 0
		this.game = new Game(this.socket, mode)
		this.socket.emit("DISPLAY", this.game.map)
	}

	Notify(event, data) {
		this.socket.emit(event, data)
	}
	
	controller(data) {
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

  // cb function for a new piece ! and for terminate the session
	start(mode, getPiece, sendMallus, end) {
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
  
  stopGame() {
		if (this.itr === 0)
			return
		clearInterval(this.itr)
		this.isPlaying = false
	}

	getMalus() {
		if (!this.isPlaying)
			return ;
		if (!this.game.setMalus()) {
			clearInterval(this.itr)
			return false
		}
		return true
	}

	info() {
		return {
		  id: this.socket.id,
		  name: this.name,
		  isPlaying: this.isPlaying,
		  display: this.game.info()
		}
	}
}

//module.exports =  Player
