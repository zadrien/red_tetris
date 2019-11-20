import React from 'react';
import { connect } from 'react-redux';

import { Display, Players, Host } from '../components/room'
import { emitQuit } from '../actions/room'

import '../global.css';

const AppStyle = {
  margin: "auto",
  width: "100%",
  height: "700px",
  display: "flex",
  flexDirection: "column",
  border: "1px solid blue",
  alignItems: "center"
}

const Room = ({ room, onLeave }) => {

  if (room) {
    return (
      <div>
        <div className="align-center width-100">
          <h1 className="title medium">{room.name}</h1>
        </div>

        <div className="d-flex just-center mx-auto width-25">
          <Host />
          <div className="bob-btn secondary" onClick={onLeave}>Leave</div>
        </div>

        <div className="p-2 width-100 d-flex row just-center mx-auto">
          <Display/>
          {/* <Players /> */}
        </div>
      </div>
    )
  }
  return null
}

const mapStateToProps = (state) => {
  return {
    room: state.room
  }
}

const mapDispatchToProps = (dispatch) => ({
  onLeave: () => {
    console.log("quit lobby!")
    dispatch(emitQuit())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Room);
