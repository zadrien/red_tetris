import { expect } from 'chai'
import Board from '../../src/Game/Board'
import { Tetraminos, shape } from '../../src/Game/tetraminos'
import utils from '../../src/Game/utils'

import sinon from 'sinon'
const events = require('events')

describe('board unit test', () => {
	let board, piece, eventEmitter

	beforeEach(() => {
		eventEmitter = new events.EventEmitter()
		board = new Board(eventEmitter, false)
	})

	afterEach(() => {
		board.stop()
	})

	describe("#get()", () => {
		it("should return return map Array", () => {
			expect(board.get()).to.be.eql(board.map)
		})
	})

	describe("#add()", () => {
		let tetra

		beforeEach(() => {
			tetra = Tetraminos()
		})

		it("should return false (piece attribute already assign)", () => {
			board.piece = tetra
			expect(board.add()).to.be.false
		})

		it("should add a tetraminos to the board", () => {
			const value = board.add(tetra)
			expect(value).to.be.true
		})

		it("should return false (Tetraminos not placeable()", () => {
			let shouldNotBeAddable = new Tetraminos()

			expect(board.add(tetra)).to.be.true
			board.piece = undefined
			expect(board.add(shouldNotBeAddable)).to.be.false
		})
	})

	describe("#setMalus", () => {
		let tetra
		beforeEach(() => {
			tetra = Tetraminos()
		})

		it('should return true (mallus added at end of the board)', () => {
			const value = board.setMalus()

			expect(value).to.be.true
			expect(board.map[19].find(el => el === '.')).to.be.undefined
		})

		it('should return false (mallus not addable)', () => {
			for (let i = 0; i < board.map.length; i++) {
				if (!board.setMalus())
					throw new Error("Should not be false (check i)")
			}
			expect(board.setMalus()).to.be.false
		})

		it("should return true (Replace the piece)", () => {
			board.add(tetra)
			expect(board.setMalus()).to.be.true
		})

		it('trigger display event listener', (done) => {
			let i = 0;
			eventEmitter.on('display', (data) => {
				if (i === 1) {
					expect(data).to.be.eql(board.map)
					done()
				}
				i++
			})
			board.add(tetra)
			expect(board.setMalus()).to.be.true
		})

		it('trigger display event listener mode as false', (done) => {
			let i = 0;
			eventEmitter.on('display', (data) => {
				if (i === 1) {
					utils.remove(board.map, board.piece, board.x, board.y)
					expect(data).to.be.eql(board.map)
					done()
				}
				i++
			})
			board.mode = true
			board.add(tetra)
			expect(board.setMalus()).to.be.true
		})
	})

	describe("#place()", () => {
		it("should return false (piece attr is undefined)", () => {
			expect(board.place()).to.be.false
		})

		it('should return true', (done) => {
			eventEmitter.on('display', (data) => {
				expect(data).to.be.an('array')
				done()
			})
			board.piece = Tetraminos()
			expect(board.place()).to.be.true
			expect(board.piece).to.be.undefined
		})
	})

	describe("#down()", () => {
		let tetra
		beforeEach(() => {
			tetra = Tetraminos()
			board.add(tetra)
		})

		it('should return false (piece is undefined)', () => {
			board.piece = undefined
			expect(board.down()).to.be.false
		})

		it("should return true and trigger event listener (mode as false)", (done) => {
			eventEmitter.on('display', (data) => {
				expect(data).to.be.an('array')
				done()
			})

			const y = board.y
			expect(board.down()).to.be.true
			expect(y).to.be.eql(y -1)
		})

		it("should return true and trigger event listener (mode as true)", (done) => {
			eventEmitter.on('display', (data) => {
				expect(data).to.be.an('array')
				done()
			})

			const y = board.y
			board.mode = true
			expect(board.down()).to.be.true
			expect(y).to.be.eql(y -1)
		})

	})

	describe("#left()", () => {
		let tetra

		beforeEach(() => {
			tetra = Tetraminos()
			board.add(tetra)
		})

		it('should return false (piece is undefined)', () => {
			board.piece = undefined
			expect(board.left()).to.be.false
		})

		it("should return true and trigger event listener (mode as false)", (done) => {
			eventEmitter.on('display', (data) => {
				expect(data).to.be.an('array')
				done()
			})

			let x = board.x
			expect(board.left()).to.be.true
			x--
			expect(board.x).to.be.eql(x)
		})

		it("should return true and trigger event listener (mode as true)", (done) => {
			eventEmitter.on('display', (data) => {
				expect(data).to.be.an('array')
				done()
			})

			let x = board.x
			board.mode = true
			expect(board.left()).to.be.true
			x--
			expect(board.x).to.be.eql(x)
		})

		it("should return false (can't move piece to the left)", () => {
			for (let i = 0; i < 5; i++) {
				board.left()
			}

			expect(board.left()).to.be.false
		})
	})

	describe("#right()", () => {
		let tetra

		beforeEach(() => {
			tetra = Tetraminos()
			board.add(tetra)
		})

		it('should return false (piece is undefined)', () => {
			board.piece = undefined
			expect(board.right()).to.be.false
		})

		it("should return true and trigger event listener (mode as false)", (done) => {
			eventEmitter.on('display', (data) => {
				expect(data).to.be.an('array')
				done()
			})

			let x = board.x
			expect(board.right()).to.be.true
			expect(board.x).to.be.equal(x)
		})

		it("should return true and trigger event listener (mode as true)", (done) => {
			eventEmitter.on('display', (data) => {
				expect(data).to.be.an('array')
				done()
			})

			const x = board.x

			board.mode = true
			expect(board.right()).to.be.true
			expect(board.x).to.be.eql(x + 1)
		})

		it("should return false (can't move piece to the right)", () => {
			for (let i = 0; i < 5; i++) {
				board.right()
			}

			expect(board.right()).to.be.false
		})
	})

	describe("#rotate()", () => {
		let tetra

		beforeEach(() => {
			tetra = JSON.parse(JSON.stringify(shape.Bar))
			board.add(tetra)
		})

		it("should return false (piece as undefined", () => {
			board.piece = undefined
			expect(board.rotate()).to.be.false
		})

		it("should return return false (piece not mergeable)", () => {

		})

		it('should return true and trigger listener (mode as false)', (done) => {
			eventEmitter.on('display', (data) => {
				expect(data).to.be.an('array')
				done()
			})
			expect(board.rotate()).to.be.true
		})

		it('should return true and trigger listener (mode as true)', (done) => {
			eventEmitter.on('display', (data) => {
				expect(data).to.be.an('array')
				done()
			})
			board.mode = true
			expect(board.rotate()).to.be.true
		})
	})

	describe("#verify()", () => {
		it("should return the number of line remove", () => {
			board.map[19].forEach((v, k) => {
				board.map[19][k] = 'X'
			})
			const value = board.verify()
			expect(value).to.be.equal(1)
		})

		it("should return zero (no line removable", () => {
			const value = board.verify()
			expect(value).to.be.equal(0)
		})
	})

	describe("#start()", () => {
		it("should trigger add event", (done) => {
			eventEmitter.on('add', () => { done() })
			board.start()
		})

		it("should trigger mallus event", (done) => {
			sinon.stub(Board.prototype, 'verify').callsFake(() => true)
			eventEmitter.on('mallus', () => { done() })
			board.start()
		})

		it("should trigger display event", (done) => {
			eventEmitter.on('display', () => done() )
			board.start()
		})
	})
})
