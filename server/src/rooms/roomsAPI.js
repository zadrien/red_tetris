import { Rooms } from './roomsDAL';
import { create, find, restoreRooms } from './roomsController'

export async function fetch(io, user, data) {
    try {
		if (!data)
			return
		let skip = data.hasOwnProperty('skip') ? data.skip : 0
		let limit = data.hasOwnProperty('limit') ? data.limit : 0
		
		let rooms = await Rooms.read({}, {}, skip, limit)
		
		let list = await restoreRooms(io)
		user.Notify("FETCH", { rooms })
    } catch (err) {
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
		console.log("Room info:::", data)
		if (!data.id)
			return
		room = await find(data.id)
		await room.leaveGame(user)
	} catch (err) {
		user.Notify("LEAVE", { err: err.message })
		Promise.reject(err)
	}
}

export async function start(user, data) {
	let room
	try {
		if (!data)
			return
		room = await find(data)
		room.startGame(user)
	} catch(err) {
		user.Notify("START", err.message)
		Promise.reject(err)
	}
}
