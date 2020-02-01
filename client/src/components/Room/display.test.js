import React from 'react'
import { expect } from 'chai'

import { shallow, mount } from 'enzyme'
import { Display } from './MainDisplay'

describe('Main User Display TDD', () => {
    const setup = (props) => {
        
        const wrapper = mount(<Display {...props}/>)
        return {
            props,
            wrapper
        }
    }

    it('should render', () => {
        let props = {
            display: [
                [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
                [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
                [ '.', '.', '.', '.', 'X', '.', '.', '.', '.', '.' ],
                [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
                [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ]
              ] 
        }
        const { wrapper } = setup(props)
        const propsWrapper = wrapper.props()

        expect(wrapper.find('div').children().length).to.be.equal(55)
        expect(propsWrapper.display).to.be.an('array')
    })

    it('should render an a div without children (undefined display)', () => {
        let props = {}
        const { wrapper } = setup(props)

        expect(wrapper.find('div').children().length).to.be.equal(0)
    })
})