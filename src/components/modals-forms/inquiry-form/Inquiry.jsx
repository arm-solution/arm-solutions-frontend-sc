import React from 'react'
import './Inquiry.css'

const Inquiry = () => {
  return (
    <>
          <div className="form-group">
              <label htmlFor="email" className="text-light m-3">Email</label>
              <input type="text" className="form-control" id="email" />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="text-light m-3">Message</label>
              <textarea className="form-control" id="message" rows="8"></textarea>
            </div>

            <div className="form-group">
              <button className="btn btn-secondary btn-sm">Submit</button>
        </div>
    </>
  )
}

export default Inquiry