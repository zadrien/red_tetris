import { Rooms } from './roomsModel';
import Handler from './roomsHandler';
import  Player from '../player/player';

async function fetch(io, socket, data) {
    try {
		var rooms = await Rooms.read({}, {}, data.skip, data.limit)
		var list = await Handler.restoreRooms(io)
		socket.emit("FETCH", { rooms })
    } catch (err) {
		console.log(err)
    }
}

async function join(io, socket, data) {
	var room
	try {
		console.log("Room info::", data)
		if (data.room.id)
			room = Handler.find(data.room.id)
		else {
			room = await Handler.create(io, data.room)
			socket.emit("CREATED", { room: true })
		}
		var user = new Player(socket, data.user.name)
		room.newPlayer(user)
		return { room, user }
	} catch(err) {
		socket.emit("JOINING", { state: "JOINED", err })
		Promise.reject(err)
	}
}

async function leave(socket, data) {
  console.log("event leave!!")
	var room
	try {
		console.log("Room info::", data)
		if (!data.id)
			return
		room = Handler.find(data.id)
		if (!room)
			return
		room.leave(socket)
	} catch (err) {
		socket.emit("LEAVE", { err })
		Promise.reject(err)
	}
}

async function start(socket, data) {
  var room

  try {
	console.log("Room id", data)
	if (!data)
	  return
	room = Handler.find(data)
	if (!room)
	  return
	console.log(room)
	room.startGame(socket)
  } catch(err) {
	Promise.reject(err)
  }
}
// async function accessRoom(data, socket, io) {
//     var room
//     try {
// 		console.log("Room info::", data)
// 		console.log(data.room)
// 		if (data.room.id)
// 			room = Handler.find(data.room.id)
// 		else {
// 			room = await Handler.create(io, data.room)
// 			socket.emit("CREATED", { room: true }) // OPTIONAL
// 		}
// 		console.log("Room existing, joining. . .")
// 		var player = new Player(socket, data.user.name)
// 		room.newPlayer(player)
// 		return { room, player }
//     } catch (err) {
// 		socket.emit("JOINING", {state: "JOINED", err })
// 		Promise.reject(err)
//     }
// }

module.exports = {
  fetch,
  join,
  leave,
  start
//    accessRoom
}
