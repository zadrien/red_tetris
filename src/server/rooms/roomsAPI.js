import { Rooms } from './roomsModel';
import { create, find, restoreRooms } from './roomsHandler'
//import Handler from './roomsHandler';
import  Player from '../player/player';

export async function fetch(io, user, data) {
    try {
		var rooms = await Rooms.read({}, {}, data.skip, data.limit)
		var list = await Handler.restoreRooms(io)
		user.Notify("FETCH", { rooms })
    } catch (err) {
		console.log(err)
    }
}

export async function ping(user, room) {
//	console.log("PING")
	try {
//		console.log(room)
		var room = await Handler.find(room.id)
		if (!room)
			return
		user.Notify("CHECK", { room: room.ping() })
	} catch(err) {
		console.log(err)
	}
}

export async function join(io, user, data) {
	var room
	try {
		console.log("Room info::", data)
		if (data.room.id)
			room = Handler.find(data.room.id)
		else {
			room = await Handler.create(io, data.room)
			user.Notify("CREATED", { room: true })
		}
		room.newPlayer(user)
	} catch(err) {
		user.Notify("JOINING", { state: "JOINED", err })
		Promise.reject(err)
	}
}

export async function leave(user, data) {
	console.log("event leave!!")
	var room
	try {
		console.log("Room info::", data)
		if (!data.id)
			return
		room = Handler.find(data.id)
		if (!room)
			return
		room.leave(user)
	} catch (err) {
		user.Notify("LEAVE", { err })
		Promise.reject(err)
	}
}

export async function start(user, data) {
	var room
	try {
		console.log("Room id", data)
		if (!data)
			return
		room = Handler.find(data)
		if (!room)
			return
		console.log(room)
		room.startGame(user)
	} catch(err) {
		user.Notify("START", err)
		Promise.reject(err)
	}
}

// module.exports = {
// 	fetch,
// 	join,
// 	leave,
// 	start,
// 	ping
// }
