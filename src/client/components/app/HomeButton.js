import React from 'react';
import { connect } from 'react-redux';
import { setInterface } from '../../actions/menu'
import { onCreation, onFetch, emitFetch } from '../../actions/listing'
import { onJoined, onQuit, onHost, onPlayers, onDisplay, emitMove } from '../../actions/room'


const playBut = ({style, onClick}) => {
  return (
    <div className="main-menu">
      <h1 className="title">Red Tetris</h1>
      <div className="bob-btn secondary" onClick={onClick}>Play</div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  active: false,
  style: ownProps.style
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setInterface("LISTING"))
    dispatch(onCreation())
    dispatch(onFetch())
    dispatch(emitFetch({skip: 0, limit: 5}))
    dispatch(onJoined())
    dispatch(onHost())
    dispatch(onPlayers())
    dispatch(onDisplay())
    dispatch(onQuit())

    window.addEventListener('keydown', function (e) { // replace this event
      console.log(e.keyCode)
      var key = e.keyCode
      if (key == 38) { // UP
        dispatch(emitMove("UP"))
      } else if (key == 39) { // RIGHT
        dispatch(emitMove("RIGHT"))
      } else if (key == 40) { // DOWN
        dispatch(emitMove("DOWN"))
      } else if (key == 37) { // LEFT
        dispatch(emitMove("LEFT"))
      } else if (key == 32) { // SPACE
        dispatch(emitMove("SPACE"))
      }
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(playBut);
