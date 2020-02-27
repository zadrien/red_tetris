import { expect } from 'chai'

import sinon from 'sinon'

const events = require('events')

import Player from '../../../src/server/player/playerModel'
import Board from '../../../src/server/Game/Board'
import { Tetraminos } from '../../../src/server/Game/tetraminos'

describe("User model", () => {
	let user, eventEmitter

	beforeEach(() => {
		eventEmitter = new events.EventEmitter()
		eventEmitter.id = "testID"
		user = new Player(eventEmitter, "testName")
	})

	describe("Player constructor", () => {
		it("should set all parametter according to the construtor", () => {
			expect(user).to.include({
				socket: eventEmitter,
				name: "testName",
				game: undefined,
				isPlaying: false,
				currentLobby: undefined,
			})
		})

		describe("Socket Listener", () => {
			it("should trigger event disconnect", (done) => {
				user.game = true;
				eventEmitter.on("LEAVE", () => done())
				eventEmitter.emit("disconnect")
			})

			it("should trigger QUIT event listener", (done) => {
				eventEmitter.on("LEAVE", () => done())
				user.initGame(false)
				eventEmitter.emit("QUIT")
			})
		})
	})

	describe("#initGame()", () => {
		it("should trigger displaay listener", (done) => {
			eventEmitter.on("DISPLAY", (data) => {
				expect(data).to.be.an('array')
				done()
			})
			user.initGame(false)
		})
	})

	describe("#get()", () => {
		it("should return an object", () => {
			const obj = user.get()

			expect(obj).to.have.property('id', "testID")
			expect(obj).to.have.property('name', "testName")
			expect(obj).to.have.property('isPlaying', false)
			expect(obj).to.have.property('display').to.be.undefined
		})

		it('should return an object with non-undefined display attribute', () => {
			user.initGame(false)
			const obj = user.get()

			expect(obj).to.have.property('id', "testID")
			expect(obj).to.have.property('name', "testName")
			expect(obj).to.have.property('isPlaying', false)
			expect(obj).to.have.property('display').to.be.an('array')
		})
	})

	describe("#Notify()", () => {
		it("should trigger event", (done) => {
			const expectedValue = "test"
			eventEmitter.on("TEST", (data) => {
				expect(data).to.be.equal(expectedValue)
				done()
			})

			user.Notify("TEST", expectedValue)
		})
	})

	describe("Lobby Interaction", () => {
		let value = { id: 1 }

		describe("#join()", () => {
			it("should trigger join function", (done) => {
				eventEmitter.join = function (id) {
					expect(id).to.be.equal(value.id)
					done()
				}

				user.join(value)
				expect(user.currentLobby).to.be.equal(value)
			})
		})


		describe("#leave()", () => {
			it("should trigger leave function of eventEmitter", (done) => {
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
			it("should trigger leaveGame function of event emitter", (done) => {
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

			it("should trigger LEFT function", (done) => {	
				stub = sinon.stub(Board.prototype, "left").callsFake(() => done())
				
				eventEmitter.emit("CONTROLLER", "LEFT")
			})
		
			it("should trigger RIGHT function", (done) => {
				stub = sinon.stub(Board.prototype, "right").callsFake(() => done())
				
				eventEmitter.emit("CONTROLLER", "RIGHT")
			})

			it("should trigger DOWN function", (done) => {
				stub = sinon.stub(Board.prototype, "down").callsFake(() => done())
				
				eventEmitter.emit("CONTROLLER", "DOWN")
			})
			
			it("should trigger UP function", (done) => {
				stub = sinon.stub(Board.prototype, "rotate").callsFake(() => done())

				eventEmitter.emit("CONTROLLER", "UP")
			})

			it("should trigger SPACE function", (done) => {
				stub = sinon.stub(Board.prototype, "place").callsFake(() => done())

				eventEmitter.emit("CONTROLLER", "SPACE")
			})
		})

		describe("#start()", () => {
			let stub
			const getPiece = (id, data) => {return Tetraminos()}
			const sendMallus = () => {}
			const end = () => {}

			beforeEach(() => {
				user.initGame(false)
			})
			afterEach(() => {
				eventEmitter.removeAllListeners()
				user.stopGame()
				if(stub)
					stub.restore()
			})

			it("should start and set the isPlaying attr to true", () => {
				user.start(getPiece, sendMallus, end)
				expect(user.isPlaying).to.be.true
			})

			it("should trigger socket listener DISPLAY with array as value", (done) => {
				eventEmitter.on("DISPLAY", (data) => {
					user.stopGame()
					expect(data).to.be.an('array')
					expect(data.length).to.be.eql(20)
					done()
				})
				user.start(getPiece, sendMallus, end)
				expect(user.isPlaying).to.be.true
			})

			it('should trigger sendMallus callback', (done) => {
				const testedCallback = (id) => {
					expect(id).to.be.eql(eventEmitter.id)
					done()
				}
				user.start(getPiece, testedCallback, end)
				user.eventEmitter.emit('mallus')
			})

			it('should trigger end callback', (done) => {
				const testedCallback = (id) => {
					expect(id).to.be.eql(eventEmitter.id)
					done()
				}
				
				stub = sinon.stub(Board.prototype, "add").callsFake(() => false)
				user.start(getPiece, sendMallus, testedCallback)
			})
		})
	})
})
