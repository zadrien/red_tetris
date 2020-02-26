import React from 'react'

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
	backgroundColor: color[c]
})

const render = (line, i) => (
	<div key={i} className="board-row">
		{ line.map((v, k) =>
		<div
			key={k}
			className="mini-board-box"
			style={box(v)}
			/> )}
	</div>
)


export const Card = ({ player }) => (
	<div className="mini-board">
		<h6>{player.name}</h6>
		<div>
			{player.display.map((value, key) => render(value, key))}
		</div>
	</div>
)
