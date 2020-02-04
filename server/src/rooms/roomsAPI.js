import { Rooms } from './roomsDAL';
import { create, find, restoreRooms } from './roomsController'

export async function fetch(io, user, data) {
    try {
		let skip = data.skip ? data.skip : 0
		let limit = data.limit ? data.limit : 0
		let rooms = await Rooms.read({}, {}, skip, limit)
		
		let list = await restoreRooms(io)
		user.Notify("FETCH", { rooms })
    } catch (err) {
		console.log(err)
    }
}

export async function ping(user, room) {
	try {
		let room = await find(room.id)
		if (!room)
			return
		user.Notify("CHECK", { room: room.ping() })
	} catch(err) {
		console.log(err)
	}
}

export async function join(io, user, data) {
	let room
	try {
		console.log("Room info::", data)
		if (data.room.id)
			room = await find(data.room.id)
		else {
			room = await create(io, data.room)
			user.Notify("CREATED", { room: true })
		}
		room.newPlayer(user)
	} catch(err) {
		user.Notify("JOINING", { state: "JOINED", err })
		Promise.reject(err)
	}
}

export async function leave(user, data) {
	let room
	try {
		console.log("Room info::", data)
		if (!data.id)
			return
		room = await find(data.id)
		if (!room)
			return
		room.leaveGame(user)
	} catch (err) {
		user.Notify("LEAVE", { err })
		Promise.reject(err)
	}
}

export async function start(user, data) {
	let room
	try {
		if (!data)
			return
		room = await find(data)
		if (!room)
			return
		room.startGame(user)
	} catch(err) {
		user.Notify("START", err)
		Promise.reject(err)
	}
}
