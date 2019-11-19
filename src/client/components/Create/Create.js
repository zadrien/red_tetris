import React from 'react';
import { connect } from 'react-redux';

import { emitJoin } from '../../actions/socket';
import { isCreating, onCreation, emitCreate } from '../../actions/create'

import "./style.css";

const Create = ({ isCreating, onSubmit, user}) => (
  <form onSubmit={(e) => onSubmit(e, user)} id="create-room-form">
    <h2 className="align-left title small mt-3">Room's name</h2>
    <input className="width-100 p-2" type="text" id="room" name="room" placeholder="MY AWSOME ROOM"/>
    <h2 className="align-left title small mt-3">Game mode</h2>
    <div>
      <input type="radio" name="mode" defaultValue="classic" checked/>
      <span className="ml-1">Classic</span>
    </div>
    <div>
      <input type="radio" name="mode" defaultValue="invisible"/>
      <span className="ml-1">Invisible Piece</span>
    </div>
    <button type="submit" className="bob-btn secondary width-100">{isCreating ? 'Creating...' : 'Create'}</button>
  </form>
)


const handleForm = (e) => {
  e.preventDefault();
  var room = { }
  console.log(e.target);
  room["name"] = e.target.room.value || 'Unamed room'
  room["mode"] = e.target.mode.value

  console.log("room:", room)

  return room

}

const mapStateToProps = (state) => ({
  isCreating: state.isCreating,
  user: state.user
  
})
const mapDispatchToProps = (dispatch, e) => ({
  onSubmit: (e, user) => {
    var room = handleForm(e)
    var data = {
      user,
      room
    }
    dispatch(isCreating())
    dispatch(onCreation())
    console.log(data)
    dispatch(emitCreate(data))
    
    //dispatch(isJoining(true, r))
    //dispatch(emitJoin(r))
    // dispatch(onPlayers())
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Create);
