import AppInterface from './Interface'
import Profil from './Profil'
import listing from './Listing'
import NewRoom from './Room'
import Create from './Create'
import { Pagination } from './Pagination'

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
		case "PAGINATION":
			return Pagination(state, action)
  		default:
    		return state
  	}
}

export default TetrisApp;
