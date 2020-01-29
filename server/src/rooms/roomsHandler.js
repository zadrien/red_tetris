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
//		_.map(all, function (room) {
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
		return undefined
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

// function Handler(io, rooms = {}) {
// 	this.io
// 	this.Rooms = rooms
// }

// Handler.prototype.restore = async function() {
// 	try {
// 		if (!_.isEmpty(thisRooms))
// 			return null
// 		let all = await roomDb.read({}, {}, 0, 0)
// 		_.map(all, function(room) {
// 			let instance = new Room(this.io, v.id, v.name, v.mode)
// 			this.Rooms[room.id] = instance
// 		})
// 		return all
// 	} catch (err) {
// 		Promise.reject(err)
// 	}
// }

// Handler.prototype.create = async function(room) {
//     try {
// 		let id, instance, res
// 		id = uuidv4()
// 		instance = new Room(this.io, id, room.name, room.mode)
// 		if (!instance)
// 			Promise.reject(new Error("failed creating new instance"))
// 		this.Rooms[id] = instance
		
// 		room["id"] = id
// 		res = await roomDb.create(room)
// 		return instance
// 	} catch (err)
// 		Promise.reject(err)
// }

// Handler.prototype.find = async function (id) {
// 	let instance = this.Rooms[id]
// 	if (!res)
// 		Promise.reject(new Error("Room instance doesn't exist."))
// 	return instance
	
// }

// Handler.prototype.deleteRoom = async function(id) {
//     console.log("deleting room:", id)
//     if (!this.Rooms[id]) {
// 		return new Error("Room doesn't exist")
//     }
	
//     delete this.Rooms[id]
// 	let nbr = await roomDb.deleteRoom(id)
	
// 	return nbr	
// }

// Handler.prototype.purge = async function() {
// 	console.log('/!\ Closing all instance /!\ ')
// 	try {
// 		_.(this.Rooms, function (room) {
// 			room.kill()
// 		})
// 	} 
// }
