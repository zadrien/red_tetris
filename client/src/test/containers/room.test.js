import React from 'react'

import { shallow } from 'enzyme'
import { expect } from 'chai'

import { Room } from '../../containers/Room'

describe('Room container', () => {
    const setup = (props) => {

        const wrapper = shallow(<Room {...props}/>)

        return {
            props,
            wrapper
        }
    }

    it('should render', () => {
        let props = {
            room: {
                name: 'testRoomName',
            },
            onLeave: jest.fn(),
            onWin: jest.fn()
        }

        const { wrapper } = setup(props)

        expect(wrapper.find('h1.title').text()).to.be.equal(props.room.name)
    })

    it('should trigger onLeave method', () => {
        let props = {
            room: {
                name: 'testRoomName',
            },
            onLeave: (room) => {
                expect(room).to.be.equal(props.room.name)
            },
            onWin: jest.fn()
        }

        const { wrapper } = setup(props)

    })

    it('should trigger onWin method', () => {
        let props = {
            room: {
                name: 'testRoomName',
                winner: true,
            },
            onLeave: jest.fn(),
            onWin: () => {
                expect('to be here').to.not.be.empty
            }
        }

        const { wrapper } = setup(props)

        const div = wrapper.children().last()
        expect(div.text()).to.be.equal('You won')
        div.simulate('click')
    })

    it('should trigger onWin method', () => {
        let props = {
            room: {
                name: 'testRoomName',
                winner: false,
            },
            onLeave: jest.fn(),
            onWin: () => {
                expect('to be here').to.not.be.empty
            }
        }
        const { wrapper } = setup(props)

        const div = wrapper.children().last()
        expect(div.text()).to.be.equal('You lose')
        div.simulate('click')
    })
})