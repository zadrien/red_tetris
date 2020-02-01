import { expect } from 'chai'

import Profil from './Profil'

describe('Profil reducer BDD', () => {
  let res
  describe('reducers behavior without parameters', () => {
	it("should return an empty object", () => {
	  expect(Profil({}, {})).to.be.an('Object').that.is.empty
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
