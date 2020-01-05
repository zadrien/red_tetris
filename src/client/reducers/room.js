//import _ from 'lodash'

const room = (state = { room: { display: "lol" }}, action) => {
  var room = Object.assign({}, state.room)
  
  switch (action.state) {
  case "JOINED":
    if (!action.result.room)
      return state
    return Object.assign({}, state, { menu: "ROOM", room: action.result.room })
  case "START":
	console.log(action)
	if (!action.result)
	  return state
    room["start"] = action.result.start
    return Object.assign({}, state, { room: room/*ADD SOMETHING*/})
  case "DISPLAY":
    room['display'] = action.result
    return Object.assign({}, state, { room: room/*ADD SOMETHING*/})
  case "HOST":
    room['host'] = action.result.host
    return Object.assign({}, state, { room: room/*ADD SOMETHING*/})
  case "PLAYERS":
	var obj = action.result.filter(function (e) {
	  return e.name !== state.user.name
	})
	if (!obj)
	  return state
    room['players'] = obj
    return Object.assign({}, state, { room: room/*ADD SOMETHING*/})
  case "GAMEOVER":
	if (action.result.winner === state.user.name)
	  room["winner"] = true
	else
	  room["winner"] = false
	return Object.assign({}, state, { room: room/*ADD SOMETHING*/})
  case "RESET":
	delete room.winner
	return Object.assign({}, state, { room: room })
  case "QUIT":
    return Object.assign({}, state, { room: undefined, menu: "LISTING" })
  default:
    return state
  }
}


export default room
