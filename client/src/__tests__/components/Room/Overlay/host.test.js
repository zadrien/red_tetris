import React from 'react'

import {Provider} from 'react-redux'
import Host from '../../../../components/Room/Overlay/Host'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import { emitStart, onDisplay, onPlayers, startGame } from '../../../../actions/Room'

const mockStore = configureStore([])

describe('Host Component', () => {
	let component

	const renderComponent = (store) => {
		return renderer.create(
			<Provider store={store}>
				<Host />
			</Provider>
		)
	}

	const mock = (state) => {
		return mockStore(state)
	}

	it('should render (Host as true)', () => {
		const state = {
			room: {
				host: true,
				start: false,
				id: 1
			}
		}
		component = renderComponent(mock(state))
		const testInstance = component.root
		expect(component.toJSON()).toMatchSnapshot();
		expect(testInstance.findByProps({className: "title big"}).children).toEqual(["Ready ?"])
	})

	it('should render (Host as false)', () => {
		const state = {
			room: {
				host: false,
				id: 1
			}
		}
		component = renderComponent(mock(state))
		const testInstance = component.root
		expect(component.toJSON()).toMatchSnapshot();
		expect(testInstance.findByProps({className: "title medium"}).children).toEqual(["Pending..."])
	})

	it('shoul dispatch an action on button click', () => {
		const state = {
			room: {
				host: true,
				id: 1
			}
		}
		let store  = mock(state)
		store.dispatch = jest.fn()
		component = renderComponent(store)
		renderer.act(() => {
			component.root.findByProps({className: 'bob-btn secondary'}).props.onClick()
		})
		expect(store.dispatch).toHaveBeenCalledTimes(4)
		expect(store.dispatch).toHaveBeenCalledWith(emitStart(1))
		expect(store.dispatch).toHaveBeenCalledWith(onDisplay())
		expect(store.dispatch).toHaveBeenCalledWith(onPlayers())
		expect(store.dispatch).toHaveBeenCalledWith(startGame(true))
	})
})