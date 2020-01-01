export const onPlayerName = (name) => ({
    type: "PROFIL",
    state: "NEW",
    name
});

export const emitPlayer = (name) => ({
  emit: true,
  event: "login",
  payload: {
	name: name
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
