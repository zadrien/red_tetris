import { expect } from 'chai'

import { isCreating, onCreation, emitCreate } from '../../actions/Create'

describe('Create\'s action Unit Test', () => {
  let res
  
  describe('#isCreating()', () => {
	it('should return an object', () => {
	  res = isCreating()
	  expect(res).to.have.property('type', 'CREATE')
	  expect(res).to.have.property('state', 'CREATING')
	})
  })

  describe('#onCreation()', () => {
	it('should return an object', () => {
	  res = onCreation()

	  expect(res).to.be.an('object')
	  expect(res).to.have.property('handle', 'CREATE')
	  expect(res).to.have.property('event', 'CREATED')
	  expect(res).to.have.property('state', 'CREATE')
	})
  })

  describe('#emitCreate', () => {
	it('should return an object', () => {
	  let form = {
		name: 'testName',
		mode: 'classic'
	  } 
	  res = emitCreate(form)

	  expect(res).to.be.an('object')
	  expect(res).to.have.property('emit', true)
	  expect(res).to.have.property('event', 'JOIN')
	  expect(res).to.have.property('payload', form)
	})
  })
})
