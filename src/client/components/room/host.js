import React from 'react'
import { connect } from 'react-redux'
import { startGame, emitStart, onDisplay, emitMove, onPlayers } from '../../actions/room'

const host = ({ host, start, onClick }) => {
  console.log("YOOOOOe", host)
  if (!host) {
    return null
  }

  return (
    <div>
      <div className={`bob-btn ${start == true ? 'disabled' : ''}`} onClick={onClick}>Start</div>
    </div>
    
  )
}


const mapStateToProps = (state, ownProps) => ({
  host: state.room.host,
  start: state.room.start
})

const mapDispatchToProps = (dispatch, ownProps) => ({ 
  onClick: () => {
    dispatch(emitStart())
    dispatch(onDisplay())
    dispatch(onPlayers())
    dispatch(startGame(true))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(host)
