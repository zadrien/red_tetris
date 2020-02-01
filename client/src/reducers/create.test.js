import { expect } from 'chai'

import Create from './Create'

describe('Create\'s Reduce BDD', () => {
  describe('Reducer without parameters', () => {
	it('should return an empty object', () => {
	  expect(Create()).to.be.an('Object').that.is.empty
	})
  })

  describe('Reducer CREATING case', () => {
	it('should return an object with isCreating property as true', () => {
	  expect(Create({}, { state: 'CREATING'})).to.be.eql({ isCreating: true })
	})
  })

  describe('Reducer CREATE case', () => {
	it('should return an object with isCreating property as false', () => {
	  expect(Create({}, { state: 'CREATE'})).to.be.eql({ isCreating: false })
	})
  })
})
