import React from 'react';
import { connect } from 'react-redux';

import { isCreating, onCreation, emitCreate } from '../../actions/Create'
import Nav from '../Interface/Navigate'
import "./style.css";

const Create = ({ isCreating, onSubmit, user}) => (
  <form onSubmit={(e) => onSubmit(e, user)} id="create-room-form">
    <h2 className="align-left title small mt-3">Room's name</h2>
    <input className="width-100 p-2" type="text" maxLength="25" id="room" name="room" placeholder="MY AWSOME ROOM"/>
    <h2 className="align-left title small mt-3">Game mode</h2>
    <div>
      <input type="radio" name="mode" defaultValue="classic" defaultChecked/>
      <span className="ml-1">Classic</span>
    </div>
    <div>
      <input type="radio" name="mode" defaultValue="invisible"/>
      <span className="ml-1">Invisible Piece</span>
    </div>
    <button type="submit" className="bob-btn secondary width-100">{isCreating ? 'Creating...' : 'Create'}</button>
    <Nav to="LISTING" />
  </form>
)


const mapStateToProps = (state) => ({
  isCreating: state.isCreating,
  user: state.user
  
})

const mapDispatchToProps = (dispatch, e) => ({
  onSubmit: (e, user) => {
    e.preventDefault();

    let roomName = e.target.room.value,
        roomMode = e.target.mode.value;

    if (roomName.length > 0) {
      var data = {
        user,
        room : {
          name: roomName,
          mode: roomMode
        }
      }
      dispatch(isCreating())
      dispatch(onCreation())
      dispatch(emitCreate(data))
    }
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Create);
