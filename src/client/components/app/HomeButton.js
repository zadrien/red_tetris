import React from 'react';
import { connect } from 'react-redux';
import { onPlayerName, emitPlayer, onPlayer, onTrigger, onErrorName } from '../../actions/username';
import { setInterface } from '../../actions/menu';
import { onCreation, onFetch, emitFetch } from '../../actions/listing';
import { onJoined, onQuit, onGameOver, onHost, onPlayers, onDisplay, emitMove, onStart } from '../../actions/room';

import './home.css';
import '../../global.css';

const playBut = ({socket, onSubmit, initListener}) => {
  initListener()
  return (
    <div className="main-menu">
      <h1 className="title">Red Tetris</h1>
      <form id="form-name" className="d-flex col just-center" onSubmit={(e) => onSubmit(e)}>
        <input maxLength="15" type="text" name="nickname" placeholder="your nickname (max 15 chars)"/>
        <button type="submit" className="bob-btn secondary">Play</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  socket: state.socket,
  active: false,
  style: ownProps.style
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  initListener: () => {
    var socket = dispatch(onTrigger())
      
    socket.on("login", (data) => {
      console.log(data)
      if (data.err) {
        dispatch(onErrorName(data.err))
        return 
      }
      dispatch(onPlayerName(data.name));
      dispatch(onCreation());
      dispatch(onFetch());
//      dispatch(emitFetch({skip: 0, limit: 5}));
        dispatch(onJoined());
        dispatch(onHost());
        dispatch(onPlayers());
        dispatch(onDisplay());
        dispatch(onQuit());
        dispatch(onStart());
      dispatch(onGameOver());
      dispatch(setInterface("LISTING"));
    })
    
    window.addEventListener('keydown', function (e) { // replace this event
      if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1)
        e.preventDefault()
      var key = e.keyCode
      if (key == 38) { // UP
        dispatch(emitMove("UP"));
      } else if (key == 39) { // RIGHT
        dispatch(emitMove("RIGHT"));
      } else if (key == 40) { // DOWN
        dispatch(emitMove("DOWN"));
      } else if (key == 37) { // LEFT
        dispatch(emitMove("LEFT"));
      } else if (key == 32) { // SPACE
        dispatch(emitMove("SPACE"));
      }
    })

  },
  
  onSubmit: (e) => {
    e.preventDefault();
    
    let nickname = e.target.nickname.value;
    if (!nickname || nickname === "" || nickname.length === 0 || /\W+/.test(nickname))
      return ;
    
    dispatch(emitPlayer(nickname))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(playBut);
