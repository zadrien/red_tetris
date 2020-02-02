import React from 'react'
import { connect } from 'react-redux'

import {CURSOR_NEXT, CURSOR_PREV } from '../../actions/Pagination.js'

export const Pagination = ({next, prev}) => (
	<div className="d-flex">
    	<div className="bob-btn secondary width-100" onClick={() => prev()}>
			Prev
		</div>
    	<div className="bob-btn secondary width-100" onClick={() => next()}>
			Next
		</div>
  	</div>
)

const mapDispatchToProps = (dispatch) => ({
	next: () => {
		dispatch(CURSOR_NEXT())
	},
  	prev: (data) => {
		dispatch(CURSOR_PREV())
  	}
})


export default connect(null, mapDispatchToProps)(Pagination)
