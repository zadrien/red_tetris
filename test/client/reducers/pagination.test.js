import { expect } from 'chai'

import { Pagination } from '../../../src/client/reducers/Pagination'
import { CURSOR_NEXT, CURSOR_PREV, CURSOR_REFRESH } from '../../../src/client/actions/Pagination'

describe('Pagination TDD', () => {
	const state = {
		rooms: {
			list: [
				{ name: "testRoom#0" },
				{ name: "testRoom#1" },
				{ name: "testRoom#2" },
				{ name: "testRoom#3" },
				{ name: "testRoom#4" },
				{ name: "testRoom#5" },
				{ name: "testRoom#6" },
				{ name: "testRoom#7" },
				{ name: "testRoom#8" },
				{ name: "testRoom#9" }
			]
		}
	}

	it('should return index at 7 element', () => {
		let cursor = {
			i: 0,
			pad: 7
		}
		expect(Pagination({
			cursor,
			...state
		}, CURSOR_NEXT())).to.have.property('cursor').eql({ i: 7, pad: 7})
	})

	it('should stay at index 7th', () => {
		let cursor = {
			i: 7,
			pad: 7
		}
		expect(Pagination({
			cursor,
			...state
		}, CURSOR_NEXT())).to.have.property('cursor').eql({ i: 7, pad: 7})
	})

	it('should go back at index 0', () => {
		let cursor = {
			i: 7,
			pad: 7
		}
		expect(Pagination({
			cursor,
			...state
		}, CURSOR_PREV())).to.have.property('cursor').eql({ i: 0, pad: 7})
	})

	it('should stay at index 0', () => {
		let cursor = {
			i: 0,
			pad: 7
		}
		expect(Pagination({
			cursor,
			...state
		}, CURSOR_PREV())).to.have.property('cursor').eql({ i: 0, pad: 7})
	})

	it('should go back at index 0', () => {
		let cursor = {
			i: 7,
			pad: 7
		}
		expect(Pagination({
			cursor,
			...state
		}, CURSOR_REFRESH())).to.have.property('cursor').eql({ i: 0, pad: 7})
	})
})