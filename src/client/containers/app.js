import React from 'react'
import { connect } from 'react-redux'
import Play from '../components/app/HomeButton';
import ListingRooms from './ListingRooms';
import Room from './Room';
import Create from './Create'

import './style.css';
import '../global.css';

const App = ({ menu }) => {
  if (!menu) {
    return (
      <div className="menu-screen">
        <Play />
      </div>
    )
  }

  if (menu === 'ROOM') {
    return (<Room />)
  } else if (menu === 'LISTING') {
    return (
      <div className="menu-screen">
        <ListingRooms />
      </div>
    )
  } else if (menu === 'CREATE') {
    return (
      <div className="menu-screen">
        <Create />
      </div>
    )
  }
  return null
}

const mapStateToProps = (state) => {
  return {
    menu: state.menu,
  }
}

export default connect(mapStateToProps, null)(App);
