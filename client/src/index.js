import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import App from './containers/app'
import configureStore from './store/configure-store'

const initialState = {
	cursor: {
		i: 0,
		pad: 7
	}
}
const store = configureStore(initialState)


ReactDOM.render((
	<Provider store={store}>
	<App/>
	</Provider>
), document.getElementById('tetris'))
