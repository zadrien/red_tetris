const room = (state = {}, action = {}) => {
	var room = Object.assign({}, state.room)
	
	switch (action.state) {
	case "JOINED":
		if (!action.result.room)
			return state
		return Object.assign({}, state, { menu: "ROOM", room: action.result.room })

	case "START":
		if (!action.result)
			return state
		room.isOpen = action.result.start
		return Object.assign({}, state, { room: room/*ADD SOMETHING*/})
		
	case "DISPLAY":
		room.display = action.result
		return Object.assign({}, state, { room: room/*ADD SOMETHING*/})
		
	case "HOST":
		room.host = action.result.host
		return Object.assign({}, state, { room: room/*ADD SOMETHING*/})
		
	case "PLAYERS":
		var obj = action.result.filter( (e) => {
			return e.name !== state.user.name
		})
		if (!obj)
			return state
		room.players = obj
		return Object.assign({}, state, { room: room/*ADD SOMETHING*/})
		
	case "GAMEOVER":
		room.winner = (action.result.winner)
		return Object.assign({}, state, { room: room/*ADD SOMETHING*/})
		
	case "RESET":
		delete room.winner
		return Object.assign({}, state, { room: room })
		
	case "QUIT":
		return Object.assign({}, state, { room: undefined, menu: "LISTING" })
		
	default:
		return state
	}
}


export default room
