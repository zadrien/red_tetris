import expect from 'expect.js'

import Profil from './Profil'
import { onPlayerName, emitPlayer, onPlayer, onErrorName } from '../actions/Profil'

describe('Profil reducer BDD', () => {
  let res
  describe('reducers behavior without parameters', () => {
	it("should return an empty object", () => {
	  expect(Profil({}, {})).to.be.empty()
	})
  })


  describe("reducers behavior with #onPlayerName() action", () => {
	it('should return return an object with user property', () => {
	  expect(Profil({}, {
		state: 'NEW',
		result: {
		  name: 'testName'
		}
	  })).to.be.eql({
		menu: 'LISTING',
		user: {
		  name: 'testName'
		}
	  })
	})

	it('should return an object with user ERROR property', () => {
	  expect(Profil({}, {
		state: 'NEW',
		result: {
		  err: 'failed'
		}
	  })).to.be.eql({
		user: {
		  err: 'failed'
		}})
	})
  })
})
