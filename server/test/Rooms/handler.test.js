import 'babel-polyfill'
import { expect } from 'chai'

import io from 'socket.io'

import params from '../../params'
import { connectToDatabase, closeDatabase } from '../../src/config'
import { restoreRooms, create, find, deleteRoom, purge } from '../../src/rooms/roomsHandler'

describe("rooms Handle unit test", () => {
	let server
	let room = {
		name: "testRoom",
		mode: "classic"
	}
	let id, res
	
	before(function() {
		server = io.listen(5000)
		connectToDatabase(params.server.db)
	})

	after(async function() {
		console.log("After")
		await closeDatabase()
		server.close(() => { console.log("closed") })
	})
	
	describe("#restoreRooms()", () => {
		it("should return array of rooms", async function () {
			this.timeout(5000)
			try {	
				res = await restoreRooms(server)
				expect(res).to.be.an('array')
			} catch (err) {
				expect.fail(err)
			}
		})
	})
	
	describe("#create()", () => {
		it("should return room data Object", async function() {
			try {
				res = await create(server, room)
				id = res.id
				expect(res.id).to.not.be.equal(undefined)
			} catch (err) {
				expect.fail(err)
			}
		})
	})

	describe("#find()", () => {
		it("should return Room instance", function() {
			res = find(id)
			expect(res).to.not.be.equal(undefined)
		})
	})

	describe("deleteRoom()", () => {
		it('should return 1', async function() {
			res = await deleteRoom(id)
			expect(res).to.be.equal(1)			
		})
	})

	describe('#purge()', () => {
		it("should stop all instance", () => {
			expect(purge()).to.be.equal(true)
		})
	})
})
