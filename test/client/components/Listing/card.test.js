import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'

import RoomCard from '../../../../src/client/components/Listing/card'
import { emitJoin } from '../../../../src/client/actions/Listing'


const mockStore = configureStore([])

describe('[] Card TDD', () => {
    const render = (store, room) => {
		return renderer.create(
			<Provider store={store}>
				<RoomCard room={room}/>
			</Provider>
		)
	}
	
	const getStore = (state) => mockStore(state)

	describe('Joinable Room', () => {
		let testInstance, component, store
		const state = {
			user: {
				name: "testName"
			}
		}
		const room = {
			name: "testRoom",
			mode: "classic",
			nbrUser: 2,
			isStarted: false
		}

		beforeAll(() => {	
			store = getStore(state)
			store.dispatch = jest.fn()
			component = render(store, room)
			testInstance = component.root
		})

		it('should render a joinable room card', () => {
			expect(component.toJSON()).toMatchSnapshot()
	
			expect(testInstance.findByProps({className: 'name'}).children).toEqual(["testRoom"])
			expect(testInstance.findByProps({className: 'mode'}).children).toEqual(["classic", " [", "2", "/10]"])
			expect(testInstance.findByProps({className: 'join-button'}).children.length).toEqual(1)
		})

		it('should trigger dispatch', () => {
			renderer.act(() => {
				component.root.findByProps({className: 'room-list-item'}).props.onClick()
			})

			expect(store.dispatch).toHaveBeenCalledTimes(1)
			expect(store.dispatch).toHaveBeenCalledWith(emitJoin(state.user, room))

		})
	})

	describe("Unjoinable Room", () => {
		let testInstance, component, store
		const state = {
			user: {
				name: "testName"
			}
		}
		const room = {
			name: "testRoom",
			mode: "classic",
			nbrUser: 2,
			isStarted: true
		}

		beforeAll(() => {	
			store = getStore(state)
			store.dispatch = jest.fn()
			component = render(store, room)
			testInstance = component.root
		})

		it("should render", () => {
			expect(component.toJSON()).toMatchSnapshot()
	
			expect(testInstance.findByProps({className: 'name'}).children).toEqual(["testRoom"])
			expect(testInstance.findByProps({className: 'mode'}).children).toEqual(["classic", " [", "2", "/10]"])
			expect(testInstance.findByProps({className: 'join-button'}).children.length).toEqual(1)
		})

		it('should not trigger dispatch (onClick as undefined)', () => {
			renderer.act(() => {
				component.root.findByProps({className: 'room-list-item'}).props.onClick()
			})
			expect(store.dispatch).toHaveBeenCalledTimes(0)
		})
	})
	
	
})