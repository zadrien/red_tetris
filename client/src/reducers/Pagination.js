
export const Pagination = (state = {}, action = {}) => {
	let newIndex
	switch (action.type) {
		case "CURSOR_NEXT":
			newIndex = state.cursor.i + state.cursor.pad
			if (newIndex < state.rooms.list.length)
				return Object.assign({}, state, state.cursor.i = newIndex)
			break ;
		case "CURSOR_PREV":
			newIndex = state.cursor.i - state.cursor.pad
			if (newIndex >= 0)
				return Object.assign({}, state, state.cursor.i = newIndex)
			break ;
		case "CURSOR_REFRESH":
			return Object.assign({}, state, state.cursor.i = 0)
		default:
			return state
	}
	return state;
}
