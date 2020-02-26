import React from 'react'
import { connect } from 'react-redux'
import { startGame, emitStart, onDisplay, onPlayers } from '../../../actions/Room'

const WaitingForHost = () => (
	<div className="board-overlay transparent d-flex col space-around">
		<h6 className="title medium">Pending...</h6>
	</div>
)

const HostOverlay = ({onClick, id}) => (
	<div className="board-overlay transparent d-flex col space-around">
		<h6 className="title big">Ready ?</h6>
		<div className="bob-btn secondary" onClick={() => onClick(id)}>Start</div>
	</div>
)

export const Host = ({host, onClick, id}) => {
	if (!host)
		return <WaitingForHost/>
	return <HostOverlay onClick={onClick} id={id}/>
}

const mapStateToProps = (state) => ({
	host: state.room.host,
	id: state.room.id
})

const mapDispatchToProps = (dispatch) => ({ 
	onClick: (id) => {
		dispatch(emitStart(id))
		dispatch(onDisplay())
		dispatch(onPlayers())
		dispatch(startGame(true))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Host)
