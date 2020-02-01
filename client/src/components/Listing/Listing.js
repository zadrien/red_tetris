import React from 'react';
import { connect } from 'react-redux';

import Card from './card';
import './style.css';

export const List = ({ rooms }) => {
  if (rooms && rooms.list) {
    return (
      <div className="room-list">
        {rooms.list.map((v, k) => (
          <Card key={k} id={v.id} room={v}/>
        ))}
      </div>
      
    )
  }
  return (
    <div className="room-list">
      <h2 className="title small my-auto">No room available</h2>
      
    </div>
  )
}

const mapStateToProps = (state) => ({
  rooms: state.rooms,
})

export default connect(mapStateToProps, null)(List);
