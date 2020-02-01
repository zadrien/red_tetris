import quickAccess from './quickAccess'

import { expect } from 'chai'

describe('quickAccess Unit Test', () => {
  const location = {
	href: `http://localhost:3000/#roomID[testName]`,
	hash: `#roomID[testName]`
  }

  it('should return true', () => {
	  const dispatch = () => {}
	  expect(quickAccess(dispatch, location)).to.be.true
  })

  it('should dispatch emitPlayer action', () => {
	  const dispatch = (e) => {
		   expect(e).to.have.property('payload', {
			   	name: 'testName',
				room: {
					id: 'roomID'
				}
			  }
			)
	  }

	  quickAccess(dispatch, location)
  })
		   
})
