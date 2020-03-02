import { expect } from 'chai'
import Controller from '../../../src/server/player/playerController'

import events from 'events'

describe("User Controller", function() {
	let data = { name: "testName" }
	let testedController
	
	beforeEach(() => {
		testedController = new Controller({})
	})

	describe("#login()", () => {
		it("should throw error if no name property", () => {
			expect(testedController.login.bind(testedController.login, {}, {})).to.throw("No name property")
		})

		describe("Username already taken error", () => {
			beforeEach(() => {
				let eventEmitter = new events.EventEmitter()
				eventEmitter.id = '1'
				testedController.login(eventEmitter, { name: "AlreadyTakenCase"})
			})

			it("should throw error if username arleady taken", () => {
				let socket = new events.EventEmitter()
				socket.id = '2'
				expect(testedController.login.bind(testedController, socket, {name: "AlreadyTakenCase"})).to.throw("Username already taken")
			})
		})

		it("#login() should return an user object", function () {
			let eE = new events.EventEmitter()
			eE.id = "2"
			const user = testedController.login(eE, data)

			expect(Object.keys(testedController.isLogged).length).to.be.equal(1)
			expect(user).to.not.be.undefined
			expect(user.name).to.be.equal(data.name)
			
		})
	})
	
	describe("#logout()", () => {
		it("#logout() should remove user from the Controller variable (isLogged)", () => {
			const eventEmitter = new events.EventEmitter()
			eventEmitter.id  = '1'
			const user = testedController.login(eventEmitter, data)

			expect(user).to.not.be.undefined
			testedController.logout(user.socket)
			expect(Object.keys(testedController.isLogged).length).to.be.equal(0)
			
		})
	})
})
