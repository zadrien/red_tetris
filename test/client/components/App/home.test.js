import React from 'react'

import { mount } from 'enzyme'
import { expect } from 'chai'

import { HomeButton } from '../../../../src/client/components/app/HomeButton'

describe('Home Button TDD', () => {
    const setup = (props) => {
        const wrapper = mount(<HomeButton {...props}/>)

        return {
            props,
            wrapper
        }
    }

    it('should render', () => {
        let props = {
            onSubmit: (e) => {
                expect(e.target.nickname.value).to.be.equal('testName')
            }
        }

        const { wrapper } = setup(props)

        wrapper.find('input').simulate('change', { target: {value : 'JOHN CENA'}})
        wrapper.find('button').simulate('click')
    })
})