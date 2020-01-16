import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'

import socketMiddleware from './client/middleware/socketMiddleware'

import TetrisApp from './client/reducers'
import App from './client/containers/app'
//import configureStore from './client/store/configure-store'

const initialState = {

}

function accessRoom(location) {
    console.log(location)
    var re = new RegExp('#(.+)')
    console.log("REGEXP:", re.exec(location)[1]);
}

const store = createStore(
	TetrisApp,
	initialState,
	applyMiddleware(thunk, createLogger(), socketMiddleware())
)

//const store = configureStore()


ReactDOM.render((
	<Provider store={store}>
	<App/>
	</Provider>
), document.getElementById('tetris'))
