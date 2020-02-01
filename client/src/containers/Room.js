import React from 'react';
import { connect } from 'react-redux';
import { emitQuit, winValidate } from '../actions/Room'

import Board from '../components/Room/MainDisplay'
import Players from '../components/Room/Player'
import Host from '../components/Room/host'

import '../global.css';

export const Room = ({ room, onLeave, onWin }) => {

  if (room) {
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

        {room.winner === undefined ? null :
         (room.winner === true ? <div onClick={onWin}>You won</div> : (room.winner === false ? <div onClick={onWin}>You lose</div>: null))
        
        }
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
  onLeave: (room) => {
    console.log("quit lobby!")
    dispatch(emitQuit(room))
  },
  onWin: () => {
    dispatch(winValidate())
  }
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Room);
