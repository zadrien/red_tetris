const profil = (state = {}, action = {}) => {
  switch (action.state) {
  case "NEW":
	if (action.result.err)
	  return Object.assign({}, state, { user: { err: action.result.err }})
	if (!action.result.name)
	  return state
	var user = {
	  name: action.result.name
	}
    return Object.assign({}, state, { menu: "LISTING", user: user })
  default:
    return state
  }
}

export default profil
