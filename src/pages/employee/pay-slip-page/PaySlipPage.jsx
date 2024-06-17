import React from 'react'
import './PaySlip.css'

const PaySlipPage = () => {
  return (
    <>
    
    <div className="row"><h4>My PaySlip</h4></div>
    <div className="card mt-3">
      <div className="card-body">

       <div className="row">
        <div className="col col-md-6" style={{ border: '3px solid red' }}></div>
        <div className="col col-md-6" style={{ border: '3px solid green' }}></div>
       </div>

       <div className="row"></div>

       <div className="row"></div>

       <div className="row"></div>


      </div>
    </div>
    
    </>
  )
}

export default PaySlipPage