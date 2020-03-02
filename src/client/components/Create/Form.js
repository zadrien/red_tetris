import React from 'react';
import { connect } from 'react-redux';

import { isCreating, emitCreate } from '../../actions/Create'
import { setInterface, LISTING } from '../../actions/Menu'

import "./style.css";

export const Create = ({ isCreating, user, onSubmit, goBack}) => (
	<form onSubmit={(e) => onSubmit(e, user)} id="create-room-form">
		<h2 className="align-left title small mt-3">Room's name</h2>
		<input className="width-100 p-2" type="text" maxLength="25" id="room" name="room" placeholder="MY AWSOME ROOM"/>
		<h2 className="align-left title small mt-3">Game mode</h2>
		<div>
			<input type="radio" name="mode" defaultValue="classic" defaultChecked/>
			<span className="ml-1">Classic</span>
		</div>
		<div>
			<input type="radio" name="mode" defaultValue="invisible"/>
			<span className="ml-1">Invisible Piece</span>
		</div>
		<button type="submit" className="bob-btn secondary width-100">{isCreating ? 'Creating...' : 'Create'}</button>
		<div className="bob-btn secondary width-100" onClick={() => goBack()}>Back</div>
	</form>
)


const mapStateToProps = (state) => ({
	isCreating: state.isCreating,
	user: state.user
})

const mapDispatchToProps = (dispatch) => ({
	onSubmit: (e, user) => {
		e.preventDefault();
		let roomName = e.target.room.value,
		roomMode = e.target.mode.value;

		if (roomName.length > 0) {
			var data = {
				user,
				room : {
					name: roomName,
					mode: roomMode
				}
			}
			dispatch(isCreating())
			dispatch(emitCreate(data))
		}
	},
	
	goBack: () => {
		dispatch(setInterface(LISTING))
	}
})
export default connect(mapStateToProps, mapDispatchToProps)(Create);
