export const LISTING = 'LISTING'


export const onFetch = () => ({
    event: "FETCH",
    handle: LISTING,
    state: "FETCH"
})

export const emitFetch = (payload) => ({
  emit: true,
  event: "FETCH",
  handle: LISTING,
  payload: payload,
  state: "FETCH",
})

export const onPrev = (nbr) => ({
  type: LISTING,
  state: "PREV",
  nbr
})

export const onNext = (nbr) => ({
  type: LISTING,
  state: "NEXT",
  nbr
})

export const emitJoin = (user, room) => ({
  emit: true,
  event: "JOIN",
  payload: {
    user,
    room
  },
})

/*
** OBSOLETE ?
*/
// export const onJoined = () => {
//   return {
//     event: "JOINED",
//     handle: "LISTING",
//     state: "JOINED",
//   }
// }

// OBSOLETE ?
export const isCreating = (bool) => {
  return {
    type: LISTING,
    state: "CREATE",
    bool
  }
}

export const onPing = () => ({
  type: "LISTING",
  handle: LISTING,
  event: "CHECK",
  state: "CHECK"
})
