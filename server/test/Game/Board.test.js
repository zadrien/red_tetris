import { expect } from 'chai'
import Board from '../../src/Game/Board'
import Tetraminos from '../../src/Game/tetraminos'

import sinon from 'sinon'
const events = require('events')

describe('board unit test2', () => {
	let board, piece, eventEmitter

	beforeEach(() => {
		eventEmitter = new events.EventEmitter()
		board = new Board(eventEmitter, false)
	})

	afterEach(() => {
		board.stop()
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

		it("should return iterator positive", () => {
			expect(!board.star()).to.be.below(0)
		})
	})

	describe("#get()", () => {
		it("should return return map Array", () => {
			expect(board.get()).to.be.equal(board.map)
		})
	})

	describe("#add()", () => {
		it("should return false (no tetras minos parameter)", () => {
			expect(board.add()).to.be.false
		})

		beforeEach(() => {
			const tetra = new Tetraminos()
		})

		it("should add a tetraminos to the board", () => {
			expect(board.add(tetra)).to.be.true
		})

		it("should return false (Tetraminos not placeable()", () => {
			let shouldNotBeAddable = new Tetraminos()

			expect(board.add(tetra)).to.be.true
			expect(board.add(shouldNotBeAddable)).to.be.false
		})
	})

	describe("#setMalus", () => {
		beforeEach(() => {
			const tetra = new Tetraminos()
		})

	})
})
