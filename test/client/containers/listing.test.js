import React from 'react'

import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'

import Listing from '../../../src/client/containers/ListingRooms'
import { emitFetch } from '../../../src/client/actions/Listing'
import { setInterface } from '../../../src/client/actions/Menu'

const mockStore = configureStore([])

describe('Listing Container', () => {
    let component, store
    const render = (store) => {
		return renderer.create(
			<Provider store={store}>
				<Listing/>
			</Provider>
		)
	}
	const getStore = (state) => mockStore(state)

	const state = {
		rooms: []
	}


    it('should render (and trigger fetch method', () => {
		store = getStore(state)
		store.dispatch = jest.fn()

		component = render(store)
		expect(component.toJSON()).toMatchSnapshot()
		
	})

    it('should trigger Create Object method', () => {

		renderer.act(() => {
			component.root.findByProps({id: "create"}).props.onClick()
		})

		expect(store.dispatch).toHaveBeenCalledTimes(2)
		expect(store.dispatch).toHaveBeenCalledWith(setInterface("CREATE"))
		expect(store.dispatch).toHaveBeenCalledWith(emitFetch({skip: 0}))
    })
})