export const PAGINATION = "PAGINATION"

export const CURSOR_NEXT = () => ({
	type: PAGINATION,
	state: "CURSOR_NEXT"
})

export const CURSOR_PREV = () => ({
	type: PAGINATION,
	state: "CURSOR_PREV"
})

export const CURSOR_REFRESH = () => ({
	type: PAGINATION,
	state: "CURSOR_REFRESH"
})