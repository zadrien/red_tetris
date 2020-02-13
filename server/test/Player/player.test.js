import { expect } from 'chai'

import sinon from 'sinon'

const events = require('events')

import Controller from '../../src/player/playerController'
import Player from '../../src/player/playerModel'
import Board from '../../src/Game/Board'


describe("User model", () => {
	let user
	var eventEmitter, fn

	beforeEach(() => {
		eventEmitter = new events.EventEmitter()
		eventEmitter.id = "testID"
		user = new Player(eventEmitter, "testName")
	})

	describe("#initGame()", () => {
		it.only("should trigger displaay listener", (done) => {
			eventEmitter.on("DISPLAY", (data) => {
				expect(data).to.be.an('array')
				done()
			})
			user.initGame(false)
		})
	})

	describe("#get()", () => {
		it.only("should return an object", () => {
			const obj = user.get()

			expect(obj).to.have.property('id', "testID")
			expect(obj).to.have.property('name', "testName")
			expect(obj).to.have.property('isPlaying', false)
			expect(obj).to.have.property('display').to.be.undefined
		})

		it.only('should return an object with non-undefined display attribute', () => {
			user.initGame(false)
			const obj = user.get()

			expect(obj).to.have.property('id', "testID")
			expect(obj).to.have.property('name', "testName")
			expect(obj).to.have.property('isPlaying', false)
			expect(obj).to.have.property('display').to.be.an('array')
		})
	})

	describe("#Notify()", () => {
		it.only("should trigger event", (done) => {
			const expectedValue = "test"
			eventEmitter.on("TEST", (data) => {
				expect(data).to.be.equal(expectedValue)
				done()
			})

			user.Notify("TEST", expectedValue)
		})
	})

	describe("Lobby Interaction", () => {
		let value = {
				id: 1
			}

		describe("#join()", () => {
			it.only("should trigger join function", (done) => {
				eventEmitter.join = function (id) {
					expect(id).to.be.equal(value.id)
					done()
				}

				user.join(value)
				expect(user.currentLobby).to.be.equal(value)
			})
		})


		describe("#leave()", () => {
			it.only("should trigger leave function of eventEmitter", (done) => {
				eventEmitter.leave = function(id) {
					expect(id).to.be.equal(value.id)
					done()
				}
				user.currentLobby = value
				user.leave(value)
				expect(user.currentLobby).to.be.undefined
			})
		})

		describe("#disconnect()", () => {
			it.only("should trigger leaveGame function of event emitter", (done) => {
				value.leaveGame = function(id) {
					expect(id).to.be.eql(user)
					done()
				}

				user.currentLobby = value
				user.disconnect()
				expect(user.currentLobby).to.be.undefined
			})

			it("should return false (currentLobby as undefined", () => {
				expect(user.disconnect()).to.be.false
			})
		})

		describe("#controller()", () => {
			let stub
			beforeEach(() => {
				user.initGame(false)
			})

			afterEach(() => {
				user.stopGame()
				stub.restore()
			})

			it.only("should trigger LEFT function", (done) => {	
				stub = sinon.stub(Board.prototype, "left").callsFake(() => done())
				
				eventEmitter.emit("CONTROLLER", "LEFT")
			})
		
			it.only("should trigger RIGHT function", (done) => {
				stub = sinon.stub(Board.prototype, "right").callsFake(() => done())
				
				eventEmitter.emit("CONTROLLER", "RIGHT")
			})

			it.only("should trigger DOWN function", (done) => {
				stub = sinon.stub(Board.prototype, "down").callsFake(() => done())
				
				eventEmitter.emit("CONTROLLER", "DOWN")
			})
			
			it.only("should trigger UP function", (done) => {
				stub = sinon.stub(Board.prototype, "rotate").callsFake(() => done())

				eventEmitter.emit("CONTROLLER", "UP")
			})

			it.only("should trigger SPACE function", (done) => {
				stub = sinon.stub(Board.prototype, "place").callsFake(() => done())

				eventEmitter.emit("CONTROLLER", "SPACE")
			})

		})
	})
})

