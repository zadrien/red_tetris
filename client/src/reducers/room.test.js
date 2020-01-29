import expect from 'expect.js'

import Room from './Room'

describe('Room\'s Reducer BDD', () => {
	let res, expectedValue
	let state = {
		user: {
			name: 'testName'
		},
		room: {
			id: 1,
			name: 'testName',
			mode: 'classic'
		}
	}
	
	describe('Reducer without parameters', () => {
		it('should return an empty state', () => {
			res = expect(Room()).to.be.empty()
		})
	})
	
	describe('JOINED case', () => {
		it('should return an object with menu and room property', () => {
			res = Room({ user : { name: 'testName' }}, {
				state: 'JOINED',
				result: {
					room: {
						id: 1,
						name: 'testName',
						mode: 'classic'
					}
				}
			})
			
			expectedValue = {
				menu: 'ROOM',
				user: {
					name: 'testName'
				},
				room: {
					id: 1,
					name: 'testName',
					mode: 'classic'
				}
			}
			
			expect(res).to.be.eql(expectedValue)
		})
	})
	
	describe('START case', () => {
		it('should return an object with start property', () => {
			res = Room(state, {
				state: 'START',
				result: {
					start: true
				}
			})

			expectedValue = {
				id: 1,
				name: 'testName',
				mode: 'classic',
				start: true
			}

			expect(res.room).to.be.eql(expectedValue)
		})
	})
	
	describe('DISPLAY case', () => {
		it('should return object with display property ', () => {
			res = Room(state, {
				state: 'DISPLAY',
				result: [
					['.', '.'],
					['.', '.']
				]
			})
			
			expectedValue = {
				id: 1,
				name: 'testName',
				mode: 'classic',
				display: [
					['.', '.'],
					['.', '.']
				]
			}
			
			expect(res.room).to.be.eql(expectedValue)
		})
	})
	
	describe('HOST case', () => {
		it('should return an object with host property', () => {
			res = Room(state, {
				state: 'HOST',
				result: {
					host: true
				}
			})
					   
			expectedValue = {
				id: 1,
				name: 'testName',
				mode: 'classic',
				host: true
			}

			expect(res.room).to.have.property('host', true)
			expect(res.room).to.be.eql(expectedValue)

		})
	})
	
	describe('PLAYERS case', () => {
		it('should return an object with players property', () => {
			res = Room(state, {
				state: 'PLAYERS',
				result: [
					{ id: 3, name: 'user3'},
					{id: 2, name: 'user2' }
				]
			})
			
			expectedValue = {
				id: 1,
				name: 'testName',
				mode: 'classic',
				players: [
					{ id: 3, name: 'user3'},
					{id: 2, name: 'user2' }
				]
			}
			
			expect(res.room).to.be.eql(expectedValue)
		})
	})
	
	describe('GAMEOVER case', () => {
		it('should return an object with winner property as true (Winner of the Lobby', () => {
			res = Room(state, {
				state: 'GAMEOVER',
				result: {
					winner: 'testName'
				}
			})
			
			expectedValue = {
				id: 1,
				name: 'testName',
				mode: 'classic',
				winner: true
			}
			
			expect(res.room).to.be.eql(expectedValue)
		})

		it('should return an object with winner property as false (loser of the Room)', () => {

			res = Room(state, {
				state: 'GAMEOVER',
				result: {
					winner: "Someone Else"
				}
			})
			
			expectedValue = {
				id: 1,
				name: 'testName',
				mode: 'classic',
				winner: false
			}
			
			expect(res.room).to.be.eql(expectedValue)
		})
	})
	
	describe('RESET case', () => {
		it('should return an object with no winner property', () => {
			let snapShotState = {
				room: {
					id: 1,
					name: 'testName',
					mode: 'classic',
					winner: true
				}
			}
			
			res = Room(snapShotState, { state: 'RESET' })
			
			expectedValue = {
				id: 1,
				name: 'testName',
				mode: 'classic'
			}

			expect(res.room).to.be.eql(expectedValue)
		})
	})
	
	describe('QUIT case', () => {
		it('should return an undefined room property and menu property', () => {
			res = Room(state, { state: 'QUIT' })

			expectedValue = {
				menu: 'LISTING',
				room: undefined
			}
		})
	})
})
