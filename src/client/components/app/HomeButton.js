import React from 'react';
import { connect } from 'react-redux';
import { onPlayerName } from '../../actions/username';
import { setInterface } from '../../actions/menu';
import { onCreation, onFetch, emitFetch } from '../../actions/listing';
import { onJoined, onQuit, onGameOver, onHost, onPlayers, onDisplay, emitMove, onStart } from '../../actions/room';

import './home.css';
import '../../global.css';

const playBut = ({onSubmit}) => {
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
  active: false,
  style: ownProps.style
})

const mapDispatchToProps = (dispatch, ownProps) => ({

  onSubmit: (e) => {
    e.preventDefault();

    let nickname = e.target.nickname.value;
    if (!nickname || nickname === "" || nickname.length === 0 || /\W+/.test(nickname))
      return ;

    dispatch(onPlayerName(nickname));
    dispatch(setInterface("LISTING"));
    dispatch(onCreation());
    dispatch(onFetch());
    dispatch(emitFetch({skip: 0, limit: 5}));
    dispatch(onJoined());
    dispatch(onHost());
    dispatch(onPlayers());
    dispatch(onDisplay());
    dispatch(onQuit());
    dispatch(onStart());
    dispatch(onGameOver());
    
    window.addEventListener('keydown', function (e) { // replace this event
      console.log(e.keyCode)
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(playBut);