describe("User model", () => {
	let user
	var eventEmitter, fn

	beforeEach(() => {
		eventEmitter = new events.EventEmitter()
		eventEmitter.id = "testID"
		user = new Player(eventEmitter, "testName")
	})


	describe("-> User's Game Interaction", () => {
		afterEach(() => {
			if (fn === 'Function')
				eventEmitter.removeListener("DISPLAY", fn)
		})

		describe("#get()", () => {
			it("should get undefined display value", () => {
				let data = user.get()
				expect(data.display).to.be.equal(undefined)
			})

			it("should get a array as display value", () => {
				let data
				user.initGame(false)
				data = user.get()
				expect(data.display).to.be.an('array')
				
			})
		})
		
		describe("#initGame()", () => {
			it("should send an display event", (done) => {
				fn = function(data) {
					expect(data).to.be.an('array')
					done()
				}
				eventEmitter.on("DISPLAY", fn)

				user.initGame(false)
			})
		})
		
		describe("#start()", () => {
			afterEach(() => {
				user.stopGame()
			})
			
			it("should request for an new piece", (done) => {
				user.initGame(false)
				fn = function(id, nbr) {
					expect(id).to.be.equal(eventEmitter.id)
					expect(nbr).to.be.equal(0)
					done()
				}
				let end = (id) => {}
				let mallus = (id) => {}
				user.start(fn, mallus, end)
			})

			it("should request for a mallus", function(done) {
				this.timeout(3000)
				user.initGame(false)
				let cb, cb1, cb2
				cb = (id, nbr) => {}
				cb1 = (id) => { done() }
				cb2 = (id) => {}
				user.start(cb, cb1, cb2)
				setTimeout(user.game.event.emit("mallus"), 2000)				
			})
		})

		describe("#stopGame()", () => {
			it("should return true", () => {
				user.initGame(false)
				let cb, cb1, cb2
				cb = (id, nbr) => {}
				cb1 = (id) => {}
				cb2 = (id) => {}
				user.start(cb, cb1, cb2)

				expect(user.stopGame()).to.be.equal(true)
			})

			it("should return false (game variable not initialized)", () => {
				expect(user.stopGame()).to.be.equal(false)
			})
		})

		describe("#getMalus()", () => {
			afterEach(() => {
				user.stopGame()
			})
			it("should return true (when game is started)", () => {
				let cb, cb1, cb2
				cb = (id, nbr) => {}
				cb1 = (id) => {}
				cb2 = (id) => {}
				user.initGame(false)
				user.start(cb, cb1, cb2)
				expect(user.getMalus()).to.be.equal(true)
			})

			it("should return false(when game isn't started)", () => {
				expect(user.getMalus()).to.be.equal(false)
			})
		})

		describe("#controller()", () => {
			let stub
			afterEach(() => {
				user.stopGame()
				stub.restore()
			})

			it("should trigger LEFT function", (done) => {
				let cb, cb1, cb2
				cb = (id, nbr) => {}
				cb1 = (id) => {}
				cb2 = (id) => {}
				user.initGame(false)
				user.start(cb, cb1, cb2)
				
				stub = sinon.stub(Board.prototype, "left").callsFake(() => done())
				
				eventEmitter.emit("CONTROLLER", "LEFT")
			})
		
			it("should trigger RIGHT function", (done) => {
				let cb, cb1, cb2
				cb = (id, nbr) => {}
				cb1 = (id) => {}
				cb2 = (id) => {}
				user.initGame(false)
				user.start(cb, cb1, cb2)
				
				stub = sinon.stub(Board.prototype, "right").callsFake(() => done())
				
				eventEmitter.emit("CONTROLLER", "RIGHT")
			})

			it("should trigger DOWN function", (done) => {
				let cb, cb1, cb2
				cb = (id, nbr) => {}
				cb1 = (id) => {}
				cb2 = (id) => {}
				user.initGame(false)
				user.start(cb, cb1, cb2)
				
				stub = sinon.stub(Board.prototype, "down").callsFake(() => done())
				
				eventEmitter.emit("CONTROLLER", "DOWN")
			})
			
			it("should trigger UP function", (done) => {
				let cb, cb1, cb2
				cb = (id, nbr) => {}
				cb1 = (id) => {}
				cb2 = (id) => {}
				user.initGame(false)
				user.start(cb, cb1, cb2)
				
				stub = sinon.stub(Board.prototype, "rotate").callsFake(() => done())

				eventEmitter.emit("CONTROLLER", "UP")
			})

			it("should trigger SPACE function", (done) => {
				let cb, cb1, cb2
				cb = (id, nbr) => {}
				cb1 = (id) => {}
				cb2 = (id) => {}
				user.initGame(false)
				user.start(cb, cb1, cb2)
				
				stub = sinon.stub(Board.prototype, "place").callsFake(() => done())

				eventEmitter.emit("CONTROLLER", "SPACE")
			})

		})
	})
})


describe("User Controller", function() {
	let data = { name: "testName" }
	let socket, user
	
	before(function() {
		socket = new events.EventEmitter()
		socket.id = "testID"
	})

	describe("#login()", () => {
		it("#login() should return an user object", function () {
			user = Controller.login(socket, data)
			if (!user) {
					expect.fail("user not initialized")
			}
			expect(Object.keys(Controller.isLogged).length).to.be.equal(1)
			expect(user.name).to.be.equal(data.name)
			
		})
	})
	
	describe("#logout()", () => {
		it("#logout() should remove user from the Controller variable (isLogged)", () =>{
			Controller.logout(user.socket)
			expect(Object.keys(Controller.isLogged).length).to.be.equal(0)
			
		})
	})


})
