import React from 'react'
import { connect } from 'react-redux'

import OverlayEndGame from './Overlay'
import Host from './host'

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

const box = (c) => ({
    margin: ".5px",
    width: "35px",
    height: "35px",
    backgroundColor: color[c]
})


const displayStyle = {
	marginTop: ".5px",
	width: "auto",
	height: "auto",
	backgroundColor: "#dd4545",
	textAlign: "center",
	padding: "5px",
	borderRadius: "5px"
}

const lineStyle = {
	display: "flex",
	flexDirection: "row",
	justifyContent: "center"
}
const render = (line, index) => (
	<div key={index} style={lineStyle}>
		{ line.map((v, k) => (
			<div key={k} style={box(v)}/>
		))}
	</div>
)

const Board = ({ display, Overlay }) => (
	<div style={displayStyle}>
		{Overlay ? <Overlay/> : null}
		{display.map((v, k) => render(v, k))}
	</div> 
)

export const Display = ({display, isStarted, isHost, winner}) => {
	if (winner)
		return (<Board display={display} Overlay={() => <OverlayEndGame/>}/>)
	if (!display)
		return <div style={displayStyle}/>
	if (!isStarted)
		return <Board display={display} Overlay={() => <Host/>}/>
	return <Board display={display} />
}


const mapStateToProps = (state) => ({
	display: state.room.display,
	isStarted: state.room.start,
	isHost: state.room.host,
	winner: state.room.winner
})

export default connect(mapStateToProps)(Display)
