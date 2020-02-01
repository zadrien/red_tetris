import { expect } from 'chai'

import {ROOM, onJoined, onDisplay, onHost, onPlayers, onStart, emitStart, emitMove, startGame, onGameOver, emitQuit, onQuit, winValidate } from './Room'

describe('', () => {
  let res
  
  describe('#onJoined()', () => {
	it('should return an object', () => {
	  res = onJoined()

	  expect(res).to.have.property('event', 'JOINED')
	  expect(res).to.have.property('handle', ROOM)
	  expect(res).to.have.property('state', 'JOINED')
	})
  })
  
  describe('#onDisplay()', () => {
	it('should return an object', () => {
	  res = onDisplay()

	  expect(res).to.have.property('event', 'DISPLAY')
	  expect(res).to.have.property('handle', ROOM)
	  expect(res).to.have.property('state', 'DISPLAY')
	})
  })
  
  describe('#onHost()', () => {
	it('should return an object', () => {
	  res = onHost()

	  expect(res).to.have.property('event', 'HOST')
	  expect(res).to.have.property('handle', ROOM)
	  expect(res).to.have.property('state', 'HOST')
	})
  })
  
  describe('#onPlayers()', () => {
	it('shoudl return an object', () => {
	  res = onPlayers()

	  expect(res).to.have.property('event', 'PLAYERS')
	  expect(res).to.have.property('handle', ROOM)
	  expect(res).to.have.property('state', 'PLAYERS')
	})
  })
		   
  describe('#onStart()', () => {
	it('shoudl return an object', () => {
	  res = onStart()

	  expect(res).to.have.property('event', 'START')
	  expect(res).to.have.property('handle', ROOM)
	  expect(res).to.have.property('state', 'START')
	})
  })
  
  describe('#emitStart()', () => {
	it('shoudl return an object', () => {
	  let id = 1
	  res = emitStart(id)

	  expect(res).to.have.property('emit', true)
	  expect(res).to.have.property('event', 'START')
	  expect(res).to.have.property('payload', id)
	})
  })
  
  describe('#emitMove()', () => {
	it('shoudl return an object', () => {
	  let move = 'LEFT'
	  res = emitMove(move)

	  expect(res).to.have.property('event', 'CONTROLLER')
	  expect(res).to.have.property('emit', true)
	  expect(res).to.have.property('payload', move)
	})	
  })
  
  describe('#startGame()', () => {
	it('should return an object', () => {
	  let start = true
	  res = startGame(start)

	  expect(res).to.have.property('type', ROOM)
	  expect(res).to.have.property('state', 'START')
	  expect(res).to.have.property('start', true)
	})
  })
  
  describe('#onGameOver()', () => {
	it('should return an object', () => {
	  res = onGameOver()

	  expect(res).to.have.property('event', 'GAMEOVER')
	  expect(res).to.have.property('handle', ROOM)
	  expect(res).to.have.property('state', 'GAMEOVER')
	})
  })
  
  describe('#emitQuit()', () => {
	it('should return an object', () => {
	  let room = { roomID: 1, roomName: "testRoom" }
	  res = emitQuit(room)

	  expect(res).to.have.property('emit', true)
	  expect(res).to.have.property('event', 'LEAVE')
	  expect(res).to.have.property('payload', room)
	})
  })
  
  describe('#onQuit()', () => {
	it('should return an object', () => {
	  res = onQuit()

	  expect(res).to.have.property('event', 'LEAVE')
	  expect(res).to.have.property('handle', ROOM)
	  expect(res).to.have.property('state', 'QUIT')
	})
  })
  
  describe('#winValidate()', () => {
	it('should return an object', () => {
	  res = winValidate()

	  expect(res).to.have.property('type', ROOM)
	  expect(res).to.have.property('state', 'RESET')
	  expect(res).to.have.property('reset', true)
	})
  })
})
