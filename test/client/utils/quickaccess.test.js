import quickAccess from '../../../src/client/utils/quickAccess'
import { emitPlayer } from '../../../src/client/actions/Profil'

describe('quickAccess Unit Test', () => {
	
	it('should dispatch emitPlayer action', () => {
		const hash = '#roomID[testName]'
		const dispatch = jest.fn()
		
		quickAccess(dispatch, hash)
		expect(dispatch).toHaveBeenCalledTimes(1)
		expect(dispatch).toHaveBeenCalledWith(emitPlayer('testName', { id: "roomID"}))
  })

	it('should return an error (for wrong hash value)', () => {
		const hash = '#roomID2222[XDASqqqqq'
		const dispatch = jest.fn()
		expect(() => quickAccess(dispatch, hash)).toThrow("Invalid URL")

  	})

	it('should return an error (no hash value)', () => {
		const hash = ''
		const dispatch = jest.fn()
		expect(quickAccess(dispatch, hash)).toBe.false
		expect(dispatch).toHaveBeenCalledTimes(0)
  	})
})
