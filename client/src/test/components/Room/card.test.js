import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { Card } from '../../../components/Room/Card'

function setup() {
  const props = {
    player: {
      name: "testName",
      display: [
        [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
        [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
        [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
        [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
        [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ]
      ]
    }
  }

  const enzymeWrapper = shallow(<Card {...props}/>)
  return {
    props,
    enzymeWrapper
  }
}

describe('Card BDD', () => {
  it('should render Card component', function() {
    const { enzymeWrapper } = setup()

    expect(enzymeWrapper.find('h6').text()).to.equal('testName')
    const board = enzymeWrapper.find('Board').props()
    expect(board.display).to.be.a('Array')
  })
})
