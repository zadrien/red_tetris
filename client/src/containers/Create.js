import React from 'react'
import { connect } from 'react-redux'
import CreateForm from '../components/Create/Form'

const Create = () => {
  return (
    <div>
      <h1 className="title">Create a room</h1>
      <CreateForm />
    </div>
  )
}

export default Create
