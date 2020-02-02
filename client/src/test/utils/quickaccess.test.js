import { expect } from 'chai'

import quickAccess from '../../utils/quickAccess'

describe('quickAccess Unit Test', () => {
	it('should dispatch emitPlayer action', () => {
		const hash = '#roomID[testName]'
		const dispatch = (e) => {
			expect(e).to.eql({
			emit: true,
			event: "login",
			payload: {
				name: 'testName',
				room: {
					id: 'roomID'
				   }
			}})
		}
		quickAccess(dispatch, hash)
  })

	it('should return an error (for wrong hash value)', () => {
		const hash = '#roomID2222[XDASqqqqq'
		expect(() => {
			quickAccess((e) => {}, hash)
		}).to.throw("Invalid URL")
  	})

	it('should return an error (no hash value)', () => {
		const hash = ''
		expect(() => {
			quickAccess((e) => {}, hash)
		}).to.throw("Invalid URL")
  	})
})
