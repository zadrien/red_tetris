import React from 'react';
import { connect } from 'react-redux';
import { emitPlayer } from '../../actions/Profil';
//import { onCreation, onFetch } from '../../actions/Listing';
//import { onJoined, onQuit, onGameOver, onHost, onPlayers, onDisplay, emitMove, onStart } from '../../actions/Room';

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

    dispatch(emitPlayer(nickname))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(playBut);
