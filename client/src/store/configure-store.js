import { createStore, applyMiddleware } from 'redux'

import TetrisApp from '../reducers'

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { AppMiddleWare, socketMiddleware } from '../middleware/middleware'

export default function configureStore(initialState = {}) {
	if (process.env.NODE_ENV !== "production")
		return createStore(
			TetrisApp,
			initialState,
			applyMiddleware(thunk, createLogger(), AppMiddleWare, socketMiddleware)
		)
	return createStore(
		TetrisApp,
		initialState,
		applyMiddleware(thunk, AppMiddleWare, socketMiddleware)
	)
}
