import { expect } from 'chai'
import Board from '../../src/Game/Board'
import Tetraminos from '../../src/Game/tetraminos'

const events = require('events')

describe("board unit test", function () {
	let board, piece
	let eventEmitter
	
	before(function() {
		eventEmitter = new events.EventEmitter()		
		board = new Board(eventEmitter, false)
		piece = Tetraminos()
	})

	describe("Board information", () => {
		describe("#get()", function() {
			it("should return an array", function() {
				var arr = board.get()
				expect(arr).to.be.an('array')
			})
		})
	})
	
	describe("tetraminos moving down", () => {
		describe("#add()", function() {
			it("should return true", () => {
				expect(board.add(piece)).to.be.equal(true)
			})
			
			it("should not be possible to add another piece", () => {
				let res = board.add(piece)
				expect(res).to.be.equal(false)
			})
		})
	})

	describe("tetraminos moving to the left", () => {
		describe("#left()", () => {
			it("should move to the left", () => {
				let x = board.x
				board.left()
				expect(board.x).to.be.equal(x -1)
			})

			it("should move to the left side of the board", () => {
				for (; board.left()!== false;) {
				}
				expect(board.left()).to.be.equal(false)
			})
		})
	})
	
	describe("tetraminos moving to the right", () => {
		describe("#right()", function () {
			it("should move to the right", function () {
				let x = board.x
				board.right()
				expect(board.x).to.be.equal(x + 1)
			})

			it("should move to the right side of the board", () => {
				for(; board.right() !== false;) {
				}
				expect(board.right()).to.be.equal(false)
			})
		})
	})


	describe("#tetraminos rotation", function() {
		describe("#rotate()", function () {
			it("should return true", function () {
				expect(board.rotate()).to.be.equal(true)
			})
		})
	})

	describe("tetraminos moving down", () => {
		describe("moving one down", () => {
			describe("#down()", () => {
				it("should return true", () => {
					expect(board.down()).to.be.equal(true)
				})
			})
		})
		
		describe("place directly the tetraminos to the bottom of the board", () => {
			describe("#place()", () => {
				it("should return true", () => {
					expect(board.place()).to.be.equal(true)
				})
			})
		})

	})

	describe("add a malus to the board", () => {
		describe("#setMallus()", () => {
			it("should return true", () => {
				expect(board.setMalus()).to.be.equal(true)
			})
		})
	})
	
	describe("Tetsting Board emitter", () => {		
		describe("#start()", () => {
			
			it("return true", () => {
				expect(board.start()).to.be.equal(true)
				if (!board.itr)
					expect.fail("undefined variable (should be set)")
			})
			
		})

		describe("display event", (done) => {
			it("should get display event", (done) => {
				eventEmitter.on('display', () => {
					done()
				})	
			})
		})
		
		describe("#stop()", () => {
			it("should stop the game", () => {
				board.stop()
				if(board.itr) {
					expect.fail("should be undefined")
				}
			})
		})
		
	})
})
