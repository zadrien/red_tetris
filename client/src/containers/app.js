import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import Play from '../components/app/HomeButton';
import ListingRooms from './ListingRooms';
import Room from './Room';
import Create from './Create'

import { onPlayer as onLogin } from '../actions/Profil'
import { onCreation, onFetch, onPing } from '../actions/Listing';
import { onJoined, onQuit, onGameOver, onHost, onPlayers, onDisplay, emitMove, onStart } from '../actions/Room';
import quickAccess from '../utils/quickAccess'

import './style.css';
import '../global.css';

const App = ({ menu, initListener }) => {
  useEffect(() => {
    initListener()
  }, [])
  
  if (!menu) {
    return (
      <div className="menu-screen">
        <Play />
      </div>
    )
  } else if (menu === 'ROOM') {
    return (<Room />)
  } else if (menu === 'LISTING') {
    return (
      <div className="menu-screen">
        <ListingRooms />
      </div>
    )
  } else if (menu === 'CREATE') {
    return (
      <div className="menu-screen">
        <Create />
      </div>
    )
  }
  return null
}

const mapStateToProps = (state) => {
  return {
    menu: state.menu,
  }
}

const mapDispatchToProps = (dispatch) => ({
  initListener: () => {
    dispatch(onCreation())
    dispatch(onFetch())
    dispatch(onJoined())
    dispatch(onHost())
    dispatch(onPlayers())
    dispatch(onDisplay())
    dispatch(onQuit())
    dispatch(onStart())
    dispatch(onGameOver())
    dispatch(onPing())
    
    dispatch(onLogin())
    window.addEventListener('keydown', function (e) { // replace this event
      if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1)
        e.preventDefault()
      var key = e.keyCode
      if (key === 38) { // UP
        dispatch(emitMove("UP"));
      } else if (key === 39) { // RIGHT
        dispatch(emitMove("RIGHT"));
      } else if (key === 40) { // DOWN
        dispatch(emitMove("DOWN"));
      } else if (key === 37) { // LEFT
        dispatch(emitMove("LEFT"));
      } else if (key === 32) { // SPACE
        dispatch(emitMove("SPACE"));
      }
    })
    console.log(window.location)
//    quickAccess(dispatch, window.location)
    
  }
  
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
