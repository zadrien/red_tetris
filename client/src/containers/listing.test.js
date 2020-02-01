import React from 'react'

import { shallow } from 'enzyme'
import { expect } from 'chai'

import { Listing } from './ListingRooms'

describe('Listing Container', () => {
    const setup = (props) => {

        const wrapper = shallow(<Listing {...props} />)

        return {
            props,
            wrapper
        }
    }

    it('should render', () => {
        let props = {
            rooms: [{ name: 'testName' }],
            Create: jest.fn(),
            Fetch: jest.fn()
        }
        const { wrapper } = setup(props)

        expect(wrapper.find('h4.title').text()).to.be.equal("SELECT A ROOM")
        expect(wrapper.find('div.d-flex').children('div').text()).to.be.equal('New room')
    })

    it('should trigger Fetch Object method', () => {
        let props = {
            Create: jest.fn(),
            Fetch: (e) => {
                expect(e).to.be.equal(0)
            }
        }
        const { wrapper } = setup(props) 
    })

    it('should trigger Create Object method', () => {
        let props = {
            Create: () => {
                expect(0).to.be.equal(0)
            },
            Fetch: jest.fn()
        }
        const { wrapper } = setup(props)

        wrapper.find('div.bob-btn').simulate('click')
    })
})