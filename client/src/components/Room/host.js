import React from 'react'
import { connect } from 'react-redux'
import { startGame, emitStart, onDisplay, onPlayers } from '../../actions/Room'
import { Overlay } from './Overlay'

const displayStyle = {
	marginTop: ".5px",
	width: "360px",
	height: "720px",
	textAlign: "center",
	padding: "5px",
}

const WaitingHost = () => (
	<div>
		<h6 className="title big">Pending...</h6>
	</div>
)

const HostOverlay = ({onClick, id}) => (
	<div>
		<h6 className="title big">Ready ?</h6>
		<div className={`bob-btn secondary`} onClick={() => onClick(id)}>Start</div>
	</div>
)

export const Host = ({host,  onClick, id}) => {
	if (!host)
		return <Overlay elem={() => <WaitingHost/>}/>
	return <Overlay elem={() => <HostOverlay onClick={onClick} id={id}/>}/>
}

const mapStateToProps = (state, ownProps) => ({
	host: state.room.host,
	start: state.room.start,
	id: state.room.id
})

const mapDispatchToProps = (dispatch, ownProps) => ({ 
	onClick: (id) => {
		dispatch(emitStart(id))
		dispatch(onDisplay())
		dispatch(onPlayers())
		dispatch(startGame(true))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Host)
