const create = (state = {}, action = {}) => {
	switch (action.state) {
		case "CREATING":
			return Object.assign({}, state, { isCreating: true })
		case 'CREATE':
	  // REDO CREATION error state
//	if (action.result) {
//       if (action.result.err)
// //		alert(action.result.err) // need to move this part
// 	  else if (!action.result.room)
// 		alert("No room!....")// need to move this part
// 	}
			return Object.assign({}, state, { isCreating: false })
		default:
			return state
	}
}

export default create
