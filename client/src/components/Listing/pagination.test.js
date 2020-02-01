import React from 'react'

import { shallow } from 'enzyme'
import { expect } from 'chai'

import { Pagination } from './Pagination'

describe('Pagination Button TDD', () => {
    const setup = (props) => {

        const wrapper = shallow(<Pagination {...props}/>)
        return {
            props,
            wrapper
        }
    }

    it("should render", () => {
        const props = {
            items: {
                list: []
            },
            next: jest.fn(),
            prev: jest.fn()
        }
        let value = ['Prev', 'Next']
        const { wrapper } = setup(props)

        const child = wrapper.find('div.d-flex').children()

        expect(child.length).to.be.equal(2)
        child.forEach((node, i) => {
            expect(node.text()).to.be.equal(value[i])
        })
        
    })
})