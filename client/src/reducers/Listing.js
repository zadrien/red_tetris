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
			const index = obj.list.findIndex(el => el.id === action.result.room.id)
			if (index === -1)
				obj.list.push(action.result.room)
			else
				obj.list[index] = action.result.room
			return Object.assign({}, state, { rooms: obj })
		default:
			return state
	}
}

export default listing
