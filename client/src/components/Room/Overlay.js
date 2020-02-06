import React, { useEffect } from 'react'
import { removeOverlay } from '../../actions/Room'

import './style.css'
import { connect } from 'react-redux'
const displayStyle = {
	// zIndex: 9,
	// position: "absolute",
	marginTop: ".5px",
	width: "360px",
	height: "720px",
	//backgroundColor: "grey",
	textAlign: "center",
	padding: "5px",
	// opacity: 0.8
}

const OverlayDisplay = ({ room, onClick}) => {
	useEffect(() => {
		let interval = setTimeout(() => onClick(), 3000)

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
export const Overlay = ({ room, onClick }) => {
	if (!room.hasOwnProperty("winner"))
		return null
	return <OverlayDisplay room={room} onClick={onClick}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Overlay)