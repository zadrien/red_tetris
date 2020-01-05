//import _ from 'lodash'

const listing = (state = {}, action) => {
  var obj
  var i
  var arr = []  
  switch (action.state) {
  case "NEXT":
    obj = Object.assign({}, state.rooms)
    obj.start += action.nbr
    return Object.assign({}, state, { rooms: obj })

  case "PREV":
    obj = Object.assign({}, state.rooms)
    obj.start -= action.nbr
    return Object.assign({}, state, { rooms: obj })
  case "FETCH":
    // should appends multiple result
	if (action.result.rooms) {
	  obj = {
		list: action.result.rooms
	  }
	}
    return Object.assign({}, state, { rooms:  obj })
  case "JOINING":
    if (action.status) {
	  if (action.status === 'error') {
		// notify user
	  } else if (action.status === 'success') {
		// add room variable with information etc..
	  }
    } else {
	  var r = Object.assign({}, state.rooms)
	  r[action.key]['loading'] = true; // need testing
	  return Object.assign({}, state, { rooms: r/*ADD SOMETHING*/ })
    }
	break ;
  case "LOADING":
    obj = Object.assign({}, state.rooms)
    obj[action.id]['isLoading'] = true; // need testing
    for (i = 0; i < Object.keys(obj).length; i++) {
	  arr.push(r[i])
    }
    return Object.assign({}, state, { onLoad: action.id, rooms: arr });
  case "JOINED":
    if (state.onLoad === undefined) {
	  //	console.log("onLoad undefined")
	  return state
    }
    obj = Object.assign({}, state.rooms)
    delete obj[state.onLoad]['isLoading']; // need testing
    for (i = 0; i < Object.keys(obj).length; i++) {
	  arr.push(r[i])
    }
    if (action.result.err) {
	  console.log(action.result.err)
	  return Object.assign({}, state, { onLoad: undefined, rooms: arr })
    }
    
    return Object.assign({}, state, { menu: "ROOM", onLoad: undefined, rooms: arr, room: action.result.room }) // DONT LIKE DEFINITION OF MENU

  case "CREATE":
    if (action.result) {
	  if (action.result.err)
		alert(action.result.err)
	  return Object.assign({}, state, { isCreating: false })	
    }
    return Object.assign({}, state, { isCreating: action.bool })
  case "CHECK":
	if (!action.result.room)
	  break
	var rooms = state.rooms.list
	
	i = rooms.findIndex(function (el) { return el.id === action.result.room.id})
	rooms[i] = action.result.room
	return Object.assign({}, state, { rooms: { list: rooms } })
  default:
	return state
  }
}

export default listing
