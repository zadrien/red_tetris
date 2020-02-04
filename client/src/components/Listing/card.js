import React from 'react';
import { connect } from 'react-redux';
import { emitJoin } from '../../actions/Listing'

const Card = ({room, onClick}) => (
	<div disabled={room.isStarted ? true : false} onClick={onClick} className="room-list-item">
		<div className="description">
			<p className="name">{room.name}</p>
			<p className="mode">{room.mode} [{room.nbrUser ? room.nbrUser : 0}/10]</p>
		</div>
		<div className='join-button'>
			{room.isStarted ? <div disabled={true}>IN-GAME</div> : <div>JOIN</div>}
		</div>
	</div>
)

export const RoomCard = ({ room, user, onClick}) => {  
	if (room) {
		if (!room.isStarted)
			return <Card room={room} onClick={() => {onClick(user)}}/>
		return <Card room={room}/>
	}
	return null
}



const mapStateToProps = (state, ownProps) => ({
	room: ownProps.room,
	user: state.user,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	onClick: (user) => {
		dispatch(emitJoin(user, ownProps.room))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomCard);
