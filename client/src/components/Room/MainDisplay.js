import React from 'react'
import { connect } from 'react-redux'

import Overlay from './Overlay'

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

const Board = ({ display }) => (
	<div style={displayStyle}>
		<Overlay/>
		{display.map((v, k) => render(v, k))}
	</div> 
)

export const Display = ({display}) => {
	if (!display)
		return <div style={displayStyle}/>
	return <Board display={display}/>
}


const mapStateToProps = (state) => ({
	display: state.room.display
})

export default connect(mapStateToProps)(Display)
