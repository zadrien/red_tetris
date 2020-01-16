import expect from 'expect.js'

import { onPlayerName, emitPlayer, onPlayer, onErrorName } from './Profil'


describe('Profil\'s action Unit Test', () => {
  let res
  let name = 'testName'
  let room = {
	id: 'testID'
  }
  describe('#onPlayerName', () => {
	it('shoudl return an object', () => {
	  res = onPlayerName(name)

	  expect(res).to.have.property('type', 'PROFIL')
	  expect(res).to.have.property('state', 'NEW')
	  expect(res).to.have.property('name', name)
	})
  })
  
  describe('#emitPlayer()', () => {
	it('shoudl return an object', () => {
	  res = emitPlayer(name)

	  expect(res).to.have.property('emit', true)
	  expect(res).to.have.property('event', 'login')
	  expect(res.payload).to.have.property('name', name)
	})

	it('should return an object with room & user payload', () => {
	  res = emitPlayer(name, room)

	  expect(res.payload).to.have.property('name', name)
	  expect(res.payload).to.have.property('room', room)
	})
  })
  
  describe('#onPlayer()', () => {
	it('shoudl return an object', () => {
	  res = onPlayer()

	  expect(res).to.have.property('event', 'login')
	  expect(res).to.have.property('handle', 'PROFIL')
	  expect(res).to.have.property('state', 'NEW')
	})
  })
  
  describe('#onErrorName()', () => {
	it('shoudl return an object', () => {
	  let err = "fail OK"
	  res = onErrorName(err)

	  expect(res).to.have.property('type', 'PROFIL')
	  expect(res).to.have.property('state', 'ERROR')
	  expect(res).to.have.property('err', err)

	})
  })
})
