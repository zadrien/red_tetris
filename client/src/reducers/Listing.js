const listing = (state, action = {}) => {
	let obj
  
	switch (action.state) {
	case "FETCH":
		if (action.result.rooms) {
			if (!state.rooms)
				return Object.assign({}, state, {rooms: { list: action.result.rooms }})
			obj = state.rooms
			action.result.rooms.forEach((r) => {
				let exist = obj.list.findIndex(el => {return el.id === r.id})
				if (exist === -1)
					obj.list.push(r)
			})
			return Object.assign({}, state, { rooms : obj })
		}
		return state
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
		if (!state.rooms)
			return state
		obj = JSON.parse(JSON.stringify(state.rooms))
		obj.list.forEach((v, k) => {
			if (v.id !== action.result.room.id)
				return 
			obj.list[k] = action.result.room
		})
		return Object.assign({}, state, { rooms: obj })
  	default:
		return state
	}
}

export default listing
