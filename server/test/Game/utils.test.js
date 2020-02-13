import utils from '../../src/Game/utils'
import { shape } from '../../src/Game/tetraminos'

import { expect } from 'chai'
import { placeable } from '../../src/Game/helpers'

describe("Board Utility Function", () => {

	describe("#buildMap()", () => {
		it("return an new Array(20)", () => {
			let map = utils.buildMap()
			expect(map).to.be.an('array')
		})
	})

	describe("Core Testing Utiliy", () => {
		let map
		beforeEach(() => {
			map = utils.buildMap()
		})

		describe("#copyMap()", () => {
			it("should return another map (copy reference)", () => {
				const clone = utils.clone(map)
				expect(clone).to.not.be.equal(map)
			})
		})

		describe('#merge()', () => {
			let tetra, i
//			const keys = Object.
//			i = 0
			// beforeEach(() => {
				
			// 	tetra = 
			// })

			it.skip("should return true (merge successful)", () => {
				expect(utils.merge(map, tetra, 0, 0)).to.be.true
			})

			it.only("should merge Bar shape to the board", () => {
				const tetra = shape.Bar

				const value = utils.merge(map, tetra, 0, 0)
				console.log(map)
				expect(value).to.be.true
			})

			it.only("should merge Left L shape to the board", () => {
				const tetra = shape.LeftL

				const value = utils.merge(map, tetra, 0, 0)
				console.log(map)
				expect(value).to.be.true
			})
			
			it.only("should merge Right L shape to the board", () => {
				const tetra = shape.RightL

				const value = utils.merge(map, tetra, 0, 0)
				console.log(map)
				expect(value).to.be.true
			})			
			//should test all tetraminos
		})

	})
})
