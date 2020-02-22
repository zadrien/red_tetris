import uuidv4 from 'uuid'
import Room from './roomsModel';
import { Rooms as roomDb } from './roomsDAL';
import _ from 'lodash'

const Rooms = {};

process.once('SIGINT', (code) => {
	console.log(`Ciao [${code}]`)
	Object.values(Rooms).forEach((room) => {
		room.kill()
		delete Rooms[room.id]
	})
	process.exit(1)
})

/*
** Launch at Start
*/
export async function restoreRooms(io) {
    try {
		if (!_.isEmpty(Rooms))
			return null;
		var all = await roomDb.read({}, {}, 0, 0)
		_.map(all, function (v) {
		  var newRoom = new Room(io, v.id, v.name, v.mode)
			Rooms[v.id] = newRoom
		})
		return all
    } catch (err) {
		Promise.reject(err)
    }
}

export async function create(io, room) {
    try {
		let id = uuidv4()
		room.id = id.toString()

		let instance = new Room(io, id, room.name, room.mode)
		const doc = instance.get()
		await roomDb.create(doc)
		Rooms[id] = instance
		return instance
    } catch (err) {
		return Promise.reject(err)
    }
}

export function find(id) {
    if (!id)
		return undefined
	let room = Rooms[id]
	if (!room)
		return undefined
    return room
}

export function deleteRoom(id) {
    console.log("deleting room:", id)
    if (!Rooms[id]) {
		return new Error("Room doesn't exist")
    }
    delete Rooms[id]
    console.log("room deleted")
    return null
}

export function purge() {
	console.log('/!\\ Closing all instance /!\\')
	try {
		let ids = Object.keys(Rooms)
		if (!ids)
			Promise.reject("no rooms")
		ids.map(function (id) {
			Rooms[id].kill()
			delete Rooms[id]
		})
		return true
	} catch (err) {
		Promise.reject(err)
	}
}
