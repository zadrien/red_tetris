import React from 'react'

import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import configureStore from 'redux-mock-store'

import { App } from './app'
import { Provider } from 'react-redux'

const mockStore = configureStore()

describe('App Container TDD', () => {
    const store = mockStore({})
    const setup = (props) => {
        const wrapper = shallow(   
                <App {...props}/>)
        return {
            props,
            wrapper
        }
    }

    it('should render undefined state (Play Component)', () => {
        let props = {}
        const { wrapper } = setup(props)

        expect(wrapper.children().length).to.be.equal(1)
    })

    it('should render Room container', () => {
        let props = {
            menu: "ROOM",
        }

        const { wrapper } = setup(props)
        expect(wrapper.exists()).to.be.equal(true)
    })

    it('should render Listing container', () => {
        let props = {
            menu: "LISTING",
        }

        const { wrapper } = setup(props)
        expect(wrapper.children().length).to.be.equal(1)
    })

    it('should render Create container', () => {
        let props = {
            menu: "CREATE",
        }

        const { wrapper } = setup(props)
        expect(wrapper.children().length).to.be.equal(1)
    })
})