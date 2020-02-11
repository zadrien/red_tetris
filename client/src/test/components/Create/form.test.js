import React from 'react'

import Create from '../../../components/Create/Form'

import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import { isCreating, emitCreate, onCreation } from '../../../actions/Create'
import { setInterface } from '../../../actions/Menu'

const mockStore = configureStore([])

describe("Form TDD", () => {
	let store, component


	const render = (store) => {
		return renderer.create(
			<Provider store={store}>
				<Create/>
			</Provider>
		)
	}
	const getStore = (state) => mockStore(state)

	it("should render and submit", () => {
		let state = {
			user: {
				name: "testname"
			},
			isCreating: false
		}
		store = getStore(state)
		store.dispatch = jest.fn()
		component = render(store)

		expect(component.toJSON()).toMatchSnapshot()

		renderer.act(() => {
			component.root.findByProps({ id: "create-room-form"})
			.props.onSubmit({
				preventDefault: jest.fn(),
				target: {
					room: { value: "ROOM NAME"}, mode: { value: "classic"}}}, state.user)
		})

		expect(store.dispatch).toHaveBeenCalledTimes(3)
		expect(store.dispatch).toHaveBeenCalledWith(isCreating())
		expect(store.dispatch).toHaveBeenCalledWith(onCreation())
		expect(store.dispatch).toHaveBeenCalledWith(emitCreate({
			user: state.user,
			room: {name: "ROOM NAME", mode: "classic"}}))
	})

	it("should goBack", () => {
		let state = {
			user: {
				name: "testname"
			},
			isCreating: false
		}
		store = getStore(state)
		store.dispatch = jest.fn()
		component = render(store)

		expect(component.toJSON()).toMatchSnapshot()

		const button = component.root.find(el => el.props.onClick !== undefined)
		renderer.act(() => {
			button.props.onClick()
		})

		expect(store.dispatch).toHaveBeenCalledTimes(1)
		expect(store.dispatch).toHaveBeenCalledWith(setInterface("LISTING"))
	})
})
