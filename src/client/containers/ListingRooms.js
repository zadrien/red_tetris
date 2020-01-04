import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CreateButton, List, Pagination } from '../components/Listing'
import { onPing } from '../actions/listing'
import { setInterface } from '../actions/menu'

const Rooms = ({ Create, Listener, removeListener }) => {

  useEffect(() => {
    Listener()

    return function cleanup() {
      removeListener()
    }
  })
  return (
    <div>
      <div>
        <h4 className="title">SELECT A ROOM</h4>
        <List />
      </div>
      <div className="d-flex">
        <div className="bob-btn secondary width-100" onClick={Create}>New room</div>
        <Pagination />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
//    create: state.create,
  }
}

const mapDispatchToProps = (dispatch) => ({
  Create: () => {
    dispatch(setInterface("CREATE"))
  },

  Listener: () => {
    dispatch(onPing())
  },

  removeListener: () => {
    dispatch({ type: "RMV", leave: true, event: "CHECK" })
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
