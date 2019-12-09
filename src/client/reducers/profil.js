const profil = (state = {}, action) => {

  switch (action.state) {
  case "NEW":
    return Object.assign({}, state, { user: {name: action.name } })
  default:
    return state
  }
}


export default profil
