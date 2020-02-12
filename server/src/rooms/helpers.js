export function isPlaying(users) {
	if (!users)
		return undefined
	const keys = Object.keys(users)
	return keys.find(el => users[el].isPlaying === true)
}