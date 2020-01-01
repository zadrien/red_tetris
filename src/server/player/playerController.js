import Player from './player'

// function Controller(isLogged = {}) {
// 	this.isLogged = isLogged
// }

class Controller {
	constructor() {
		this.isLogged = {}
	}
	
	login(socket, data) {
		console.log("nothing ? :", data)
		if (!data.name)
			return 
		var ids = Object.keys(this.isLogged)
		console.log("user logged:", ids)
		var value = ids.find(elem => this.isLogged[elem].name === data.name)
		if (value) {
			throw { err: "Username already taken"}
		}
		
		var player = new Player(socket, data.name)
		this.isLogged[socket.id] = player
		player.socket.emit('login', { name: player.name })
		return player
	}

	logout(socket) {
		if (!this.isLogged[socket.id])
			return 
		console.log("deleting user")
		delete this.isLogged[socket.id]
	}
}

module.exports = {
	Controller: new Controller()
}