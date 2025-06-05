import React, { useState } from 'react'
import './DtrForOnsite.css';

const DtrForOnsite = () => {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    // logic for search goes here
    alert(`Searching for: ${search}`);
  };

  return (
    <>

    <div className="container-fluid min-vh-100 bg-light d-flex flex-column justify-content-center align-items-center p-4">
        <div className="position-absolute top-0 start-0 m-4">
            <div className="rounded-circle border border-dark d-flex justify-content-center align-items-center" style={{ width: '80px', height: '80px' }}>
            <span>logo</span>
            </div>
        </div>

        <div className="d-flex flex-column align-items-center justify-content-center w-100 mb-4">
            <div className="w-100" style={{ maxWidth: '700px' }}>
            <div className="input-group">
                <input
                type="text"
                className="form-control shadow-sm"
                placeholder="Search..."
                value={search}
                onChange={handleChange}
                />
                <button className="btn btn-dark shadow-sm" onClick={handleSearch}>Search</button>
            </div>
            </div>
        </div>

        <div className="card w-100 w-md-75 shadow mx-auto" style={{ maxWidth: '700px' }}>
            <div className="card-body">
              <h5 className="card-title">Card for result after hit the button</h5>
              <div className="card mt-3 border-dark">
                  <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">Information</h6>
                  <p className="card-text"><strong>Full Name:</strong> _________</p>
                  <p className="card-text"><strong>ID Number:</strong> _________</p>
                  <p className="card-text"><strong>Department:</strong> _________</p>
                  </div>
              </div>
            </div>
        </div>
    </div>

    </>
  )
}

export default DtrForOnsite