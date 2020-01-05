import Player from './playerModel'

function Controller(isLogged) {
	this.isLogged = isLogged
}

Controller.prototype.login = function (socket, data) {
//	console.log("nothing ? :", data)
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

Controller.prototype.logout = function (socket) {
	if (!this.isLogged[socket.id])
		return 
	console.log("deleting user")
	delete this.isLogged[socket.id]	
}

export default new Controller({})
