import React from 'react'

import { mount, shallow } from 'enzyme'
import { expect } from 'chai'

import { List } from './Listing'

describe('Listing TDD', () => {
    const setup = (props) => {

        const wrapper = shallow(<List {...props}/>)
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
        const { wrapper } = setup(props)
        
        expect(wrapper.find('div').hasClass('room-list')).to.be.true
        expect(wrapper.find('div').children().length).to.be.equal(props.rooms.list.length)
    })

    it('should render an empty list', () => {
        const { wrapper } = setup({})
        
        expect(wrapper.find('h2').text()).to.be.equal("No room available")
    })
})