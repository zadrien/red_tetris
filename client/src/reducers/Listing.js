import _ from 'lodash'

const listing = (state = { }, action = {}) => {
	let obj
  
	switch (action.state) {
	case "FETCH":
		if (state.rooms && !_.isEmpty(state.rooms.list))
			return Object.assign({}, state, { rooms: { list: [...state.rooms.list, ...action.result.rooms] } })
    	return Object.assign({}, state, { rooms: { list: action.result.rooms } })

  	case "JOINING":
		if (action.result) {
			if (action.result.err)
				return Object.assign({}, state, { rooms: { isJoining: { err: action.result.err } } })
	  		else if (action.result.success) {
				obj = Object.assign({}, state.rooms)
				delete obj['isJoining']
				return Object.assign({}, state, { rooms: obj })
	  		}
		}
		return Object.assign({}, state, { rooms: { isJoining: action.roomID	}})
	
  	case "CREATE":
    	if (action.result)
			if (action.result.err)
				return Object.assign({}, state, { isCreating: { status: false, err: action.result.err} })
    	return Object.assign({}, state, { isCreating: action.bool })
	  
  	case "CHECK":
		if (!action.result.room)
			break
		let rooms = state.rooms.list
	
		let i = rooms.findIndex(function (el) { return el.id === action.result.room.id})
		rooms[i] = action.result.room
		return Object.assign({}, state, { rooms: { list: rooms } })
  	default:
		return state
  }
}

export default listing
