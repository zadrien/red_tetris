import React from 'react'

import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'

import Display from '../../../components/Room/MainDisplay'

const mockStore = configureStore([])

describe('Main User Display TDD', () => {
	let store, component
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
				  start: false,
				  host: true,
			}
		}
		
		component = renderComponent(getStore(state))
		const testInstance = component.root

		expect(component.toJSON()).toMatchSnapshot()
		expect(testInstance.findByProps({className: 'board'}).children.length).toEqual(0)
        
	})

    it('should render (start as true)', () => {
		const state = {
			room: {
				display: [
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', 'X', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ]
				  ],
				  start: true,
				  host: true,
			}
		}
		
		component = renderComponent(getStore(state))
		const testInstance = component.root

		expect(component.toJSON()).toMatchSnapshot()
		expect(testInstance.findByProps({className: 'board'}).children.length).toEqual(5)
        
	})
	
	it('should render (start and host as false)', () => {
		const state = {
			room: {
				display: [
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', 'X', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
					[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ]
				  ],
				  start: false,
				  host: false,
			}
		}
		
		component = renderComponent(getStore(state))
		const testInstance = component.root

		expect(component.toJSON()).toMatchSnapshot()
		expect(testInstance.findByProps({className: 'board'}).children.length).toEqual(6)
		expect(testInstance.findByProps({className: "title medium"}).children).toEqual(["Pending..."])
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
				  start: false,
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
})