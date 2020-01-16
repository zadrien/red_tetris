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
    margin: ".5px",
    width: "35px",
    height: "35px",
    backgroundColor: color[c]
  }
}

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
const render = (line, index) => {
  return <div key={index} style={lineStyle}>{ line.map((v, k) => (
    <div key={k} style={box(v)}/>
  ))}</div>
}


const Display = ({display}) => {
  console.log(display)
  if (!display) {
    return (
      <div style={displayStyle}>
      </div>
    )
  }

  return (
    <div style={displayStyle}>
      {display.map((v, k) => render(v, k))}
    </div> 
  )
}


const mapStateToProps = (state) => ({
  display: state.room.display
})

export default connect(mapStateToProps)(Display)
