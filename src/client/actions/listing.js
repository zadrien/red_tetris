export const LISTING = 'LISTING'


export const onFetch = () => ({
    event: "FETCH",
//    emit: true,
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

export const onLoading = (id) => {
  return {
    type: LISTING,
    state: "LOADING",
    id
  }
}


/*
** OBSOLETE
*/
export const onJoined = () => {
  return {
    event: "JOINED",
    handle: "LISTING",
    state: "JOINED",
  }
}


export const isCreating = (bool) => {
  return {
    type: LISTING,
    state: "CREATE",
    bool
  }
}

export const onCreation = () => {
  return {
    event: "CREATION",
    type: LISTING,
    handle: LISTING,
    state: "CREATE",
    
  }
}
