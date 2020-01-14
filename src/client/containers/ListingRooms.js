import React from 'react';
import { connect } from 'react-redux';

import { setInterface } from '../actions/Menu'

import Pagination from '../components/Listing/Pagination'
import List from '../components/Listing/Rooms'

const Rooms = ({ Create }) => {  
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

const mapStateToProps = (state) => ({
  create: state.create,
})

const mapDispatchToProps = (dispatch) => ({
  Create: () => {
    dispatch(setInterface("CREATE"))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
