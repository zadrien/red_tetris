import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Play from '../components/app/HomeButton';
import ListingRooms from './ListingRooms';
import Room from './Room';
import Create from './Create'

import { onPlayer as onLogin } from '../actions/Profil'
import { onFetch, onPing } from '../actions/Listing';
import { onJoined, onQuit, onGameOver, onHost, onPlayers, onDisplay, onStart, onResetDisplay } from '../actions/Room';
import quickAccess from '../utils/quickAccess'

import './style.css';
import '../global.css';

export const App = ({ menu, initListener }) => {
	useEffect(() => {
		initListener()
	}, [])

	if (!menu) {
		return (
		<div className="menu-screen">
	    	<Play />
		</div>
		)
	} else if (menu === 'ROOM') {
		return (<Room />)
	} else if (menu === 'LISTING') {
		return (
		<div className="menu-screen">
			<ListingRooms />
    	</div>)
	} else if (menu === 'CREATE') {
		return (
		<div className="menu-screen">
			<Create />
		</div>)
	}
	return null
}

const mapStateToProps = (state) => ({
    	menu: state.menu,
})

const mapDispatchToProps = (dispatch) => ({
	initListener: () => {
			dispatch([
			onFetch(),
			onJoined(),
			onHost(),
			onPlayers(),
			onDisplay(),
			onQuit(),
			onStart(),
			onGameOver(),
			onResetDisplay(),
			onPing(),
			onLogin(),
		])
		
		try {
			quickAccess(dispatch, window.location.hash)
		} catch (e) {
			alert(`${e.message}: ${window.location.href}`)
			window.history.pushState("", "", "/")
		}
	}
  
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
