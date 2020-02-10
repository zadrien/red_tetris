import React from 'react'

import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'


import { Card } from '../../../components/Room/Card'

const mockStore = configureStore([])
describe('Card TDD', () => {
	let component
	const player = {
			name: "testName",
			display: [
				[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
				[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
				[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
				[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
				[ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ]
			  ]
	}


	const getStore = (state) => mockStore(state)

	it('should render ', () => {

		component = renderer.create(<Card player={player}/>)
		const testInstance = component.root

		expect(component.toJSON()).toMatchSnapshot()
		expect(testInstance.findByProps({className: "mini-board"}).children.length).toEqual(2)
		expect(testInstance.findAllByProps({className: "board-row"}).length).toEqual(5)
		expect(testInstance.findAllByProps({ className: "mini-board-box"}).length).toEqual(50)
	})
})