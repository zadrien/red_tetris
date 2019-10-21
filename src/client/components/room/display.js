import React from 'react'
import { connect } from 'react-redux'

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

const box = (c) => {
  return {
    width: "20px",
    height: "20px",
    backgroundColor: color[c]
  }
}

const displayStyle = {
  width: "200px",
  height: "400px",
  backgroundColor: "black"
}

const lineStyle = {
  display: "flex",
  flexDirection: "row"
}
const render = (line) => {
  return <div style={lineStyle}>{ line.map((v, k) => (
    <div style={box(v)}/>
  ))}</div>
}


const Display = ({display}) => {
  if (!display) {
    return (
      <div style={displayStyle}>
      </div>
    )
  }

  return (
    <div style={displayStyle}>
      {display.map((v, k) => render(v))}
    </div> 
  )
}


const mapStateToProps = (state) => ({
  display: state.room.display
})

export default connect(mapStateToProps)(Display)