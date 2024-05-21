import React from 'react'

const MobileFirstNavigation = ({ handleToggle }) => {
  return (
    <>

        <nav className="navbar bg-dark navbar-mobile">
          <div className="container-fluid">
          <button className="toggle-btn-mobile button-toggle-mobile text-dark" onClick={handleToggle}>
                  <i className="lni lni-grid-alt text-white font-weight-bold"></i>
          </button>
          <div className="flex-grow-1 text-center">
                <p className="text-white m-0 mx-3 mr-5">Dashboard</p>
            </div>
          </div>
        </nav>


        {/* <div className="row" style={{border: '2px solid red'}}>
            <div className="col-sm-4" >
                <button className="toggle-btn-mobile button-toggle-mobile text-dark" onClick={handleToggle}>
                  <i className="lni lni-grid-alt text-dark font-weight-bold"></i>
                </button>
              
            </div>
            <div className="col-md-8">
            <p>Dashboard</p>

            </div>
          </div> */}
    
    </>
  )
}

export default MobileFirstNavigation