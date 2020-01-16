import uuidv4 from 'uuid'
import Room from './roomsModel';
import { Rooms as roomDb } from './roomsDAL';
import _ from 'lodash'

const Rooms = {};

/*
** Launch at Start
*/
export async function restoreRooms(io) {
    try {
		if (!_.isEmpty(Rooms))
			return null;
		var all = await roomDb.read({}, {}, 0, 0)
		console.log("nbr of saved loby:", all.length)
		_.map(all, function (v) {
		  var newRoom = new Room(io, v.id, v.name, v.mode)
			Rooms[v.id] = newRoom
		})
		return all
    } catch (err) {
		console.log(err)
		Promise.reject(err)
    }
}

export async function create(io, room) {
    try {
		var id = uuidv4()
		var r = new Room(io, id, room.name, room.mode)
		Rooms[id] = r
		room["id"] = id
		var obj = await roomDb.create(room)
		return r
    } catch (err) {
		console.log("Room creation failure!...")
		Promise.reject(err)
    }
}

export async function find(id) {
    if (!id)
		return undefined
	let room = Rooms[id]
	if (!room)
		Promise.reject("room not found")
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
