import { expect } from 'chai'

import Listing from '../../reducers/Listing'

describe('Listing\'s Reducer BDD', () => {
  describe('Reducer without parameters', () => {
	it('should return an empty state', () => {
	  expect(Listing()).to.be.an('Object').to.be.empty
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
		const state = {
			rooms: {
				list: [
					{ id: 1, name: '1' }
				]
			}
		}
		
		const action = { state: 'FETCH', result: { rooms: [{id: 2, name: '2'} ] } }

		const expectedValue = {
			rooms: {
				list: [
					{ id: 1, name: '1' },
					{ id: 2, name: '2' }
				]
			  }
		}
	  expect(Listing(state, action)).to.be.eql(expectedValue)
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
