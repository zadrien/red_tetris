import { v4 as uuidv4 } from 'uuid'
import Room from './roomsModel';
import { roomsDAL } from './roomsDAL';
import _ from 'lodash'
import debug from 'debug'

const loginfo = debug('tetris:roomController')

const Controller = function (io) {
	this.io = io
	this.Rooms = {}
}

Controller.prototype.restore = async function () {
	try {
		if (Object.values(this.Rooms) === 0)
			return undefined
		const fetchedRoom = await roomsDAL.read({}, {}, 0, 0)
		fetchedRoom.map(room => {
			const instance = new Room(this.io, room.id, room.name, room.mode)
			this.Rooms[room.id] = instance
		})
		return fetchedRoom
	} catch (err) {
		Promise.reject(err)
	}
}

Controller.prototype.shutdown = async function () {
  console.log(this.Rooms)
  for (const [k, room] of Object.entries(this.Rooms)) {
    console.log(`${k} ${room}`, room)
    await room.kill()
  }
}

/*
** Launch at Start
*/

Controller.prototype.create = async function (room) {
	try {
		const id = uuidv4()
		room.id = id.toString()
		const instance = new Room(this.io, id, room.name, room.mode)
		await roomsDAL.create(instance.get())
		this.Rooms[id] = instance
		return instance
	} catch (err) {
		Promise.reject(err)
	}
}

Controller.prototype.find = function (roomID) {
	if (!this.Rooms.hasOwnProperty(roomID))
		throw new Error("Room not found")
	return this.Rooms[roomID]
}

Controller.prototype.deleteRoom = async function (instanceID) {
	loginfo(`deleting room... ${instanceID}`)
	try {
		if (!this.Rooms.hasOwnProperty(instanceID))
			throw new Error("Can't delete instance: Room does not exist")
		delete this.Rooms[instanceID]
		await roomsDAL.delete(instanceID)
	} catch (err) {
		Promise.reject(err)
	}
}

Controller.prototype.purge = function () {
	loginfo('/!\\ Closing all instance /!\\')
	try {
		const values = Object.values(this.Rooms)
		if (values) {
			values.map(room => {
				delete this.Rooms[room.id]
			})
		}
	} catch (err) {
		Promise.reject(err)
	}
}

module.exports = Controller