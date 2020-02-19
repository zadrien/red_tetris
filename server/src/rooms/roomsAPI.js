import { Rooms } from './roomsDAL';
import * as roomsController  from './roomsController'

export async function fetch(io, user, data) {
    try {
		let skip = data.hasOwnProperty('skip') ? data.skip : 0
		let limit = data.hasOwnProperty('limit') ? data.limit : 0
		let rooms = await Rooms.read({}, {}, skip, limit)
		await roomsController.restoreRooms(io) // move in index.js

		user.Notify("FETCH", { rooms })
    } catch (err) {
		user.Notify("FETCH", { err: err.message })
    }
}

export async function join(io, user, data) {
	let room
	if (data.room.hasOwnProperty('id'))
		room = roomsController.find(data.room.id)
	if (!room) {
		try {
			room = await roomsController.create(io, data.room)
			user.Notify("CREATED", { room: true })
		} catch (err) {
			return user.Notify("CREATED", { err: err.message}) 
		}
	}

	try {
		room.newPlayer(user)
	} catch(err) {
		user.Notify("JOINING", { state: "JOINED", err: err.message })
	}
}

export async function leave(user, data) {
	try {
		const { currentLobby } = user
		if (!currentLobby)
			throw new Error("user not in a Lobby")
		currentLobby.leaveGame(user)
		Rooms.update()
	} catch (err) {
		user.Notify("LEAVE", { err: err.message })
	}
}

export function start(user, data) {
	try {
		const { currentLobby } = user
		if (!currentLobby)
			throw new Error("user not in a Lobby")
		currentLobby.startGame(user)
	} catch(err) {
		user.Notify("START", { err: err.message})
	}
}
