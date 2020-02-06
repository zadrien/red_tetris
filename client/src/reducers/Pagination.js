
export const Pagination = (state = {}, action = {}) => {
	let cursor
	cursor = JSON.parse(JSON.stringify(state.cursor))
	switch (action.state) {
		case "CURSOR_NEXT":
			console.log("here")
			cursor.i += cursor.pad
			if (cursor.i < state.rooms.list.length)
			return Object.assign({}, state, {cursor: cursor})
			break ;
		case "CURSOR_PREV":
			cursor.i -= cursor.pad
			if (cursor.i >= 0)
				return Object.assign({}, state, {cursor: cursor})
			break ;
		case "CURSOR_REFRESH":
			cursor.i = 0
			return Object.assign({}, state, { cursor: cursor })
		default:
			return state
	}
	return state;
}
