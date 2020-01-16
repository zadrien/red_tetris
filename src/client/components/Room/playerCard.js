import React from 'react'
import { connect } from 'react-redux'

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  
  width: "auto",
  height: "236px",
  backgroundColor: "#dd4545",
  padding: "5px",
  borderRadius: "3px",

  marginRight: "5px"
}

const color = {
  ".": "Black",
  C: "Cyan",
  B: "Blue",
  O: "Orange",
  Y: "Yellow",
  G: "Green",
  V: "Violet",
  R: "Red"
}

const lineStyle = {
  display: "flex",
  flexDirection: "row"
}

const render = (line, i) => {
  return (
    <div key={i} style={lineStyle}>
      { line.map((v, k) => ( <div style={box(v)}/> )) }
    </div>
  )
}

const box = (c) => {
  return {
    width: "10px",
    height: "10px",
    backgroundColor: color[c]
  }
}

const Card = ({ player }) => (
  <div style={style}>
    <h6>{player.name}</h6>
    <div>
      {player.display.map((v, k) => render(v, k))}
    </div>
  </div>
)


const mapStateToProps = (state, ownProps) => ({
  player: ownProps.player
})

//export default Card
export default connect(mapStateToProps)(Card)
