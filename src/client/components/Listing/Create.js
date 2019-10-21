import React from 'react';
import { connect } from 'react-redux';

import { emitJoin } from '../../actions/socket';
import { isJoining, onPlayers } from '../../actions/rooms';

const Create = ({onSubmit}) => (
  <form onSubmit={(e) => onSubmit(e)}>
    <label id="room">Room's Name</label><br/>
    <input type="text" id="room" name="room" />
    <h2>Game Mode</h2>
    <input type="radio" name="mode" defaultValue="classic"/>Classic<br/>
    <input type="radio" name="mode" defaultValue="invisible"/>Invisible Piece<br/>
    <input type="Submit" defaultValue="Submit"/>
  </form>
)

const handleForm = (e) => {
  e.preventDefault();
  var room = {
    create: true
  }


  room["name"] = e.target.room.value
  room["mode"] = e.target.mode.value

  console.log("room:", room)

  return room

}

const mapDispatchToProps = (dispatch, e) => ({
  onSubmit: (e) => {
    console.log("here")
    var r = handleForm(e)
    dispatch(isJoining(true, r))
    dispatch(emitJoin(r))
    dispatch(onPlayers())
  }
})
export default connect(null, mapDispatchToProps)(Create);