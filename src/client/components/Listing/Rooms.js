import React from 'react';
import { connect } from 'react-redux';
import Card from './card';
import { emitFetch } from '../../actions/listing'

import './style.css';

const List = ({rooms, style, fetch}) => {
  console.log("rooms:", rooms)
  console.log(emitFetch())
  if (!rooms || rooms.list.length == 0) {
    fetch()
    return (
      <div className="room-list">
        <h2 className="title small my-auto">No room available</h2>

      </div>
    )
  }
  console.log("rooms list: ", rooms.list)
  if (rooms.list) {
    var r = rooms.list
    return (
      <div className="room-list">
        {r.map((v, k) => {
          console.log(v)
          return <Card key={k} id={v.id} room={v}/>
        })}
      </div>
      
    )
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetch: () => {
    console.log("NOPE")
    dispatch(emitFetch({skip: 0, limit: 5 }))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(List);
