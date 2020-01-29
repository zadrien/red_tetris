import React from 'react';
import { connect } from 'react-redux';
import Button from '../Button';
import { createRoom } from '../../actions/Menu'

// After remove Button.js file
// import Button from 'react-bootstrap/lib/Button';

// const Butt = 

const mapStateToProps = (state, ownProps) => ({
  active: false,
  style: ownProps.style
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(createRoom(ownProps.state))
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Button);
