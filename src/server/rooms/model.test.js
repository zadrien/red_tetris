import expect from 'expect.js'
import Lobby from './roomsModel'

import User from '../player/playerModel'
import io from 'socket.io'
import ioClient from 'socket.io-client'

const socketURL = "http://localhost:5000"
const option = {
	transports: ['websocket'],
	'force new connection': true
}

describe("Room Model Unit Test", () => {
	let server, socket, room, client
	let data = {
		name: "testName",
		id: "testID",
		mode: "classic"
	}

	var user
	beforeEach(() => {
		server = io.listen(5000)
	})

	afterEach(() => {
		server.close()
		if (room)
			room.kill()
		if (socket)
			socket.close()
		if (client)
			client.close()
	})
	
	describe("create new Room instance", () => {
		it("init room instance", () => {
			room = new Lobby(server, data.id, `$room-{data.name}`, data.mode)
			if (!room)
				expect.fail()
		})
	})

	describe("A new player join the lobby", () => {		
		describe("#newPlayer()", () => {
			it("should return true", function (done) {
				server.on("connect", function(socket) {
					user = new User(socket, data.name)
					room = new Lobby(server, data.id, `room-${data.name}`, data.mode)
					room.newPlayer(user)
				})
				
				socket = ioClient.connect(socketURL, option)
				
				socket.on("HOST", function (data) {
					expect(data.host).to.be(true)
					done()
				})
			})
		})

		describe("#leave()", () => {
			it("should send QUIT event", function (done) {
				server.on("connect", function(socket) {
					user = new User(socket, data.name)
					room = new Lobby(server, data.id, `room-${data.name}`, data.mode)
					room.newPlayer(user)
					room.leave(user)
				})

				socket = ioClient.connect(socketURL, option)

				socket.on("LEAVE", function (data) {
					expect(data.state).to.be("QUIT")
					done()
				})
			})
		})

		describe("#startGame()", () => {
			it("should send START event", function(done) {
				server.on("connect", function(socket) {
					user = new User(socket, data.name)
					room = new Lobby(server, data.id, `room-${data.name}`, data.mode)
					room.newPlayer(user)
					room.startGame(user)
				})

				socket = ioClient.connect(socketURL, option)

				socket.on("START", function (data) {
					expect(data.start).to.be(true)
					done()
				})
			})
		})

	})

	describe("#endGameCallback", () => {
		let client1, client2
		let map = [
			['.', '.', '.', '.', '.','.', '.', '.', '.', '.'],
			['.', '.', '.', '.', 'X','X', '.', '.', '.', '.'],
			['.', '.', '.', '.', 'X','X', '.', '.', '.', '.'],
			['.', '.', '.', '.', 'X','X', '.', '.', '.', '.'],
			['.', '.', '.', '.', 'X','X', '.', '.', '.', '.']
		]

		beforeEach(() => {
			room = new Lobby(server, `${data.id}-2`, room-`${room-data.id}`, data.mode)
		})
		
		afterEach(() => {
			room.kill()
			if (client1)
				client1.close()
			if (client2)
				client2.close()
		})
		
		it("should send GAMEOVER event (winner when solo)", function (done) {
			server.on("connect", function (socket) {
//				console.log(socket.id)
				user = new User(socket, data.name)
				room = new Lobby(server, `${data.id}-2`, room-`${room-data.id}`, data.mode)
				room.newPlayer(user)
				room.startGame(user)
				user.game.map = map
			})

			client1 = ioClient.connect(socketURL, option)

			client1.on("GAMEOVER", function(data) {
				expect(data.winner).to.be(true)
				done()
			})
		})

	})

	describe("#pieceCallback()", () => {
		it("should return a tetraminos", function () {
			let piece = room.pieceCallback(data.id, 0)
			expect(piece).to.have.key('shape')
			expect(piece).to.have.key('letter')
		})
	})

	describe("#mallusCallback()", () => {
		beforeEach(() => {
			room = new Lobby(server, data.id, `room-${data.id}`, "classic")
		})
		
		it("should return false  (when one is in the room)", () => {
			expect(room.mallusCallback(data.id)).to.be(false)
		})

		it("should return true (when multiple person are in the room", function (done) {
			server.on("connect", function (socket) {
				console.log(socket.id)
				user = new User(socket, data.name)
				room.newPlayer(user)
				room.startGame(user)
				if (room.mallusCallback(user.socket.id))
					done()
			})
			socket = ioClient.connect(socketURL, option)				
		})
	})

	describe('#ping()', function () { // need better imp
		beforeEach(() => {
		})

	  it.skip('should return an object', function(done) {
		server.on('connect', function(socket) {
		  console.log("connected")
		  room = new Lobby(server, data.id, `room-${data.id}`, 'classic')
		  socket.on('PING', function () {
			room.ping()
		  })
		})
		
		client = ioClient.connect(socketURL, option)
		
		client.on('CHECK', function(data) {
		  console.log("SALLLO")
		  const { room } = data
		  expect(room).to.be.an('object')
		  expect(room).to.have.property('nbrUser', 0)
		  expect(room).to.have.property('isStarted', false)
		  expect(room).to.have.property('id', data.id)
		  expect(room).to.have.property('name', `room-${data.id}`)
		  done()
		})

		client.emit('PING')
	  })
	})
})
