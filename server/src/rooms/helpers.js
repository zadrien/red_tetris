export function isPlaying(users) {
	const keys = Object.keys(users)
	if (!users)
		return undefined
	return keys.find(el => users[el].isPlaying === true)
}