import { emitPlayer } from '../actions/Profil'

export default function quickAccess(dispatch, hash) {
	if (!hash.length)
		throw "Invalid URL"
	let str = hash.slice(1)

	if (!str)
		throw "Invalid URL"
	let i = str.indexOf('[')
	let end = str.lastIndexOf(']')

	if (end === -1 || i === -1)
		throw "Invalid URL"
	let roomID = str.slice(0, i)
	let user = str.slice(++i , end)

	dispatch(emitPlayer(user, { id: roomID }))
}
