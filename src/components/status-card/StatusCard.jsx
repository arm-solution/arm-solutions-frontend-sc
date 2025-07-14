import React from 'react'

const StatusCard = () => {
  return (
    <>
    <div className="container d-flex justify-content-center mt-5">
        <div className="card shadow-sm text-center px-4 py-5">
        <div className="card-body">
            {/* Larger Construction Icon */}
            <i className="lni lni-construction display-1 text-warning mb-4"></i>
            {/* Status Message */}
            <h4 className="card-title text-dark m-0">
            This is currently working
            </h4>
        </div>
        </div>
    </div>
    </>
  )
}

export default StatusCard