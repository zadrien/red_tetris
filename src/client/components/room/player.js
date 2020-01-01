import React from 'react'
import { connect } from 'react-redux';
import PlayerCard from './playerCard'

const style = {
  marginLeft: "5px",
}

const Players = ({ players }) => {
  if (!players) {
    return (<div style={style}>No one</div>)
  }
  console.log("FUUUUC")
  console.log(players)
  return (
    <div className="d-flex row" style={style}>
      {players.map(p => (
        <PlayerCard player={p}/>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    players: state.room.players
  }
}

export default connect(mapStateToProps)(Players)
