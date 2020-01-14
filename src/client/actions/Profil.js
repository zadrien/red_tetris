export const onPlayerName = (name) => ({
    type: "PROFIL",
    state: "NEW",
    name
});

export const emitPlayer = (name, room = {}) => ({
  emit: true,
  event: "login",
  payload: {
	name: name,
	room: room
  }
})

export const onPlayer = () => ({
  event: "login",
  handle: "PROFIL",
  state: "NEW"
})

export const onTrigger = () => ({
  type: "TRIGGER",
  trigger: true
})

export const onErrorName = (err) => ({
  type: "PROFIL",
  state: "ERROR",
  err
})
