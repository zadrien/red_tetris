import { expect } from 'chai'

import  { onFetch, emitFetch, onPrev, onNext, emitJoin, onPing, LISTING } from '../../actions/Listing.js'


describe("Listing's action Unit Test", () => {

	describe('#onFetch()', () => {
		it('should return an object', () => {
			expect(onFetch()).to.be.eql({ event: "FETCH", handle: LISTING, state: "FETCH"})
		})
	})

	describe('#emitFetch()', () => {
		it('should return an object', () => {
			expect(emitFetch("test")).to.be.eql({emit: true, event: "FETCH", handle: LISTING, payload: "test", state: "FETCH"})
		})
	})

	describe('#onPrev()', () => {
		it('should return an object', () => {
			expect(onPrev(10)).to.be.eql({ type: "LISTING", state: "PREV",  nbr: 10})
		})
	})

	describe('#onNext()', () => {
		it('should return an object', () => {
			expect(onNext(5)).to.be.eql({ type: "LISTING", state: "NEXT",  nbr: 5})
		})		
	})

	describe('#emitJoin()', () => {
		it('should return an object', () => {
			const user = { name: 'testName' }
			const room = {
				name: 'testRoom',
				id: 'testID'
			}
			expect(emitJoin(user, room)).to.be.eql({emit: true, event: "JOIN", payload: { user, room}})
		})	
	})

	describe('#onPing()', () => {
		it('should return an object', () => {
			expect(onPing()).to.be.eql({type: "LISTING", handle: LISTING, event: "CHECK", state: "CHECK"})
		})
	})
})
