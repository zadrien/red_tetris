import React from 'react'
import { connect } from 'react-redux'
import { startGame, emitStart, onDisplay, emitMove, onPlayers } from '../../actions/room'

const host = ({ host, start, id, onClick }) => {
  if (!host) {
    return null
  }

  return (
    <div>
      <div className={`bob-btn secondary ${start == true ? 'disabled' : ''}`} onClick={() => onClick(id)}>Start</div>
    </div>
    
  )
}


const mapStateToProps = (state, ownProps) => ({
  host: state.room.host,
  start: state.room.start,
  id: state.room.id
})

const mapDispatchToProps = (dispatch, ownProps) => ({ 
  onClick: (id) => {
    dispatch(emitStart(id))
    dispatch(onDisplay())
    dispatch(onPlayers())
    dispatch(startGame(true))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(host)
