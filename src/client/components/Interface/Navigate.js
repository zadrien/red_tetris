import React from 'react'
import { connect } from 'react-redux'
import { setInterface } from '../../actions/menu'

const Nav = ({ to, onClick }) => (
  <div className="bob-btn secondary width-100" onClick={() => onClick(to)}>Back</div>
)


const mapStateToProps = (state, ownProps) => ({
  to: ownProps.to
})

const mapDispatchToProps = (dispatch) => ({
  onClick: (to) => {
    dispatch(setInterface(to))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
