import React from 'react'

import { mount, shallow } from 'enzyme'
import { expect } from 'chai'

import { List } from '../../../components/Listing/Listing'

describe('Listing TDD', () => {
    const setup = (props) => {

        const wrapper = mount(<List {...props}/>)
        return {
            props,
            wrapper
        }
    }

    const props = {
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

    it('should render', () => {
		const cursor = {
			i: 0,
			pad: 7
		}
        const { wrapper } = setup({
			cursor,
			...props
		})
        expect(wrapper.find('div').hasClass('room-list')).to.be.true
        expect(wrapper.find('AvailableRoom').props().rooms.length).to.be.equal(props.rooms.list.length)
    })

    it('should render an empty list', () => {
        const { wrapper } = setup({})
        
        expect(wrapper.find('h2').text()).to.be.equal("No room available")
    })
})