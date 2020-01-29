import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'

import socketMiddleware from './middleware/socketMiddleware'

import TetrisApp from './reducers'
import App from './containers/app'
import configureStore from './store/configure-store'

function accessRoom(location) {
    console.log(location)
    var re = new RegExp('#(.+)')
    console.log("REGEXP:", re.exec(location)[1]);
}

const store = configureStore()


ReactDOM.render((
	<Provider store={store}>
	<App/>
	</Provider>
), document.getElementById('tetris'))
