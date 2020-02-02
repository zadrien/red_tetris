import React from 'react'

import { mount } from 'enzyme'
import { expect } from 'chai'

import { Create } from '../../../components/Create/Form'

describe("Creation's Form TDD", () => {
    const setup = (props) => {
        const wrapper = mount(<Create {...props}/>)
        return {
            props,
            wrapper
        }
    }

    it("should render", () => {
        let props = {
            isCreating: false,
            user: {
                name: "testName"
            },
            onSubmit: jest.fn(),
            goBack: jest.fn()
        }
        const { wrapper } = setup(props)
        const labels = ["Room's name", "Game mode"]

        wrapper.find('h2').forEach((node, i) => {
            expect(node.text()).to.be.equal(labels[i])
        })
    })

    it('should submit the form', () => {
        let props = {
            isCreating: false,
            user: {
                name: "testName"
            },
            onSubmit: (e, user) => {
                expect(e.target.room.value).to.be.equal('testRoom')
                expect(e.target.mode.value).to.be.equal('classic')
                expect(user.name).to.be.equal('testName')
            },
            goBack: jest.fn()
        }

        const { wrapper } = setup(props)

        wrapper.find('input').first().simulate('change', { target: { value: "testRoom"}})
        wrapper.find('button').simulate('click')
    })
})