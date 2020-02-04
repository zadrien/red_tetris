export const ROOM = "ROOM"

export const onJoined = () => ({
  event: "JOINED",
  handle: ROOM,
  state: "JOINED"
})

export const onDisplay = () => {
    return {
	event: "DISPLAY",
	handle: ROOM,
	state: "DISPLAY",
    }

}

export const onHost = () => {
    return {
	event: "HOST",
	handle: ROOM,
	state: "HOST",
    }
}

export const onPlayers = () => {
    return {
	event: "PLAYERS",
	handle: ROOM,
	state: "PLAYERS",
    }
}

export const onStart = () => ({
  event: "START",
  handle: ROOM,
  state: "START"
})

export const emitStart = (id) => {
  return {
    event: "START",
    emit: true,
    payload: id
  }
}


export const emitMove = (move) => ({
    event: "CONTROLLER",
    emit: true,
    payload: move
})


export const startGame = (start) => {
  return {
    type: "ROOM",
    state: "START",
    start
  }
}

export const onGameOver = () => ({
	event: "GAMEOVER",
	handle: "ROOM",
	state: "GAMEOVER"
})

export const emitQuit = (room) => ({
  emit: true,
  event: "LEAVE",
  payload: room
})

export const onQuit = () => ({
  event: "LEAVE",
  handle: ROOM,
  state: "QUIT",
})

export const removeOverlay = () => ({
  type: ROOM,
  state: "RESET",
  reset: true
})
