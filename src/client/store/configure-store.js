import { createStore, applyMiddleware, compose } from 'redux'

import TetrisApp from '../reducers'

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import socketMiddleware from '../middleware/socketMiddleware'

export default function configureStore(initialState = {}) {
	const middlewares = [ thunk, createLogger(), socketMiddleware]

	return createStore(
		TetrisApp,
		initialState,
		applyMiddleware(thunk, createLogger(), socketMiddleware())
	)
}