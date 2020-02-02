import { expect } from 'chai'

import Listing from '../../reducers/Listing'

describe('Listing\'s Reducer BDD', () => {
  describe('Reducer without parameters', () => {
	it('should return an empty state', () => {
	  expect(Listing()).to.be.an('Object').that.is.empty
	})
  })
  
  describe('Reducer\'s FETCH case', () => {
	it('should return an object with rooms property', () => {
	  expect(Listing({}, {
		state: 'FETCH',
		result: {
		  rooms: [{ name: 'testName'}]
		}})).to.be.eql({ rooms: { list: [{ name: 'testName' }] }})		 
	})

	it('should return an object with 2 rooms append in rooms property', () => {
	  expect(Listing({ rooms: { list: [ { name: '1' } ] }}, { state: 'FETCH', result: { rooms: [{name: '2'} ] }}))
		.to.be.eql({
		  rooms: {
			list: [ { name: '1' }, { name: '2' }]
		  }
		})
	})
  })
  
  describe('Reducer\'s JOINING case', () => {
	it('should return isJoining property', () => {
	  expect(Listing({}, { state: 'JOINING', roomID: 1 })).to.be.eql({ rooms: { isJoining: 1 }})
	})

	it('should return an object without isJoining Property', () => {
	  expect(Listing({ rooms: { isJoining: 1}}, { state: 'JOINING', result: { success: true } }))
		.to.be.eql({ rooms: {} })
	})
	
	it('should return an err property', () => {
	  expect(Listing({}, { state: 'JOINING', result: { err : "failed to join room"}}))
		.to.be.eql({ rooms: { isJoining: { err: "failed to join room" } }})
	})
  })
  
  describe('Reducer\'s CREATE case', () => {
	it('should return an object with isCreating property', () => {
	  expect(Listing({}, { state: 'CREATE', bool: true })).to.be.eql({ isCreating: true })
	})

	it('should return an object with isCreating as false', () => {
		expect(Listing({}, { state: 'CREATE', result: { err: 'failed creating' }}))
			.to.be.eql({ isCreating: { status: false, err: 'failed creating'}})
	})
  })
  
  describe('Reducer\'s CHECK case', () => {
	it('should update room-3 status', () => {
	  expect(Listing({rooms: {
		list: [ {id: 1, name: 'room-1', nbrUser: 1},
				{id: 2, name: 'room-2', nbrUser: 4},
				{id: 3, name: 'room-3', nbrUser: 6},
				{id: 4, name: 'room-4', nbrUser: 2},
			  ]
	  }}, { state: 'CHECK',
			result:
			  {  room: { id: 3,
						 name: 'room-3',
						 nbrUser: 2
					   }
			  }
		  }))
		.to.be.eql({ rooms: {
		  list: [ {id: 1, name: 'room-1', nbrUser: 1},
				  {id: 2, name: 'room-2', nbrUser: 4},
				  {id: 3, name: 'room-3', nbrUser: 2},
				  {id: 4, name: 'room-4', nbrUser: 2}
				]}})
	  
	})
  })
  
})
