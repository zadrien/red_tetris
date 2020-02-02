import io from 'socket.io-client';

export default function socketMiddleware(option = {}) {
	const socket = io('http://localhost:3004', option);

  	return ({ dispatch, state }) => next => (action) => {
    	if (typeof action === 'function') {
    		return action(dispatch, state);
    	}
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
