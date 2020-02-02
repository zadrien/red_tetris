export const PAGINATION = "PAGINATION"

export const CURSOR_NEXT = () => ({
	state: PAGINATION,
	type: "CURSOR_NEXT"
})

export const CURSOR_PREV = () => ({
	state: PAGINATION,
	type: "CURSOR_PREV"
})

export const CURSOR_REFRESH = () => ({
	state: PAGINATION,
	type: "CURSOR_REFRESH"
})