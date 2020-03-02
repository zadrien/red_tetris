import React from 'react'
import { Provider } from 'react-redux'

import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'

import GameOver from '../../../../../src/client/components/Room/Overlay/GameOver'

const mockStore = configureStore([])

describe("GameOver Overlay", () => {
	let store, component
	const rendererComponent = (store) => {
		return renderer.create(
			<Provider store={store}>
				<GameOver/>
			</Provider>
		)
	}

	const getStore = (state) => mockStore(state)

	it('should render (winner as true', () => {
		store = getStore({room: { winner: true }})
		component = rendererComponent(store)
		const testInstance = component.root

		expect(component.toJSON()).toMatchSnapshot()
		expect(testInstance.findByProps({className: 'title big'}).children).toEqual(["GAME OVER"])
		expect(testInstance.findByProps({className: "title medium"}).children).toEqual(["You won"])
	})

	it('should render (winner as false)', () => {
		store = getStore({room: { winner: false }})
		component = rendererComponent(store)
		const testInstance = component.root

		expect(component.toJSON()).toMatchSnapshot()
		expect(testInstance.findByProps({className: 'title big'}).children).toEqual(["GAME OVER"])
		expect(testInstance.findByProps({className: "title medium"}).children).toEqual(["You lost"])
	})

})