import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { emitJoin, emitPing } from '../../actions/Listing'

const Room = ({ room, user, onClick, Ping }) => {  
  if (room) {
    return (
      <div disabled={room.isStarted ? true : false} onClick={() => onClick(user)} className="room-list-item">
        <div className="description">
          <p className="name">{room.name}</p>
          <p className="mode">{room.mode} [{room.nbrUser ? room.nbrUser : 0}/10]</p>
        </div>
       <div className='join-button'>
         {room.isStarted ? <div disabled={true}>In-Game</div> : <div>JOIN</div>}
       </div>
      </div>
    )
  }
  return null
}



const mapStateToProps = (state, ownProps) => ({
  room: ownProps.room,
  user: state.user,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: (user) => {
    console.log("Joining the room:", ownProps.room, ownProps.id)
    dispatch(emitJoin(user, ownProps.room))
  },

  Ping: (room) => {
    console.log("Ping room:", room.name)
    dispatch(emitPing(room))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Room);
