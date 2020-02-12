import 'babel-polyfill'
import { expect } from 'chai'

import ioClient from 'socket.io-client'

import * as server from '../../src/index'
import { connectToDatabase } from '../../src/config'
import params from '../../params'

const option = {
	transports: ['websocket'],
	'force new connection': true
}

describe("room's API testing", () => {
	let client
	before(() => {
		connectToDatabase(params.server.db)
		server.create(params.server)
		.then(() => console.log("Ready to listen"))
		.catch(err => console.log(err))
		console.log("YOOOO", params.server.url)
		client = ioClient.connect(params.server.url, option)
	})

	describe("#login LISTENER", () => {
		it('should log socket and return name of the user', (done) => {
			const user = {
				name: "testName"
			}
			client.on("login", (data) => {
				expect(data).to.have.property('name', user.name)
				done()
			})
	
			client.emit("login", user)
		})

		describe('should send an err message', () => {
			let dummy
			before(() => {
				dummy = ioClient.connect(params.server.url, option)
			})

			after(() => {
				dummy.disconnect()
			})

			it('case #1 (Username already taken)', (done) => {
				dummy.on('login', (data) => {
					expect(data).to.have.property('err', "Username already taken")
					done()
				})
				dummy.emit("login", { name: "testName" })
			})

			it('case #2 (No name property)', (done) => {
				dummy = ioClient.connect(params.server.url, option)
	
				dummy.on('login', (data) => {
					expect(data).to.have.property('err', 'No name property')
					done()
				})
	
				dummy.emit('login', {})
			})
		})

		

		describe('#FETCH listener', () => {
			it('should send an array to the FETCH listener function', (done) => {
				client.on("FETCH", (data) => {
					expect(data).to.have.property('rooms')
					expect(data.rooms).to.be.an('array')
					done()
				})
				client.emit("FETCH", {})
			})
			
		})

		describe('#JOIN listener', () => {
			const newRoom = {
				room: {
					name: "TESTING JOIN LISTENER",
					mode: "classic"
				}
			} 

			var room
			it("should create an new room and join it", (done) => {
				client.on("CREATED", (data) => {
					expect(data).to.have.property('room', true)
				})

				client.on('JOINED', (data) => {
					expect(data).to.be.an('object')
					expect(data).to.have.property('state', 'JOINED')
					expect(data).to.have.property('room')
					expect(data.room).to.have.property('id')
					expect(data.room).to.have.property('name', newRoom.room.name)
					expect(data.room).to.have.property('mode', false)
					room = data.room
				})

				client.on('HOST', (data) => {
					expect(data).to.have.property('host', true)
					done()
				})

				client.emit('JOIN', newRoom)
			})

			describe('#START listener', () => {
				it('should start the game', (done) => {
					client.on("START", (data) => {
						expect(data).to.have.property('start', true)
						done()
					})

					client.emit('START', room.id)
				})
			

				describe('#LEAVE listener', () => {
					it('should leave the room', (done) => {
						client.on("LEAVE", (data) => {
							expect(data).to.have.property('state', 'QUIT')
							done()
						})

						client.emit('LEAVE', { id: room.id})
					})

					it('should send error (user not in the lobby)', (done) => {
						let dummy = ioClient.connect(params.server.url, option)
						dummy.on('LEAVE', (data) => {
							expect(data).to.have.property('err', 'User not found')
							done()
						})
						
						dummy.emit("login", {name: "DUMMYONE"})
						dummy.emit('LEAVE', { id: room.id })
					})
				})
			})
		})
		
		describe('#CHECK listener', () => {})
	})
})
