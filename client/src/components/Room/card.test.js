import React from 'react'
import { spy } from 'sinon'

import expect from 'expect.js'
import Card from './playerCard'
import renderer from 'react-test-renderer'

describe('Card BDD', () => {
  let player = {
    name: "testName",
    display: [
      [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
      [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
      [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
      [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
      [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ]
    ]
  }
  const component = renderer.create(<Card player={player}/>)
  
  it('should render Card component', function() {
    let tree = component.toJSON()
    
    expect(tree).toMatchSnapshot()
  })
})
