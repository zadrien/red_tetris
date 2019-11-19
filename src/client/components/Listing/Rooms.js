import React from 'react';
import { connect } from 'react-redux';
import Card from './card';

import './style.css';

const List = ({rooms, start, style, onClick}) => {
  console.log("rooms:", rooms)
  if (!rooms || rooms.list.length == 0) {
    return (
      <div className="room-list">
        <h2>No rooms available</h2>
      </div>
    )
  }
  console.log("rooms list: ", rooms)
  if (rooms["list"]) {
    var render = []
    for (var i = rooms.start; i < rooms.start + 5 && i < rooms.nbr; i++) {
      render.push({ id: i, room: rooms.list[i] })
    }
    console.log(render)
    return (
      <div className="room-list">
        {render.map((v, k) => (<Card key={k} id={v.id} room={v.room}/>))}
      </div>
    )
  }
  return null
}


const mapStateToProps = (state, ownProps) => ({
  rooms: state.rooms,
  style: ownProps.style
})

export default connect(mapStateToProps, null)(List);
