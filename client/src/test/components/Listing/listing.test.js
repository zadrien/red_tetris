import React from 'react'

import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'

import List from '../../../components/Listing/Listing'

const mockStore = configureStore([])

describe('Listing TDD', () => {
	let store, component
    const render = (store) => {
		return renderer.create(
			<Provider store={store}>
				<List/>
			</Provider>
		)
	}
	
	const getStore = (state) => mockStore(state)

    const state = {
		cursor: {
			i: 0,
			pad: 2
		},
        rooms: {
                list: [
                {
                    id: 1,
                    name: "Room1",
                    mode: "classic",
                    isStarted: false
                },
                {
                    id: 1,
                    name: "Room1",
                    mode: "classic",
                    isStarted: false
                },
                {
                    id: 1,
                    name: "Room1",
                    mode: "classic",
                    isStarted: false},
                {
                    id: 1,
                    name: "Room1",
                    mode: "classic",
                    isStarted: false
                },
                {
                    id: 1,
                    name: "Room1",
                    mode: "classic",
                    isStarted: false
                }
                ]
            }
    }

    it('should render 2 room', () => {
		component = render(getStore(state))
		const testInstance = component.root

		expect(component.toJSON()).toMatchSnapshot()
		expect(testInstance.findByProps({className: "room-list"}).children.length).toEqual(2)
	})
	
	it('should render no room available', () => {
		component = render(getStore({cursor: {i: 0, pad: 2}}))
		const testInstance = component.root

		expect(testInstance.findByProps({className: "title small my-auto"}).children).toEqual(["No room available"])
	})
})