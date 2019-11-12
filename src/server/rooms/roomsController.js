import _ from 'lodash'
import Tetraminos from '../player/tetraminos'
import { showMap } from '../player/helpers'

class Lobby {
    constructor(id, name, mode) {
	this.id = id
	this.name = name
	this.mode = mode
	
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

	this.users[player.socket.id] = player;
	player.socket.emit("JOINED", { state: "JOINED", room: { id: this.id, name: this.name, mode: this.mode } })
	if (this.host === undefined) {
	    this.host = player.socket.id
	    console.log("Host:", player.socket.id)
	    player.socket.emit("HOST", { host: true })
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
	
	if (socket.id === this.host) {
	    console.log("need new host")
	    this.host = undefined
	    var newHost = _.sample(this.users)
	    if (!newHost) {
		this.pieces = []
		return
	    }
	    newHost.socket.emit("HOST", { host: true })
	    this.host = newHost.socket.id
	}
    }
    
    startGame(data, socket) {
	if (socket.id === this.host) {
	    this.start = true;
	    var id = Object.keys(this.users)
	    for (var i = 0; i < id.length; i++) {
		this.users[id[i]].start(this.pieceCallback.bind(this),
				     this.mallusCallback.bind(this),
				     this.winnerCallback.bind(this))
	    }
	}
    }

    startBroadcast() {
//	console.log("Broadcasting")
	var id = Object.keys(this.users)
	if (!id)
	    return 
	for (var i = 0; i < id.length; i++) {
	    var players = _.omit(this.users, id[i])
	    console.log("Broadcast information to", id[i],":")
	    var obj = []
	    _.map(players, (v, k) => {
//		console.log(v.name)
		obj.push(v.info(this.start));
	    })
	    console.log("==========")
	    console.log(obj)
	    this.users[id[i]].socket.emit("PLAYERS", obj)
	}
    }
    
    pieceCallback(id, nbr) {
	var p = this.pieces[nbr]
	if (!p) {
	    console.log("found anothr piece & adding to stack")
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
