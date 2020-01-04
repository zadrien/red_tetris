import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'

import {storeStateMiddleWare} from './client/middleware/storeStateMiddleWare'
import socketMiddleware from './client/middleware/socketMiddleware'


import TetrisApp from './client/reducers'
import App from './client/containers/app'



const initialState = {
  // user: {
  //   name: "BrownTrip"
  // }
  //  menu: "ROOM",
    //   rooms: [
    //   {
    // 	name: "test1",
    // 	mode: "classic"
    //   },
    //   {
    // 	name: "test2",
    // 	mode: "classic"
    //   },
    //   {
    // 	name: "test3",
    // 	mode: "classic"
    //   },
    // ]

  //room: {
  //   name: "test",
  //   mode: "classic",
  //   host: true,
  //   //    players: ["browntrip"],
    // display: [
    //   ['C', '.', '.', '.', '.', '.', '.', '.', '.', 'O'],
    //   ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    //   ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    //   ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    //   ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    //   ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    //   ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    //   ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    //   ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    //   ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    //   ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    //   ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    //   ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    //   ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    //   ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    //   ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    //   ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    //   ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    //   ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    //   ['V', '.', '.', '.', '.', '.', '.', '.', '.', 'G'],

    // ]
  //   players: [
  //     {
  // 	name: "browntrip",
  // 	line: ['V', '.', '.', '.', '.', '.', '.', '.', '.', 'G'],
  //     }
  //   ]
//}
}

function accessRoom(location) {
    console.log(location)
    var re = new RegExp('\#(.+)')
    console.log("REGEXP:", re.exec(location)[1]);
    
}

const store = createStore(
  TetrisApp,
  initialState,
  applyMiddleware(thunk, createLogger(), socketMiddleware())
)

ReactDOM.render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('tetris'))

