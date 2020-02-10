import React, { useEffect } from 'react'
import { removeOverlay } from '../../../actions/Room'

import '../style.css'
import { connect } from 'react-redux'

const OverlayDisplay = ({ room, onClick}) => {
	useEffect(() => {
		let interval = setTimeout(() => onClick(), 5000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className="board-overlay transparent d-flex col space-around">
			<h6 className="title big">GAME OVER</h6>
			<h6 className="title medium">{ room.winner === true ? "You won" : "You lost"}</h6>
			<button className="bob-btn" onClick={onClick}>OK</button>
		</div>
	)
}

const mapStateToProps = (state) => ({
	room: state.room
})

const mapDispatchToProps = (dispatch) => ({
	onClick: () => {
		dispatch(removeOverlay())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(OverlayDisplay)