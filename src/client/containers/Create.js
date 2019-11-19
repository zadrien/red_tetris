import React from 'react'
import { connect } from 'react-redux'
import { Component } from '../components/Create'
import { setInterface } from '../actions/menu'

const Create = ({ onClick }) => {
  return (
    <div>
      <h1 className="title">Create a room</h1>
      <Component />
      <div className="bob-btn secondary" onClick={onClick}>Back</div>
    </div>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

  onClick: () => {
    // remove isCreating if true
    console.log("GO BACK")
    dispatch(setInterface("LISTING"));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Create)
