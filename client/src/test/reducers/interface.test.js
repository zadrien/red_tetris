import { expect } from 'chai'

import Interface from '../../reducers/Interface'

describe('Interface Reduce BDD', () => {
  describe('Reducer without parameter', () => {
	it('should return an empty object', () => {
	  expect(Interface()).to.be.an('Object').that.is.empty
	})
  })

  describe('Reducer Menu case', () => {
	it('should return an object with menu property', () => {
	  expect(Interface({}, {
		state: 'MENU',
		menu: 'testMenu'
	  })).to.be.eql({
		menu: 'testMenu'
	  })
	})
  })

  describe("Reducer CREATE case", () => {
	it('should return an object with create property', () => {
	  expect(Interface({}, {
		state: 'CREATE',
		bool: true
	  })).to.be.eql({
		create: true
	  })
	})

	it('should remove create property', () => {
	  expect(Interface({ create: true }, { state: 'CREATE' })).to.be.eql({})
	})
  })
})
