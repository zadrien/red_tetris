import React from 'react';
import { connect } from 'react-redux';
import { onLoading, onJoined, emitJoin } from '../../actions/listing'

const room = ({ room, user, onClick }) => {
  if (room) {
    return (
      <div onClick={() => onClick(user)} className="room-list-item">
        <div className="description">
          <p className="name">{room.name}</p>
          <p className="mode">{room.mode}</p>
        </div>
        <div className='join-button'>
          {room.isLoading ?
           <div disabled={true}>Loading...</div> : <div>JOIN</div>
          }
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
    //  dispatch(onLoading(ownProps.id))
    //    dispatch(onJoined())
    dispatch(emitJoin(user, ownProps.room))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(room);
