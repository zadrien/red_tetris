import React from 'react'
import { connect } from 'react-redux';
import { Card } from './Card'

const style = {
	display: "flex",
	flexWrap: "wrap",
	marginLeft: "5px",
}

export const Players = ({ players }) => {
	if (!players)
		return null
	return (
		<div className="d-flex row" style={style}>
			{players.map((p, index) => (
				<Card key={index} player={p}/>
			))}
		</div>
	)
}

const mapStateToProps = (state) => ({
	players: state.room.players
})

export default connect(mapStateToProps)(Players)
