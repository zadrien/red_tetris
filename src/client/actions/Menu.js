export const INTERFACE = 'INTERFACE';

export const LISTING = 'LISTING'
export const CREATE = 'CREATE'
export const ROOM = 'ROOM'

export const setInterface = (menu) => {
  return {
    type: INTERFACE,
    state: "MENU",
    menu
  }
}
  
export const createRoom = (bool) => {
  return  {
    type: INTERFACE,
    state: "CREATE",
    bool
  }
}
