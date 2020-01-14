import { emitPlayer } from '../actions/Profil'


export default function quickAccess(dispatch, location) {
  let reg = new RegExp('#(.+)')
  let data = reg.exec(location.hash)

  if (!data)
	return undefined
  
  //  console.log(data)
  let str = data[1]

  let i = str.indexOf('[')
  let end = str.lastIndexOf(']')

  if (end !== (str.length -1))
	return new Error('wrong syntax last index invalid')
  
  let roomID = str.slice(0, i)
  let user = str.slice(i + 1, str.length -1)

  console.log(roomID, user)

  dispatch(emitPlayer(user, { id: roomID }))
  return true
}
