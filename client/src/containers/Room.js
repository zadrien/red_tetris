import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { emitQuit, emitMove } from '../actions/Room'

import Board from '../components/Room/MainDisplay'
import Players from '../components/Room/Player'
import Host from '../components/Room/host'

import '../global.css';

export const Room = ({ room, onStartUp, enableController, disableController, onLeave }) => {
	useEffect(() => {
		onStartUp(room)
		enableController()

		return () => {
			disableController()
		}
	}, [])

	if (room)
		return (
			<div>
				<div className="align-center width-100">
				<h1 className="title medium">{room.name}</h1>
			</div>
			<div className="d-flex just-center mx-auto width-25">
				<Host />
				<div className="bob-btn secondary" onClick={() => onLeave(room)}>Leave</div>
			</div>
			<div className="p-2 width-100 d-flex row just-center mx-auto">
				<Board/>
				<Players />
			</div>
	
			</div>
		)
	return null
}

const mapStateToProps = (state) => ({
		room: state.room
})

const mapDispatchToProps = (dispatch) => () => {
	const controller = (e) => {
		if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1)
				e.preventDefault()
		var key = e.keyCode
		if (key === 38) { // UP
			console.log("UP")
			dispatch(emitMove("UP"));
		} else if (key === 39) { // RIGHT
			dispatch(emitMove("RIGHT"));
		} else if (key === 40) { // DOWN
			dispatch(emitMove("DOWN"));
		} else if (key === 37) { // LEFT
			dispatch(emitMove("LEFT"));
		} else if (key === 32) { // SPACE
			dispatch(emitMove("SPACE"));
		}
	}

	const changeURL = (room) => {
		window.history.pushState(null,null, `#${room.id}`)
		document.title = room.name.toUpperCase()
	}


	return ({
		onStartUp: (e) => {
			changeURL(e)
		},
		enableController: () => {
			window.addEventListener('keydown', controller)
		},
		disableController: () => {
			window.removeEventListener('keydown', controller)
		},
		onLeave: (room) => {
			dispatch(emitQuit(room))
			window.history.back()
			document.title = "Red Tetris"
		}
	})
}
export default connect(mapStateToProps, mapDispatchToProps)(Room);
