import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { Host } from '../../../components/Room/host'

describe('Host component', () => {
    const setup  = (props) => {
        const wrapper = shallow(<Host {...props}/>)
        return {
            props,
            wrapper
        }
    }

    it('should render (host as true)', function() {
        let props = { 
            host: true,
            start: false,
            id: 1,
            onClick: jest.fn()
        }
        const { wrapper } = setup(props)

        expect(wrapper.find('div.bob-btn').hasClass('bob-btn secondary')).to.be.equal(true)
        expect(wrapper.find('div.bob-btn').hasClass('disabled')).to.be.equal(false)
    })

    it('should render (host as false', () => {
        let props = {
            host: false
        }
        const { wrapper } = setup(props)

        expect(wrapper.find('div')).to.be.empty
    })
})
