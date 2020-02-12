import React from 'react'
import { connect } from 'react-redux'

import GameOver from './Overlay/GameOver'
import Host from './Overlay/Host'

const color = {
	".": "Black",
	C: "Cyan",
	B: "Blue",
	O: "Orange",
	Y: "Yellow",
	G: "Green",
	V: "Violet",
	R: "Red",
	M: "Grey"
}

const box = (c) => ({backgroundColor: color[c]})

const render = (line, index) => (
	<div key={index} className="board-row">
		{ line.map((v, k) => (
			<div key={k} className="board-box" style={box(v)}/>
		))}
	</div>
)

const Board = ({ display, Overlay }) => (
	<div className="board">
		{Overlay ? <Overlay/> : null}
		{display.map((v, k) => render(v, k))}
	</div> 
)

export const Display = ({room, display, isStarted}) => {
	if (!display)
		return <div className="board"/>
	if (room.hasOwnProperty('winner'))
		return (<Board display={display} Overlay={() => <GameOver/>}/>)
	if (!isStarted)
		return <Board display={display} Overlay={() => <Host/>}/>
	return <Board display={display} />
}


const mapStateToProps = (state) => ({
	room: state.room,
	display: state.room.display,
	isStarted: state.room.start,
	
})

export default connect(mapStateToProps)(Display)
