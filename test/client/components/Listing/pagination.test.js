import React from 'react'

import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'

import Pagination from '../../../../src/client/components/Listing/Pagination'
import { CURSOR_PREV, CURSOR_NEXT } from '../../../../src/client/actions/Pagination'

const mockStore = configureStore([])

describe('Pagination Button TDD', () => {
	let store, component
    const render = (stor) => {
        return renderer.create(
			<Provider store={stor}>
				<Pagination/>
			</Provider>
		)
    }
	const getStore = (state) => mockStore(state)
	
	beforeAll(() => {
		store = getStore({menu: "LISTING"})
		store.dispatch = jest.fn()
		component = render(store)
	})
	
	beforeEach(() => {
		store.dispatch.mockReset()
	})

    it("should render component", () => {
		const testInstance = component.root

		expect(component.toJSON()).toMatchSnapshot()
		expect(testInstance.findByProps({className: "d-flex"}).children.length).toEqual(2)
		expect(testInstance.findByProps({id: "next"}).children).toEqual(["Next"])
		expect(testInstance.findByProps({id: "prev"}).children).toEqual(["Prev"])
	})

	it('should trigger CURSOR_PREV dispatch', () => {

		renderer.act(() => {
			component.root.findByProps({ id: "prev"}).props.onClick()
		})

		expect(store.dispatch).toHaveBeenCalledTimes(1)
		expect(store.dispatch).toHaveBeenCalledWith(CURSOR_PREV())
	})

	it('should trigger CURSOR_NEXT dispatch', () => {
		renderer.act(() => {
			component.root.findByProps({ id: "next"}).props.onClick()
		})

		expect(store.dispatch).toHaveBeenCalledTimes(1)
		expect(store.dispatch).toHaveBeenCalledWith(CURSOR_NEXT())
	})
})