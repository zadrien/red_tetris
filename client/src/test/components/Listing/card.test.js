import React from 'react'

import { expect } from 'chai'
import { mount } from 'enzyme'
import { RoomCard } from '../../../components/Listing/card'

describe('[LISTING] Card TDD', () => {
    const setup = (props) => {

        const wrapper = mount(<RoomCard {...props}/>)

        return {
            props,
            wrapper
        }
    }

    it('should render a joinable room card', () => {
        let props = {
            room: {
                name: "testRoom",
                mode: "classic",
                nbrUser: 2,
                isStarted: false
            },
            user: {
                name: 'testName'
            },
            onClick: jest.fn()
        }

        const { wrapper } = setup(props)
        expect(wrapper.find('Card').children('div').hasClass('room-list-item')).to.be.equal(true)
        const el = wrapper.find('div.room-list-item').children()
        expect(el.find('div.description').children().length).to.be.equal(2)
        expect(el.find('div.join-button').children('div').text()).to.be.equal('JOIN')
    })

    it('should render a unjoinable room card', () => {
        let props = {
            room: {
                name: "testRoom",
                mode: "classic",
                nbrUser: 2,
                isStarted: true
            },
            user: {
                name: 'testName'
            },
            onClick: jest.fn()
        }
        const { wrapper } = setup(props)

        expect(wrapper.find('Card').children('div').hasClass('room-list-item')).to.be.equal(true)
        const el = wrapper.find('div.room-list-item').children()
        const cardProps = wrapper.find('Card').props()
        expect(cardProps.onClick).to.be.undefined
        expect(el.find('div.description').children().length).to.be.equal(2)
        expect(el.find('div.join-button').children('div').text()).to.be.equal('IN-GAME')
    })

    it('shoudl not render (empty props)', () => {
        let props = {}

        const { wrapper } = setup(props)

        expect(wrapper).to.be.empty
    })
})