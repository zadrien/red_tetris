import utils from '../../src/Game/utils'
import Tetraminos from '../../src/Game/tetraminos'

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
			let tetra
			
			beforeEach(() => {
				tetra = new Tetraminos()
			})

			it("should return true (merge successful)", () => {
				expect(utils.merge(map, tetra, 0, 0)).to.be.true
			})

			//should test all tetraminos
		})

	})
})