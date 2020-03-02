import React from 'react'

import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'

import Display from '../../../../src/client/components/Room/MainDisplay'
import { emitStart, onDisplay, onPlayers, startGame } from '../../../../src/client/actions/Room'

const mockStore = configureStore([])

describe('Main User Display TDD', () => {
	let component
	const renderComponent = (store) => {
		return renderer.create(
			<Provider store={store}>
				<Display/>
			</Provider>
		)
	}

	const getStore = (state) => mockStore(state)

	it('should render (display as undefined)', () => {
		const state = {
			room: {
				  isOpen: false,
				  host: true,
			}
		}
		
		component = renderComponent(getStore(state))
		const testInstance = component.root

		expect(component.toJSON()).toMatchSnapshot()
		expect(testInstance.findByProps({className: 'board'}).children.length).toEqual(0)
        
	})

    it('should render (isOpen as true)', () => {
		const state = {
			room: {
				display: [
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', 'X', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ]
				  ],
				  isOpen: true,
				  host: true,
			}
		}
		
		component = renderComponent(getStore(state))
		const testInstance = component.root

		expect(component.toJSON()).toMatchSnapshot()
		expect(testInstance.findByProps({className: 'board'}).children.length).toEqual(6)
		expect(testInstance.findByProps({className: "title big"}).children).toEqual(['Ready ?'])
        
	})
	
	it('should render (host as false & isOpen as true)', () => {
		const state = {
			room: {
				display: [
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', 'X', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ]
				  ],
				  isOpen: true,
				  host: false,
			}
		}
		
		component = renderComponent(getStore(state))
		const testInstance = component.root

		expect(component.toJSON()).toMatchSnapshot()
		expect(testInstance.findByProps({className: 'board'}).children.length).toEqual(6)
		expect(testInstance.findByProps({className: "title medium"}).children).toEqual(["Pending..."])
	})

	it('should render (host & isOpen as true)', () => {
		const state = {
			room: {
				display: [
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', 'X', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ]
				  ],
				  isOpen: false,
				  host: false,
			}
		}
		
		component = renderComponent(getStore(state))
		const testInstance = component.root

		expect(component.toJSON()).toMatchSnapshot()
		expect(testInstance.findByProps({className: 'board'}).children.length).toEqual(5)
	})
	
	it('should render (winner as true)', () => {
		const state = {
			room: {
				display: [
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', 'X', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ]
				  ],
				  isOpen: false,
				  host: false,
				  winner: true
			}
		}
		
		component = renderComponent(getStore(state))
		const testInstance = component.root

		expect(component.toJSON()).toMatchSnapshot()
		expect(testInstance.findByProps({className: 'board'}).children.length).toEqual(6)
		expect(testInstance.findByProps({className: "title big"}).children).toEqual(["GAME OVER"])
		expect(testInstance.findByProps({className: "title medium"}).children).toEqual(["You won"])
	})
	
	it("should trigger onClick method", () => {
		const state = {
			room: {
				id: 1,
				display: [
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', 'X', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ]
				  ],
				  isOpen: true,
				  host: true,
			}
		}
		const store = getStore(state)

		store.dispatch = jest.fn()

		component = renderComponent(store)

		renderer.act(() => {
			component.root.findByProps({ className: "bob-btn secondary"}).props.onClick()
		})

		expect(store.dispatch).toHaveBeenCalledTimes(4)
		expect(store.dispatch).toHaveBeenCalledWith(emitStart(1))
		expect(store.dispatch).toHaveBeenCalledWith(onDisplay())
		expect(store.dispatch).toHaveBeenCalledWith(onPlayers())
		expect(store.dispatch).toHaveBeenCalledWith(startGame(true))

	})
})