import { expect } from 'chai'

import { setInterface } from '../../actions/Menu.js'

describe("menu's action unit test", () => {
	let data = "LISTING"
	describe('#setInterface()', () => {
		it("should return an object", () => {
			let res = setInterface(data)
			expect(res).to.have.property('menu', data)
		})
	})
})
