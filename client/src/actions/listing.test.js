import { expect } from 'chai'

import  { onFetch, emitFetch, onPrev, onNext, emitJoin, onCreation, onPing } from './Listing.js'


describe("Listing's action Unit Test", () => {
  let res

  describe('#onFetch()', () => {
	it('should return an object', () => {
	  res = onFetch()
	  expect(res).to.have.property('state', 'FETCH')
	})
  })

  describe('#emitFetch()', () => {
	it('should return an object', () => {
	  res = emitFetch()
	  expect(res).to.have.property('emit', true)
	})
  })

  describe('#onPrev()', () => {
	it('should return an object', () => {
	  let nbr = 10
	  res = onPrev(nbr)
	  expect(res).to.have.property('state', 'PREV')
	  expect(res).to.have.property('nbr', nbr)
	})
	
  })

  describe('#onNext()', () => {
	it('should return an object', () => {
	  let nbr = 5
	  res = onNext(nbr)
	  expect(res).to.have.property('state', 'NEXT')
	  expect(res).to.have.property('nbr', nbr)
	})		
  })

  describe('#emitJoin()', () => {
	it('should return an object', () => {
	  let user = {
		name: 'testName'
	  }
	  let room = {
		name: 'testRoom',
		id: 'testID'
	  }
	  res = emitJoin(user, room)
	  expect(res).to.have.property('emit', true)
	  expect(res).to.have.property('event', 'JOIN')
	  expect(res.payload).to.have.property('user', user)
	  expect(res.payload).to.have.property('room', room)
	})		
  })
  
	describe('#onCreation()', () => {
		it('should return an object', () => {
			res = onCreation()
			expect(res).to.have.property('event', 'CREATION')
			expect(res).to.have.property('type', 'LISTING')
			expect(res).to.have.property('handle', 'LISTING')
			expect(res).to.have.property('state', 'CREATE')
		})
	})

	describe('#onPing()', () => {
		it('should return an object', () => {
			res = onPing()

			expect(res).to.have.property('type', 'LISTING')
			expect(res).to.have.property('handle', 'LISTING')
			expect(res).to.have.property('event', 'CHECK')
			expect(res).to.have.property('state', 'CHECK')
		})
	})
})
