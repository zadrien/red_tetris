const merge = (arr1, arr2) => {
	const result_arr = []
	const  arr  = arr1.concat(arr2)
	const assoc = {}

	for (let i = arr.length - 1; i >= 0; i--) {
		const item = arr[i]
		if (!assoc[item.id]) {
			result_arr.unshift(item)
			assoc[item.id] = true
		}
	}
	return result_arr
}

const listing = (state = {}, action = {}) => {
	let obj
	switch (action.state) {
		case "FETCH":
			if (action.result.rooms) {
				if (!state.rooms)
					return Object.assign({}, state, {rooms: { list: action.result.rooms }})
				obj = state.rooms
				obj.list = merge(obj.list, action.result.rooms)
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
			let i = obj.list.findIndex(el => el.id === action.result.room.id)
			if (i === -1)
				obj.list.push(action.result.room)
			else
				obj.list[i] = action.result.room
			return Object.assign({}, state, { rooms: obj })
		default:
			return state
	}
}

export default listing
