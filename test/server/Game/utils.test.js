import utils from '../../../src/server/Game/utils'
import { Tetraminos, shape } from '../../../src/server/Game/tetraminos'

import { expect } from 'chai'

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

		describe("#clone()", () => {
			it("should return another map (copy reference)", () => {
				const clone = utils.clone(map)
				expect(clone).to.not.be.equal(map)
			})
		})

		describe('#merge()', () => {
			it("should return true (merge successful)", () => {
				const tetra = Tetraminos()
				expect(utils.merge(map, tetra, 0, 0)).to.be.true
			})

			it("should merge Bar shape to the board", () => {
				const tetra = shape.Bar

				const value = utils.merge(map, tetra, 0, 0)
				expect(value).to.be.true
			})

			it("should merge Left L shape to the board", () => {
				const tetra = shape.LeftL

				const value = utils.merge(map, tetra, 0, 0)
				expect(value).to.be.true
			})
			
			it("should merge Right L shape to the board", () => {
				const tetra = shape.RightL

				const value = utils.merge(map, tetra, 0, 0)
				expect(value).to.be.true
			})
			
			it("should merge Cube shape to the board", () => {
				const tetra = shape.Cube

				const value = utils.merge(map, tetra, 0, 0)
				expect(value).to.be.true
			})

			it("should merge Right Z shape to the board", () => {
				const tetra = shape.RightZ

				const value = utils.merge(map, tetra, 0, 0)
				expect(value).to.be.true
			})

			it("should merge Left Z shape to the board", () => {
				const tetra = shape.LeftZ

				const value = utils.merge(map, tetra, 0, 0)
				expect(value).to.be.true
			})

			it("should merge T Shape shape to the board", () => {
				const tetra = shape.LeftZ

				const value = utils.merge(map, tetra, 0, 0)
				expect(value).to.be.true
			})

			it("should return false X value invalid)", () => {
				const tetra = shape.Bar
				
				const value = utils.merge(map, tetra, 9, 0)
				expect(value).to.be.false
			})
		})

		describe("#remove", () => {
			let tetra
			beforeEach(() => {
				tetra = Tetraminos()
				utils.merge(map, tetra, 0, 0)
			})

			it("should return true (Piece removed)", () => {
				const value = utils.remove(map, tetra, 0, 0)
				expect(value).to.be.true
			})

			it("should return false (Invalid position in map)", () => {
				const value = utils.remove(map, tetra, 9, 0)

				expect(value).to.be.false
			})
		})

		describe("#addMallus()", () => {
			it("should add an line of Mallus at array[20]", () => {
				utils.addMallus(map, 0);
				const value = map[19].find(el => el === '.')

				expect(value).to.be.undefined
				expect(map.length).to.be.equal(20)
			})
		})

		describe("#isFull()", () => {
			it('should return undefined (No line is full)', () => {
				expect(utils.isFull(map, 20, (el) => el === '.')).to.be.undefined
			})

			it("should return an array of int (Indexes wherer line are full", () => {
				const arr = utils.isFull(map, 20, el => el === 'M')

				expect(arr).to.be.an('array')
				expect(arr.length).to.be.equal(19)
			})
		})

		describe("#rotateRight", ()  => {
			it('should rotate to the right', () => {
				const expected = [
					['.', '.', 'C', '.'],
					['.', '.', 'C', '.'],
					['.', '.', 'C', '.'],
					['.', '.', 'C', '.']
				]

				let piece = utils.clone(shape.Bar)
				utils.rotateRight(piece)
				expect(piece.shape).to.be.eql(expected)
			})
		})
		describe("#rotateLeft()", () => {
			it('should rotate to the left', () => {
				const expected = [
					['.', 'C', '.', '.'],
					['.', 'C', '.', '.'],
					['.', 'C', '.', '.'],
					['.', 'C', '.', '.']
				]

				let piece = utils.clone(shape.Bar)
				const rotation = utils.rotateLeft(piece)
				expect(rotation).to.be.eql(expected)
			})
		})
	})
})
