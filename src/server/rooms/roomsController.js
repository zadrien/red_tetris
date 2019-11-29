import _ from 'lodash'
import Tetraminos from '../player/tetraminos'
import { showMap } from '../player/helpers'

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
		if (this.start)
			return false
		this.users[player.socket.id] = player;
		player.socket.emit("JOINED", { state: "JOINED", room: { id: this.id, name: this.name, mode: this.mode } })
		if (this.host === undefined) {
			this.host = player.socket
			console.log(`${player.socket.id} join the lobby ${this.name}`)
			player.socket.emit("HOST", { host: true })
			player.socket.emit("START", { start: this.start })
		} else
			player.socket.emit("HOST", { host: false })
		return true
    }
    
    leave(socket) {
		console.log(`User(${socket.id}) leaving room...`)
		if (this.start)
			this.endGameCallback(socket.id)
		delete this.users[socket.id]
		socket.emit("QUIT", { state: "QUIT" })		
		if (socket.id === this.host.id) {
			console.log("Searching new host...")
			this.host = undefined
			var newHost = _.sample(this.users)
			if (!newHost)
				return
			newHost.socket.emit("HOST", { host: true })
			newHost.socket.emit("START", { start : this.start })
			this.host = newHost.socket
		}
    }
    
    startGame(data, socket) {
		if (socket.id === this.host.id) {
			console.log(`Starting game: ${this.id}`)
			this.start = true;
			this.host.emit("START", { start: this.start })
			var id = Object.keys(this.users)
			for (var i = 0; i < id.length; i++) {
				this.users[id[i]].isPlaying = true;
				this.users[id[i]].start(this.mode, this.pieceCallback.bind(this),
										this.mallusCallback.bind(this),
										this.endGameCallback.bind(this))
			}
		}
    }

	endGameCallback(id) {
		var player = this.users[id]
		if (!player)
			return
		if (player.isPlaying)
			player.isPlaying = false;
		var stillPlaying = _.find(this.users, function(p) { return p.isPlaying === true })
		if (_.isEmpty(stillPlaying)) {
			console.log(`All games are done, the winner is ${player.name}`)
			this.pieces = []
			this.start = false;
			player.socket.emit("GAMEOVER", { win: true })
			this.host.emit("START", { start: this.start })
			return
		} else {
			player.socket.emit("GAMEOVER", { win: false })
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
			this.users[id[i]].socket.emit("PLAYERS", obj)
		}
    }
    
    pieceCallback(id, nbr) {
		var p = this.pieces[nbr]
		if (!p) {
			p = Tetraminos()
			this.pieces.push(p)
		}
		return p
    }

    mallusCallback(id) {
		_.map(this.users, (v, k) => {
			if (k === id)
				return
			v.getMalus()
		})
    }
}

function selectMode(mode) {
	if (mode === "classic")
		return false;
	else if (mode === "invisible")
		return true;
	return false;
}

module.exports = Lobby
