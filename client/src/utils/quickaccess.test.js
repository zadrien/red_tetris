import { assert } from 'chai'

import quickAccess from './quickAccess'

describe('quickAccess Unit Test', () => {
  let res
  let testURL = {
	href: `http://localhost:3000/#roomID[testName]`,
	pathname: `/#roomID[testName]`
  }
  const dispatch = () => {}
  
  describe('#quickAccess()', () => {
	it('should return a undefined', () => {
	  assert.isUndefined(quickAccess(dispatch), 'return is defined')
	})
	
	
	it('should return regexp', () => {
	  res = quickAccess(store, testURL)
	  console.log(res)
	  assert.isString(res, 'return is not a string')
	})
  })
		   
})
