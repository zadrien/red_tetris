import { createBrowserHistory } from 'history'
import { combineReducers, applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import socketMiddleware from './middleware/socketMiddleware'

import TetrisApp from './reducers'

const createRootReducer = (history) => combineReducers({
	router: connectRouter(history),
	TetrisApp
})

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
	const store = createStore(
	  createRootReducer(history),
	  preloadedState,
	  applyMiddleware(
			routerMiddleware(history),
			thunk,
			createLogger(),
			socketMiddleware()
		),
	)

	return store
}
