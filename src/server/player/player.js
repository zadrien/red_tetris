import Game from './game'

class Player {
    constructor(socket, name = "*********") {
		this.socket = socket
		this.name = name
		this.nbr = 0
		this.game = new Game()
		this.pause = false;
		this.run = false;
		console.log(`New player ${socket.id} ${name}`)
    }
    
    controller(data) {
		console.log(`${this.socket.id} - ${data}`)
		if (data === 'LEFT') {
			this.game.left()
		} else if (data === 'UP') {
			this.game.rotate()
		} else if (data === 'RIGHT') {
			this.game.right()
		} else if (data === 'DOWN') {
			this.game.down()
		} else if (data === 'SPACE') {
			this.game.place()
		}
		this.socket.emit("DISPLAY", this.game.map)
    }

    // cb function for a new piece ! and for terminate the session
    start(getPiece, sendMallus, win) {
		this.socket.on("disconnect", (data) => this.stopGame());
		this.socket.on("QUIT", (data) => this.stopGame())
		console.log("[GAME START] - ", this.socket.id)
		this.itr = 0
		var fn = function () {
			if (this.game.down() === false) {
				if (this.game.verify() !== 0)
					sendMallus(this.socket.id)
				var p = getPiece(this.socket.id, this.nbr)
				if (!this.game.add(p))
					return clearInterval(this.itr)
				this.nbr++
			}
			this.socket.emit("DISPLAY", this.game.map)
		}.bind(this)
		this.itr = setInterval(fn, 1000)
		this.run = true;
    }
    
    stopGame() {
		if (this.itr === 0)
			return ;
		clearInterval(this.itr)
		this.run = false;
    }

    getMalus() {
		if (!this.run)
			return ;
		if (!this.game.setMalus()) {
			clearInterval(this.itr)
			return false
		}
		return true
    }

    info(game = false) {
		var line;
		if (game === true) // get party info
			line = this.game.info(20)
		return {
			id: this.socket.id,
			name: this.name,
			line
		}
    }
}


module.exports =  Player
