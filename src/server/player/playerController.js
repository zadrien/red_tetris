import User from './playerModel'

const loginfo = require('debug')('tetris:userController')

function Controller(isLogged) {
	this.isLogged = isLogged
}

Controller.prototype.login = function (socket, data) {
	if (!data.hasOwnProperty('name'))
		throw new Error("No name property")
	let ids = Object.keys(this.isLogged)
	let value = ids.find(elem => this.isLogged[elem].name === data.name)
	if (value)
		throw new Error("Username already taken")
	
	let user = new User(socket, data.name)
	this.isLogged[socket.id] = user
	loginfo(`New user connected ${user.socket.id} - ${user.name}`)
	return user	
}

Controller.prototype.logout = function (socket) {
	const user = this.isLogged[socket.id]
	if (user) {
		user.disconnect()
		delete this.isLogged[socket.id]	
	}
}

export default Controller
