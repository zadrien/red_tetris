import React from 'react';
import { connect } from 'react-redux';
import Card from './card';
import { emitFetch } from '../../actions/Listing'

import './style.css';

const List = ({rooms, style, fetch}) => {
  if (!rooms || rooms.list.length === 0) {
    fetch()
    return (
      <div className="room-list">
        <h2 className="title small my-auto">No room available</h2>

      </div>
    )
  }
//  console.log("rooms list: ", rooms.list)
  if (rooms.list) {
    return (
      <div className="room-list">
        {rooms.list.map((v, k) => (
          <Card key={k} id={v.id} room={v}/>
        ))}
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
//     dispatch(emitFetch({skip: 0, limit: 5 }))
   }
})
export default connect(mapStateToProps, mapDispatchToProps)(List);
