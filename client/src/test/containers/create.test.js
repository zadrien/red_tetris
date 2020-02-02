import React from 'react'

import { shallow } from 'enzyme'
import { expect } from 'chai'

import Create from '../../containers/Create'

describe('Create Container TDD', () => {
    const setup = (props) => {
        const wrapper = shallow(<Create {...props}/>)
        
        return {
            props,
            wrapper
        }
    }

    it('should render', () => {

        const { wrapper } = setup({})

        let childs = wrapper.find('div').children()
        expect(childs.length).to.be.equal(2)
        expect(childs.first().text()).to.be.equal("Create a room")
    })
})