import React from 'react'

const Loading = () => {

  return (
    <div className="position-fixed w-100 h-100 d-flex justify-content-center align-items-center" style={{ zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="spinner-border text-danger" style={{ width: '5rem', height: '5rem', borderWidth: '0.5em' }} role="status">
        {/* <span className="sr-only">Loading...</span> */}
      </div>
    </div>
  )
}

export default Loading