import io from 'socket.io-client';

export const AppMiddleWare = ({ dispatch }) => {
	return (next) => (action) => {
		if (Array.isArray(action))
			return action.map(a => dispatch(a));
		return next(action)
	}
}

export const socketMiddleware = ({ dispatch, state }) => {
	const socket = io('http://localhost:3004')

	return next => (action) => {
		if (typeof action === 'function')
			return action(dispatch, state);

		const {
			event,
			leave,
			emit,
			payload,
			handle,
			...rest
		} = action;

		if (!event)
			return next(action);
		if (leave)
			return socket.removeListener(event);
		if (emit)
			return socket.emit(event, payload)
		let handleEvent = handle;
		if (typeof handleEvent === 'string')
			handleEvent = result => dispatch({type: handle, result, ...rest})
		return socket.on(event, handleEvent);
	};
}

