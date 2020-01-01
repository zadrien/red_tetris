const profil = (state = {}, action) => {

  switch (action.state) {
  case "NEW":
	if (!action.name)
	  return state
	var user = {
	  name: action.name
	}
    return Object.assign({}, state, { user: user })
  case "ERROR":
	var user = {
	  err: action.err
	}
	return Object.assign({}, state, { user: user })
  default:
    return state
  }
}


export default profil
