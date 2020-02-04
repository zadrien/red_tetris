import { emitPlayer } from '../actions/Profil'

export default function quickAccess(dispatch, hash) {
	if (!hash.length)
		return
	let str = hash.slice(1)

	if (!str)
		throw new Error("Invalid URL")
	let i = str.indexOf('[')
	let end = str.lastIndexOf(']')

	if (end === -1 || i === -1)
		throw new Error("Invalid URL")
	let roomID = str.slice(0, i)
	let user = str.slice(++i , end)

	dispatch(emitPlayer(user, { id: roomID }))
}
