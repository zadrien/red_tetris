import Game from './game'

class Player {
  constructor(socket, name = "*********") {
	this.socket = socket
	this.name = name
	this.nbr = 0
	this.game = undefined
	this.pause = false
	this.run = false
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
  start(getPiece, sendMallus, win, end) {
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
	  this.socket.emit("DISPLAY", this.game.map)
	}.bind(this)
	this.game = new Game()
	this.socket.on("disconnect", cb)
	this.socket.on("QUIT", cb)
	
	console.log("[GAME START] - ", this.socket.id)
	this.itr = setInterval(fn, 1000)
	this.run = true;
  }
  
  stopGame(notifyLobby) {
	if (this.itr === 0)
	  return
	clearInterval(this.itr)
	this.run = false
	//		notifyLobby(this.socket.id)
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
	var map;
	if (this.game && game === true) // get party info
	  map = this.game.info()
	return {
	  id: this.socket.id,
	  name: this.name,
	  map
	}
  }
}


module.exports =  Player
