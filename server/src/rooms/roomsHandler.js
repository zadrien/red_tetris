//import 'babel-polyfill'
import uuidv4 from 'uuid'
import Room from './roomsModel';
import { Rooms as roomDb } from './roomsDAL';
import _ from 'lodash'

const Rooms = {};

/*
** Launch at Start
*/
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

export async function restoreRooms(io) {
    try {
		if (!_.isEmpty(Rooms))
			return null;
		var all = await roomDb.read({}, {}, 0, 0)
		all.map(function(room) {
		  var instance = new Room(io, room.id, room.name, room.mode)
			Rooms[room.id] = instance
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

export function find(id) {
    if (!id)
		throw new Error("ID undefined")
    return Rooms[id]
}

export async function deleteRoom(id) {
	try {
		if (!Rooms[id])
			return new Error("Room doesn't exist")
		
		delete Rooms[id]
		let nbr = await roomDb.deleteRoom(id)
		return nbr
	} catch (err) {
		Promise.reject(err)
	}
}