import React from 'react'
import { expect } from 'chai'

import { shallow, mount } from 'enzyme'
import ConnectedPlayer, { Players } from '../../../components/Room/Player'

describe('Other player card', () => {
    const setup = (props) => {
        const wrapper = shallow(<Players {...props}/>)

        return {
            props,
            wrapper
        }
    }

    it('should render', () => {
        let props = {
            players: [
                {
                    name: 'testName1',
                    display: [['.', '.', '.', '.', '.', '.', '.', '.', '.', '.']]
                },
                {
                    name: 'testName2',
                    display: [['.', '.', '.', '.', '.', '.', '.', '.', '.', '.']]                },
                {
                    name: 'testName3',
                    display: [['.', '.', '.', '.', '.', '.', '.', '.', '.', '.']]                    
                }
            ]
        }
        const { wrapper } = setup(props)
        expect(wrapper.find('div').children('Card').length).to.be.equal(3)
    })
})