import { roomsDAL } from './roomsDAL';
import Controller  from './roomsController'

const API = function (io) {
	this.io = io
	this.roomsController = new Controller(io)
	this.roomsController.restore()
}


API.prototype.close = function () {
  this.roomsController.shutdown()
}
API.prototype.fetch = async function (user, data) {
	try {
		const { skip, limit } = data
		const rooms = await roomsDAL.read({}, {}, skip, limit)
    console.log('fetch', rooms)
		user.Notify("FETCH", { rooms })
	} catch (err) {
		user.Notify("FETCH", { err: err.message })
	}
}

API.prototype.join = async function (user, data) {
	let room
	if (data.room.hasOwnProperty('id'))
		room = this.roomsController.find(data.room.id)
	if (!room) {
		try {
      console.log("Creating room...")
			room = await this.roomsController.create(data.room)
			user.Notify("CREATED", { room: true })
      console.log("Created...")
		} catch (err) {
      console.log(err)
			return user.Notify("CREATED", { err: err.message}) 
		}
	}

	try {
		room.newPlayer(user)
		await roomsDAL.update(room.id, room.get())
	} catch(err) {
		user.Notify("JOINING", { state: "JOINED", err: err.message })
	}
}

API.prototype.leave = function (user, data) {
	try {
		const { currentLobby } = user
		if (!currentLobby)
			throw new Error("user not in a Lobby")
		currentLobby.leaveGame(user)
		roomsDAL.update(currentLobby.id, currentLobby.get())
	} catch (err) {
		user.Notify("LEAVE", { err: err.message })
	}
}

API.prototype.start = async function (user, data) {
	try {
		const { currentLobby } = user
		if (!currentLobby)
			throw new Error("user not in a Lobby")
		currentLobby.startGame(user)
		await roomsDAL.update(currentLobby.id, currentLobby.get())
	} catch(err) {
		user.Notify("START", { err: err.message})
	}

}

module.exports = API