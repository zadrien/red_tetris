import 'babel-polyfill'
import { expect} from 'chai'
import uuidv4 from 'uuid'

import { connectToDatabase, closeDatabase } from '../../src/config'
import { Rooms as roomsDAL } from '../../src/rooms/roomsDAL'
import params from '../../params'

describe("Room's DAL unit test", () => {
	let room = {
		id: uuidv4(),
		name: "testRoom",
		mode: "classic",
		open: true
	}
	
	before(function() {
		connectToDatabase(params.server.db)
	})

	after(() => {
		closeDatabase()
	})
	
	describe("#create()", () => {
		it("should create a new room" , async function () {
			try {
				let res = await roomsDAL.create(room)
				expect(res.id).to.be.equal(room.id)
				expect(res.name).to.be.equal(room.name)
				expect(res.mode).to.be.equal(room.mode)
				expect(res.open).to.be.equal(true)
			} catch (err) {
				expect().fail(err)
			}
		})

		it("should return error (duplicate)", async function () {
			try {
				let res = await roomsDAL.create(room)
				expect(res).to.be.equal(undefined)
			} catch(err) {

			}
		})
	})

	describe("#readOne()", function () {
		it("should return an object",  async function() {
			try {
				let fetch = await roomsDAL.readOne(room.id)
				expect(fetch.id).to.be.equal(room.id)
			} catch (err) {
				expect().fail(err)
			}
		})
	})

	describe("#read()", () => {
		it("should fetch room's data", async function () {
			try {
				var data = await roomsDAL.read({}, {}, 0, 1)
				expect(data).to.be.an('array')
				expect(data.length).to.be.above(0)
			} catch (err) {
				expect().fail(err)
			}
		})

		it("should get only classic mode", async function() {
			let data = await roomsDAL.read({mode: "classic"}, {}, 0, 10)
			let res = data.find((el) => el.mode !== 'classic')
			expect(res).to.be.equal(undefined)
		})
	})

	describe("#update()", () => {
		it("should update room's value", async function () {
			try {
				var data = await roomsDAL.update(room.id, {open: false})
				expect(data).to.be.above(0)
			} catch (err) {
				expect().fail(err)
			}
		})
		
		it('should return err (id not found)', async function () {
			var nbr = await roomsDAL.update("IDNotFound", {name : "tutu"})
			expect(nbr).to.be.equal(0)
		})
	})

	describe("#delete()", () => {
		it("should delete testRoom",  async function () {
			try {
				var d = await roomsDAL.deleteRoom(room.id)
				expect(d).to.be.equal(1)
			} catch (err) {
				expect().fail(err)				
			}
		})

		it("should return err", async function () {
			var d = await roomsDAL.deleteRoom("IDNotFound")
			expect(d).to.be.equal(0)
		})
	})
})
