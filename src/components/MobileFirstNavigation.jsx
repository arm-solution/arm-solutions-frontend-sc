import React from 'react'

const MobileFirstNavigation = ({ handleToggle }) => {
  return (
    <>

        {/* <nav class="navbar navbar-light bg-light">
        <span class="navbar-brand mb-0 h1">Navbar</span>
        </nav> */}


        <div className="row" style={{border: '2px solid red'}}>
            <div className="col-sm-4" >
                <button className="toggle-btn-mobile button-toggle-mobile text-dark" onClick={handleToggle}>
                  <i className="lni lni-grid-alt text-dark font-weight-bold"></i>
                </button>
              
            </div>
            <div className="col-md-8">
            <p>Dashboard</p>

            </div>
          </div>
    
    </>
  )
}

export default MobileFirstNavigation