export function isPlaying(users) {
	if (!users)
		return undefined
	const key = Object.keys(users).find(el => users[el].isPlaying === true)
	return users[key]
}