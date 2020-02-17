import { expect } from 'chai'
import sinon from 'sinon'

import io from 'socket.io'
import ioClient from 'socket.io-client'
import events from 'events'

import Lobby from '../../src/rooms/roomsModel'
import User from '../../src/player/playerModel'

const socketURL = "http://localhost:5000"
const option = {
	transports: ['websocket'],
	'force new connection': true
}

describe("Room Model Unit Test", () => {
	let server, socket, room, client, stubUser
	let data = {
		name: "testName",
		id: "testID",
		mode: "classic"
	}
	beforeEach(() => {
		stubUser = sinon.stub(User.prototype, 'join').callsFake(() => true)
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
		stubUser.restore()
	})
	
	describe("Lobby Constructor", () => {
		it("init room instance", () => {
			room = new Lobby(server, data.id, `room-${data.name}`, data.mode)
			expect(room).to.not.be.undefined
		})
	})

	describe("Lobby's method", () => {
		let room, stub

		// before(() => {
		// 	stub = sinon.stub(Lobby.prototype, 'ping').callsFake(() => true)
		// })
		// after(() => {
		// 	stub.restore()
		// })

		beforeEach(() => {
			room = new Lobby(server, data.id, `room-${data.name}`, data.mode)
		})

		describe("#newPlayer()", () => {
			it("should trigger HOST event listener", function (done) {
				const eventEmitter = new events.EventEmitter()
				eventEmitter.on("JOINED", (data) => {
					expect(data).to.have.property('state', "JOINED")
					expect(data).to.have.property('room')
					expect(data.room).to.be.eql({id: 'testID', name: 'room-testName', mode: false})
				})

				eventEmitter.on("HOST", (data) => {
					expect(data).to.have.property("host", true)
					done()
				})
				const user = new User(eventEmitter, data.name)
				expect(room.newPlayer(user)).to.be.true
			})

			it('should throw error if lobby as started', () => {
				room.start = true
				expect(room.newPlayer.bind(room, {})).to.throw("Lobby as already started")
			})
		})

		describe("#startGame()", () => {
			let user1, user2
			let eventEmitter1, eventEmitter2

			beforeEach(() => {
				eventEmitter1 = new events.EventEmitter()
				eventEmitter2 = new events.EventEmitter()
				eventEmitter1.id = '1'
				eventEmitter2.id = '2'
				user1 = new User(eventEmitter1, "user1")
				room.newPlayer(user1)
				user2 = new User(eventEmitter2, "user2")
				room.newPlayer(user2)
			})

			it("should return false (not the host of the Lobby)", () => {
				expect(room.startGame(user2)).to.be.false
			})

			it("should return true (host of the lobby)", (done) => {
				eventEmitter2.on("START", (data) => {
					expect(data).to.have.property('start', true)
				})
				eventEmitter1.on("START", (data) => {
					expect(data).to.have.property('start', true)
					done()
				})
				expect(room.startGame(user1)).to.be.true
				expect(room.start).to.be.true
			})
		})

		describe("TDD Lobby with 2 player", () => {
			let user1, user2
			let eventEmitter1, eventEmitter2

			beforeEach(() => {
				eventEmitter1 = new events.EventEmitter()
				eventEmitter2 = new events.EventEmitter()
				eventEmitter1.id = '1'
				eventEmitter2.id = '2'
				user1 = new User(eventEmitter1, "user1")
				user2 = new User(eventEmitter2, "user2")
				room.newPlayer(user1)
				room.newPlayer(user2)
			})


			afterEach(() => {
				eventEmitter1.removeAllListeners()
				eventEmitter2.removeAllListeners()
			})


			describe("#leaveGame()", () => {
				let stub

				beforeEach(() => {
					stub = sinon.stub(User.prototype, 'leave').callsFake(() => true)
				})

				afterEach(() => {
					stub.restore()
				})

				it("should throw an error (User not found)", () => {
					const user = {
						socket: {
							id: 'NotFound'
						}
					}
					expect(room.leaveGame.bind(room, user)).to.throw("User not found")
				})

				it("should remove user2 player from the lobby", (done) => {
					eventEmitter2.on("LEAVE", (data) => {
						expect(data).to.have.property("state", "QUIT")
						done()
					})

					room.leaveGame(user2)
					expect(room.users).to.not.have.property(user2.socket.id)
				})

				it("should reassign host property to user2 when user1 (host) leave", (done) => {
					eventEmitter2.on("HOST", (data) => {
						expect(data).to.have.property('host', true)
					})

					eventEmitter1.on("LEAVE", (data) => {
						expect(data).to.have.property("state", "QUIT")
						done()
					})

					room.leaveGame(user1)
				})

				it("should trigger resetLobby() when party is not running", (done) => {
					const stb = sinon.stub(Lobby.prototype, 'resetLobby').callsFake(() => {
						stb.restore()
						done()
					})
					// room.startGame()
					room.leaveGame(user1)
				})

				it("should trigger Player's stopGame method when isPlaying is true", (done) => {
					const stb = sinon.stub(User.prototype, 'stopGame').callsFake(() => {
						stb.restore()
						done()
					})
					room.startGame(user1)
					room.leaveGame(user1)

				})
			})
			
			// describe("#endGameCallback", () => {
			// 	let client1, client2
			// 	let map = [
			// 		['.', '.', '.', '.', '.','.', '.', '.', '.', '.'],
			// 		['.', '.', '.', '.', 'X','X', '.', '.', '.', '.'],
			// 		['.', '.', '.', '.', 'X','X', '.', '.', '.', '.'],
			// 		['.', '.', '.', '.', 'X','X', '.', '.', '.', '.'],
			// 		['.', '.', '.', '.', 'X','X', '.', '.', '.', '.']
			// 	]
	
			// 	beforeEach(() => {
			// 		room = new Lobby(server, `${data.id}-2`, room-`${room-data.id}`, data.mode)
			// 	})
				
			// 	afterEach(() => {
			// 		room.kill()
			// 		if (client1)
			// 			client1.close()
			// 		if (client2)
			// 			client2.close()
			// 	})
				
			// 	it("should send GAMEOVER event (winner when solo)", function (done) {
			// 		server.on("connect", function (socket) {
			// 			user = new User(socket, data.name)
			// 			room = new Lobby(server, `${data.id}-2`, room-`${room-data.id}`, data.mode)
			// 			room.newPlayer(user)
			// 			room.startGame(user)
			// 			user.game.map = map
			// 		})
	
			// 		client1 = ioClient.connect(socketURL, option)
	
			// 		client1.on("GAMEOVER", function(data) {
			// 			expect(data.winner).to.be.equal(true)
			// 			done()
			// 		})
			// 	})
	
			// })
	
			describe("#mallusCallback()", () => {
				it("should trigger user2 mallus method", (done) => {
					const stb = sinon.stub(User.prototype, 'getMalus').callsFake(() => {
						stb.restore()
						done()
					})

					room.startGame(user1)
					room.mallusCallback(user1.socket.id)
				})

				it("should return false (one player only)", () => { // to fixed
					const stb = sinon.stub(User.prototype, 'leave').callsFake(() => true)
					room.leaveGame(user2)
					room.startGame.bind(user1)

					expect(room.mallusCallback(user1.socket.id)).to.be.false
					stb.restore()
				})
			})

			describe("#pieceCallback()", () => {
				it("should return a tetraminos", function () {
					let piece = room.pieceCallback(data.id, 0)
					expect(piece).to.have.keys('shape', 'letter', 'start')
					expect(room.pieces.length).to.be.eql(1)
				})
			})
		})

		describe("#resetLobby()", () => {
			it("should reset start and pieces attr", () => {
				room.start = true
				room.pieces = [1, 2, 3]

				room.resetLobby()
				expect(room.start).to.be.false
				expect(room.pieces).to.be.empty
			})
		})

		
	})

	describe('#startBroadcast()', function () { // need better imp
	  it.skip('should return an object', function(done) {
		server.on('connect', function(socket) {
		  room = new Lobby(server, data.id, `room-${data.id}`, 'classic')
		})
		
		client = ioClient.connect(socketURL, option)
		
		client.on('PLAYERS', function(d) {
		  expect(d).to.be.an('array')
		  done()
		})
	  })
	})

	describe('#ping()', function () { // need better imp
	  it('should return an object', function(done) {
		server.on('connect', function(socket) {
		  room = new Lobby(server, data.id, `room-${data.id}`, 'classic')
		  socket.on('PING', function () {
			room.ping('CHECK')
		  })
		})
		
		client = ioClient.connect(socketURL, option)
		
		client.on('CHECK', function(d) {
		  const { room } = d
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
