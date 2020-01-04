import io from 'socket.io-client';

export default function socketMiddleware() {
  const socket = io('http://localhost:3004');

  return ({ dispatch, state }) => next => (action) => {
    if (typeof action === 'function') {
      return next(action);
    }
    const {
	  trigger,
      event,
      leave,
      emit,
      payload,
      handle,
      ...rest
    } = action;

	if (trigger)
	  return socket
	
    if (!event) {
      return next(action);
    }

    if (leave) {
	  console.log("remove listener")
      socket.removeListener(event);
    }

    if (emit) {
      console.log("payload:", payload)
      socket.emit(event, payload)
	  return socket
    }
	
    let handleEvent = handle;
    if (typeof handleEvent === 'string') {
	  console.log("HIIII2")
      handleEvent = result => dispatch({type: handle, result, ...rest})
    }

    return socket.on(event, handleEvent);
  };
}
