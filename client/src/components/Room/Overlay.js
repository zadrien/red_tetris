import React, { useEffect } from 'react'
import { removeOverlay } from '../../actions/Room'

import './style.css'
import { connect } from 'react-redux'

const displayStyle = {
	marginTop: ".5px",
	width: "360px",
	height: "720px",
	textAlign: "center",
	padding: "5px",
}

export const Overlay = ({elem}) => (
	<div className="board-overlay transparent d-flex col space-around" style={displayStyle}>
		{elem()}
	</div>
)
const OverlayDisplay = ({ room, onClick}) => {
	useEffect(() => {
		let interval = setTimeout(() => onClick(), 5000)

		return () => {
			clearInterval(interval)
		}
	}, [])
	return (
		<div className="board-overlay transparent d-flex col space-around" style={displayStyle}>
		<h6 className="title big">{ room.winner === true ? "You won" : "You lost"}</h6>
		<button className="bob-btn" onClick={onClick}>OK</button>
		</div>
	)
}

const mapStateToProps = (state) => {
	if (state.room)
		return {
			room: state.room
		}
	return {
		room: undefined,
	}
}

const mapDispatchToProps = (dispatch) => ({
	onClick: () => {
		dispatch(removeOverlay())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(OverlayDisplay)