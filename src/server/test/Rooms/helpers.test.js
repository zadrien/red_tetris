import { isPlaying } from '../../src/rooms/helpers'
import { expect } from 'chai'

describe("rooms Helpers TDD", () => {
	const obj = {
		"1" : { isPlaying: true },
		"2": { isPlaying: false },
		"3": { isPlaying: false },	
	}

	it("should return undefined (Empty Object)", () => {
		expect(isPlaying(undefined)).to.be.undefined
	})

	it("should return an object (Valid Object)", () => {
		const value = isPlaying(obj)
		expect(value).to.not.be.undefined
		expect(value).to.be.an('object')
	})

	it("should return Object (Valud Object)", () => {
		const data = {
			"1": { isPlaying: false },
			"2": { isPlaying: false },
			"3": { isPlaying: false },	
		}
		expect(isPlaying(data)).to.be.undefined
	})

})