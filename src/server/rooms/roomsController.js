import _ from 'lodash'
import Tetraminos from '../player/tetraminos'
import { showMap } from '../player/helpers'

function selectMode(mode) {
	if (mode === "classic")
		return false;
	else if (mode === "invisible")
		return true;
	return false;
}

class Lobby {
    constructor(id, name, mode) {
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

    newPlayer(player) {
		console.log("New player:", player.socket.id)
		console.log(this.mode)
		this.users[player.socket.id] = player;
		player.socket.emit("JOINED", { state: "JOINED", room: { id: this.id, name: this.name, mode: this.mode } })
		if (this.host === undefined) {
			this.host = player.socket
			console.log("Host:", player.socket.id)
		  player.socket.emit("HOST", { host: true })
		  player.socket.emit("START", { start: this.start })
		} else {
			console.log("An host already assigned...")
		  player.socket.emit("HOST", { host: false })
		}
		return true
    }
    
    leave(socket) {
		console.log("user (", socket.id, ") leaving room...")
		delete this.users[socket.id]
		socket.emit("QUIT", { state: "QUIT" })
		
		if (socket.id === this.host.id) {
			console.log("need new host")
			this.host = undefined
			var newHost = _.sample(this.users)
			if (!newHost) {
				this.pieces = []
				return
			}
		  newHost.socket.emit("HOST", { host: true })
		  newHost.socket.emit("START", { start : this.start })
			this.host = newHost.socket
		}
    }
    
    startGame(data, socket) {
		if (socket.id === this.host.id) {
		  this.start = true;
		  this.host.emit("START", { start: this.start })
			var id = Object.keys(this.users)
			for (var i = 0; i < id.length; i++) {
				this.users[id[i]].isPlaying = true;
				this.users[id[i]].start(this.mode, this.pieceCallback.bind(this),
										this.mallusCallback.bind(this),
										this.winnerCallback.bind(this),
										this.endGameCallback.bind(this))
			}
		}
    }

	endGameCallback(id) {
		var player = this.users[id]
		console.log("endGameCallback: players objects:",  this.users)
		if (!player)
			return
		if (player.isPlaying)
			player.isPlaying = false;
		var stillPlaying = _.find(this.users, function(p) { return p.isPlaying === true })
		if (_.isEmpty(stillPlaying)) {
			this.start = false;
			console.log("no one is playing")
			console.log(this.host);
			player.socket.emit("GAMEOVER", { win: true })
			console.log("WINNER");
			this.host.emit("START", { start: this.start })
			return
		} else {
			player.socket.emit("GAMEOVER", { win: false })
			console.log("LOSER");
		}
		console.log("Someone is stil playing...", stillPlaying)

	}
  
    startBroadcast() {
		var id = Object.keys(this.users)
		if (!id)
			return 
		for (var i = 0; i < id.length; i++) {
			var players = _.omit(this.users, id[i])
			var obj = []
			_.map(players, (v, k) => {
				obj.push(v.info(this.start));
			})
		  console.log(obj);
			this.users[id[i]].socket.emit("PLAYERS", obj)
		}
    }
    
    pieceCallback(id, nbr) {
		var p = this.pieces[nbr]
		if (!p) {
			console.log("found another piece & adding to stack")
			p = Tetraminos()
			this.pieces.push(p)
		}
		console.log("[GET PIECE] -- ", id, p)
		return p
    }

    mallusCallback(id) {
		_.map(this.users, (v, k) => {
			if (k === id)
				return
			v.getMalus()
		})
    }

    winnerCallback(id) {
	  _.map(this.users, (v, k) => {
			if (k === id)
				return
			v.stopGame()
		})
    }
}

module.exports = Lobby
