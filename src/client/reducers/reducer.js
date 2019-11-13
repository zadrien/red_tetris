import AppInterface from './interface'
import Profil from './profil'
import listing from './listing'
import NewRoom from './room'
import Create from './create'

const TetrisApp = (state = {}, action) => {
  switch (action.type) {
  case "INTERFACE":
    return AppInterface(state, action)
  case "PROFIL":
    return Profil(state, action)
  case "LISTING":
    return listing(state, action)
  case "ROOM":
    return NewRoom(state, action)
  case "CREATE":
    return Create(state, action)
  default:
    return state
  }
}

export default TetrisApp;
