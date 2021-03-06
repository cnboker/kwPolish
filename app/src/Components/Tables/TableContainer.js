import React from 'react'
import PropTypes from 'prop-types'
import '../Cards/card.css'

const TableContainer = (props) => {
  const {
    title,
    children
  }=props

  return (
    
      <div className="row">
       
          <div className="card" >
            <div className="card-header">
              <i className="fa fa-align-justify"></i> {title}
              </div>
            <div className="card-block">
              {children}
            </div>
          
        </div>
      </div>
  
  )
}
TableContainer.PropTypes ={
  title:PropTypes.string,
  children:PropTypes.node
}
export default TableContainer