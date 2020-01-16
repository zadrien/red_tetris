import React from 'react'
import { connect } from 'react-redux'
import { emitFetch, onPrev, onNext } from '../../actions/Listing.js'

const Pagination = ({items, next, prev}) => (
  <div className="d-flex">
    <div className="bob-btn secondary width-100" onClick={() => prev(items)}>Prev</div>
    <div className="bob-btn secondary width-100" onClick={() => next(items)}>Next</div>
  </div>
)


const mapStateToProps = (state) => ({
  items: state.rooms
  
})

const mapDispatchToProps = (dispatch) => ({
  next: (data) => {
    console.log(data)
    if (data.start + 5 < data.nbr) {
      console.log("increment start at +5")
      dispatch(onNext(5))
    } else {
      console.log("fetching data from server")
      dispatch(emitFetch({limit: 5, skip: data.nbr}))
    }
    
  },
  prev: (data) => {
    console.log(data)
    if (data.start > 0) {
      console.log("decrement data.start")
      dispatch(onPrev(5))
    } else {
      console.log("do nothing")
    }
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Pagination)
