import Controller from './playerController'
import Player from './playerModel'
import Tetraminos from '../Game/tetraminos'
import Board from '../Game/Board'

import expect from 'expect.js'

import sinon from 'sinon'

import io from 'socket.io'
import ioClient from 'socket.io-client'

import { Socket } from './socket'

const socketURL = "http://localhost:5000"
const options = {
	transports: ['websocket'],
	'force new connection': true
}

const events = require('events')

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
				expect(data.display).to.be(undefined)
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
					expect(id).to.be(eventEmitter.id)
					expect(nbr).to.be(0)
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

				expect(user.stopGame()).to.be(true)
			})

			it("should return false (game variable not initialized)", () => {
				expect(user.stopGame()).to.be(false)
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
				expect(user.getMalus()).to.be(true)
			})

			it("should return false(when game isn't started)", () => {
				expect(user.getMalus()).to.be(false)
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
			expect(Object.keys(Controller.isLogged).length).to.be(1)
			expect(user.name).to.be(data.name)
			
		})
	})
	
	describe("#logout()", () => {
		it("#logout() should remove user from the Controller variable (isLogged)", () =>{
			Controller.logout(user.socket)
			expect(Object.keys(Controller.isLogged).length).to.be(0)
			
		})
	})


})
