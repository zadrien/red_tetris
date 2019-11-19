import React from 'react';
import { connect } from 'react-redux';

import { Display, Players, Host } from '../components/room'
import { emitQuit } from '../actions/room'

import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'

const AppStyle = {
  margin: "auto",
  width: "500px",
  height: "700px",
  display: "flex",
  flexDirection: "column",
  border: "1px solid blue",
  alignItems: "center"
}

const Room = ({ room, onLeave }) => {

  if (room) {
    return (
      <div>
        <div className="row">
          <Col>
            <div style={AppStyle}>
              <div className=""><h1>{room.name}</h1>
                <div onClick={onLeave}>Leave</div>
                <Host />
              </div>
              <div className="row">
                <Display/>
              </div>
            </div>
          </Col>
          <Col sm={4}>
            <Players />
          </Col>
        </div>

      </div>
    )
  }
  return null
}

const mapStateToProps = (state) => {
  return {
    room: state.room
  }
}

const mapDispatchToProps = (dispatch) => ({
  onLeave: () => {
    console.log("quit lobby!")
    dispatch(emitQuit())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Room);
