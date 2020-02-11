import React from 'react'

import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'

import App from '../../containers/app'


const mockStore = configureStore([])

describe('App Container TDD', () => {
    let component 
    const render = (store) => {
		return renderer.create(
			<Provider store={store}>
				<App/>
			</Provider>
		)
	}
	
	const getStore = (state) => {
		let store = mockStore(state)
		store.dispatch = jest.fn()
		return store
	}

    it('should render undefined state (Play Component)', () => {
		const state = {}
		
		component = render(getStore(state))
		const testInstance = component.root
		expect(component.toJSON()).toMatchSnapshot()

		expect(testInstance.findByProps({className: "main-menu"}).type).toEqual('div')
    })

    it('should render Room container', () => {
        const state = {
			menu: "ROOM",
			room: {
				name: "testName",
				id: 1
			}
		}
		
		component = render(getStore(state))
		const testInstance = component.root
		expect(component.toJSON()).toMatchSnapshot()
		
    })

    it('should render Listing container', () => {
        const state = {
            menu: "LISTING",
        }

		component = render(getStore(state))
		const testInstance = component.root
		expect(component.toJSON()).toMatchSnapshot()
        
    })

    it('should render Create container', () => {
       	const state = {
            menu: "CREATE",
        }

		component = render(getStore(state))
		const testInstance = component.root
		expect(component.toJSON()).toMatchSnapshot()
        
    })
})