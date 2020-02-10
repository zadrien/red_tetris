import React from 'react'

import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'

import PlayersHandler from '../../../components/Room/Player'

const mockStore = configureStore([])

describe('Mini board handler', () => {
	let component
    const render = (store) => {
		return renderer.create(
			<Provider store={store}>
				<PlayersHandler/>
			</Provider>
		)
	}

	const getStore = (state) => mockStore(state)

    it('should render', () => {
        let state = {
			room: {
            	players: [
					{
						name: 'testName1',
						display: [['.', '.', '.', '.', '.', '.', '.', '.', '.', '.']]
					},
					{
						name: 'testName2',
						display: [['.', '.', '.', '.', '.', '.', '.', '.', '.', '.']]                },
					{
						name: 'testName3',
						display: [['.', '.', '.', '.', '.', '.', '.', '.', '.', '.']]                    
					}
				]
			}
        }
		component = render(getStore(state))
		const testInstance = component.root
		expect(component.toJSON()).toMatchSnapshot()

		const board = testInstance.findAllByProps({className: 'mini-board'})
		expect(board.length).toEqual(3)
    })
})