import 'babel-polyfill'
import { expect } from 'chai'
import sinon from 'sinon'
import io from 'socket.io'

import { roomsDAL } from '../../../src/server/rooms/roomsDAL'
import Controller from '../../../src/server/rooms/roomsController'

describe("Rooms Controller unit test", () => {
	let roomsController
	let server
	let room = {
		name: "testRoom",
		mode: "classic"
	}
	const testedRoom = {
		id: 1,
		name: "testRoom",
		mode: false
	}

	let id
	let stub
	beforeAll(() => {
		server = io.listen(5000)
		roomsController = new Controller(server)
	})

	afterAll(() => {
		server.close()
	})

	describe("#restoreRooms()", () => {
		beforeAll(() => {
			stub = sinon.stub(roomsDAL, 'read').callsFake(() => [testedRoom])
		})

		afterAll(() => {
			stub.restore()
		})
		
		it("should return array of rooms", async function () {
			jest.setTimeout(5000)
			try {
				const value = await roomsController.restore()
				expect(value).to.be.an('array')
				expect(value[0]).to.be.equal(testedRoom)
			} catch (err) {
				console.log(err)
			}
		})
	})
	
	describe("#create()", () => {
		beforeAll(() => {
			stub = sinon.stub(roomsDAL, 'create').callsFake(() => true)
		})

		afterAll(() => {
			stub.restore()
		})

		it("should return room data Object", async function() {
			try {
				const value = await roomsController.create(room)
				id = value.id
				expect(value.id).to.not.be.undefined
			} catch (err) {
				console.log(err)
			}
		})
	})

	describe("#find()", () => {
		it("should return Room instance", function() {
			const value = roomsController.find(testedRoom.id)
			expect(value).to.not.be.undefined
		})
	})

	describe("deleteRoom()", () => {


		it('should expect to be undefined', function() {
			roomsController.deleteRoom(testedRoom.id)
			try {
				roomsController.find(testedRoom.id)
			} catch (err) {
				expect(err.message).to.be.equal("Room not found")
			}
		})
	})

	describe('#purge()', () => {
		it("should stop all instance", () => {
			roomsController.purge()
			expect(roomsController.Rooms).to.be.empty
		})
	})
})
