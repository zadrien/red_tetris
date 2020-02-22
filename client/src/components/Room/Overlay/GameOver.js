import React, { useEffect } from 'react'

import '../style.css'
import { connect } from 'react-redux'

const OverlayDisplay = ({ room }) => (
	<div className="board-overlay transparent d-flex col space-around">
		<h6 className="title big">GAME OVER</h6>
		<h6 className="title medium">{ room.winner === true ? "You won" : "You lost"}</h6>
	</div>
)

const mapStateToProps = (state) => ({
	room: state.room
})

export default connect(mapStateToProps, null)(OverlayDisplay)