import React from 'react'
import { connect } from 'react-redux'

import {CURSOR_NEXT, CURSOR_PREV } from '../../actions/Pagination.js'

export const Pagination = ({next, prev}) => (
	<div className="d-flex">
    	<div className="bob-btn secondary width-100" id="prev" onClick={prev}>
			Prev
		</div>
    	<div className="bob-btn secondary width-100" id="next" onClick={next}>
			Next
		</div>
  	</div>
)

const mapDispatchToProps = (dispatch) => ({
	next: () => {
		dispatch(CURSOR_NEXT())
	},
  	prev: () => {
		dispatch(CURSOR_PREV())
  	}
})

export default connect(null, mapDispatchToProps)(Pagination)
