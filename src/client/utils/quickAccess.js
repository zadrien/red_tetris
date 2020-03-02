import { emitPlayer } from '../actions/Profil'

export default function quickAccess(dispatch, hash) {
	if (!hash.length)
		return false
	let str = hash.slice(1)
	let i = str.indexOf('[')
	let end = str.length -1
	if (i === -1 || str[end] !== ']')
		throw new Error("Invalid URL")
	let roomID = str.slice(0, i)
	let user = str.slice(++i , end)
	return dispatch(emitPlayer(user, { id: roomID }))
}
