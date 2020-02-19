import 'babel-polyfill'
import { expect } from 'chai'
import sinon from 'sinon'

import ioClient from 'socket.io-client'
import Room from '../../src/rooms/roomsModel'
import { Rooms } from '../../src/rooms/roomsDAL'

import server from '../../src/index'
import params from '../../params'


const option = {
	transports: ['websocket'],
	'force new connection': true
}

describe("room's API testing", () => {
	let client, room

	beforeEach(() => {
		client = ioClient.connect(params.server.url, option)
	})

	afterEach(() => {
		client.close()
	})

	describe("#login LISTENER", () => {
		it('should log socket and return name of the user', (done) => {
			const user = { name: "testName" }

			client.on("login", (data) => {
				expect(data).to.have.property('name', user.name)
				done()
			})
	
			client.emit("login", user)
		})

		it("should send an error message (Data Object empty)", (done) => {
			client.on('login', (data) => {
				expect(data).to.have.property('err', 'No name property')
				done()
			})

			client.emit("login", {})
		})
	})

	describe("#fetch()", () => {
		beforeEach(() => {
			client.emit("login", { name: "testName"})
		})

		it("should return an array of rooms", (done) => {
			client.on("FETCH", (data) => {
				expect(data).to.be.an('Object')
				expect(data).to.have.property('rooms').to.be.an('array')
				//take one room for futher testing
				room = data.rooms[Math.floor(Math.random() * data.rooms.length)]
				done()
			})

			client.emit("FETCH", {})
		})

		it("should trigger FETCH listener with an error property", (done) => {
			const stub = sinon.stub(Rooms, 'read').callsFake(() => Promise.reject(new Error("failed")))

			client.on("FETCH", (data) => {
				expect(data).to.not.have.property('rooms')
				expect(data).to.have.property('err', "failed")
				stub.restore()
				done()
			})

			client.emit("FETCH", {})
		})
	})
	
	describe("#JOIN listener", () => {
		beforeEach(() => {
			client.emit("login", { name: "testName" })
		})

		afterEach(() => {
			client.close()
		})

		it("should JOINED an room", (done) => {
			client.on("JOINED", (data) => {
				expect(data).to.be.an('object')
				expect(data).to.have.property("state", "JOINED")
				expect(data).to.have.property("room").to.be.eql({id: room.id, name: room.name, mode: (room.mode === "classic" ? false: true)})
				done()
			})

			client.emit("JOIN", { room: {
				id: room.id
			}})
		})

		it("should create an new room", (done) => {
			client.on("JOINED", (data) => {
				expect(data).to.be.an('object')
				expect(data).to.have.property('room')
			})

			client.on("CREATED", (data) => {
				expect(data).to.have.property('room', true)
				done()
			})

			client.emit("JOIN", { room: {
				name: 'test',
				mode: "classic",
			}})
		})

		it("should trigger CREATED listner w/ err attr", (done) => {
			const stub = sinon.stub(Rooms, 'create').callsFake(() => Promise.reject(new Error("FUCK")))
			client.on("CREATED", (data) => {
				expect(data).to.not.have.property('room')
				expect(data).to.have.property('err', 'FUCK')
				stub.restore()
				done()
			})

			client.emit("JOIN", { room: {
				name: "shouldFailed",
				mode: "invisible"
			}})
		})

		it("should trigger JOINING listener with err attr (Room unjoinable)", (done) => {
			const stub = sinon.stub(Room.prototype, 'newPlayer').callsFake(() => {throw new Error("Room unjoinable")})

			client.on("JOINING", (data) => {
				expect(data).to.be.an("object")
				expect(data).to.have.property('state', "JOINED")
				expect(data).to.have.property('err', "Room unjoinable")
				stub.restore()
				done()
			})

			client.emit("JOIN", { room: {
				id: room.id,
			}})
		})
	})

	describe("#leave", () => {
		beforeEach(() => {
			client.emit("login", { name: "testName" })
		})

		afterEach(() => {
			client.close()
		})

		it("should trigger LEAVE listener", (done) => {
			client.emit("JOIN", { room: { id: room.id }})

			client.on("LEAVE", data => {
				expect(data).to.have.property('state', 'QUIT')
				done()
			})

			client.emit("LEAVE")
			
		})

		it("should trigger LEAVE listener with 'user not in a lobby' as error", (done) => {
			client.on("LEAVE", (data) => {
				expect(data).to.have.property('err', 'user not in a Lobby')
				done()
			})

			client.emit("LEAVE", {})
		})
	})

	describe("#start()", () => {
		beforeEach(() => {
			client.emit("login", { name: "testName" })
		})

		afterEach(() => {
			client.close()
		})

		it("should triiger START listener with err attr (User not in a Lobby)", (done) => {
			client.on("START", data => {
				expect(data).to.have.property('err', "user not in a Lobby")
				done()
			})

			client.emit("START")
		})

		it("trigger START listener with start attr as true", (done) => {
			client.emit("JOIN", { room: { id: room.id }})
			client.on("START", data => {
				expect(data).to.have.property('start', true)
				done()
			})

			client.emit("START")
		})
	})
})