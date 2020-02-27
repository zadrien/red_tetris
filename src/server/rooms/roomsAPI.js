import { roomsDAL } from './roomsDAL';
import Controller  from './roomsController'

const API = function (io) {
	this.io = io
	this.roomsController = new Controller(io)
	this.roomsController.restore()
}

API.prototype.fetch = async function (user, data) {
	try {
		const { skip, limit } = data
		const rooms = await roomsDAL.read({}, {}, skip, limit)
		user.Notify("FETCH", { rooms })
	} catch (err) {
		user.Notify("FETCH", { err: err.message })
	}
}

// export async function fetch(user, data) {
//     try {
// 		let skip = data.hasOwnProperty('skip') ? data.skip : 0
// 		let limit = data.hasOwnProperty('limit') ? data.limit : 0
// 		let rooms = await roomsDAL.read({}, {}, skip, limit)
// 		user.Notify("FETCH", { rooms })
//     } catch (err) {
// 		user.Notify("FETCH", { err: err.message })
//     }
// }

API.prototype.join = async function (user, data) {
	let room
	if (data.room.hasOwnProperty('id'))
		room = this.roomsController.find(data.room.id)
	if (!room) {
		try {
			room = await this.roomsController.create(data.room)
			user.Notify("CREATED", { room: true })
		} catch (err) {
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

// export async function join(io, user, data) {
// 	let room
// 	if (data.room.hasOwnProperty('id'))
// 	room = roomsController.find(data.room.id)
// 	if (!room) {
// 		try {
// 			room = await roomsController.create(io, data.room)
// 			user.Notify("CREATED", { room: true })
// 		} catch (err) {
// 			return user.Notify("CREATED", { err: err.message}) 
// 		}
// 	}

// 	try {
// 		room.newPlayer(user)
// 		await Rooms.update(room.id, room.get())
// 	} catch(err) {
// 		user.Notify("JOINING", { state: "JOINED", err: err.message })
// 	}
// }

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

// export async function leave(user, data) {
// 	try {
// 		const { currentLobby } = user
// 		if (!currentLobby)
// 			throw new Error("user not in a Lobby")
// 		currentLobby.leaveGame(user)
// 		Rooms.update(currentLobby.id, currentLobby.get())
// 	} catch (err) {
// 		user.Notify("LEAVE", { err: err.message })
// 	}
// }

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

// export function start(user, data) {
// 	try {
// 		const { currentLobby } = user
// 		if (!currentLobby)
// 			throw new Error("user not in a Lobby")
// 		currentLobby.startGame(user)
// 		Rooms.update(currentLobby.id, currentLobby.get())
// 	} catch(err) {
// 		user.Notify("START", { err: err.message})
// 	}
// }

module.exports = API