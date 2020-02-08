import React from 'react';
import { connect } from 'react-redux';

import Card from './card';
import './style.css';

const NoRoom = () => (
	<div className="room-list pd">
      <h2 className="title small my-auto">No room available</h2>
    </div>
)

const AvailableRoom = ({rooms}) => (
	<div className="room-list">
		{rooms.map((element, i) => (
			<Card key={i} room={element}/>
		))}
	</div>
)
export const List = ({ rooms, cursor }) => {
  	if (rooms) {
		if (rooms.list.length) {
			let render = rooms.list.slice(cursor.i, cursor.i + cursor.pad)
    		return <AvailableRoom rooms={render}/>
		}
	}
	return (<NoRoom/>)
}

const mapStateToProps = (state) => {
	if (state.rooms && state.rooms.list)
		return {
			rooms: state.rooms,
			cursor: state.cursor
		}
	return ({
		rooms: undefined,
		cursor: state.cursor
	})
}

export default connect(mapStateToProps, null)(List);
