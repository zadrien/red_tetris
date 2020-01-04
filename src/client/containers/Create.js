import React from 'react'
import { connect } from 'react-redux'
import CreateForm from '../components/Create/Form'
import { setInterface } from '../actions/menu'

const Create = ({ onClick }) => {
  return (
    <div>
      <h1 className="title">Create a room</h1>
      <CreateForm />
    </div>
  )
}

export default connect()(Create)
