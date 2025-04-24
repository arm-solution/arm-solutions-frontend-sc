import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postMessage } from '../../../store/features/messageRequestSlice';
import './Inquiry.css'

const Inquiry = () => {

  const dispatch = useDispatch();

  const messageSlice =  useSelector((state) => state.messageRequests);
  const { isSuccess, message: message$ } = messageSlice;

  const [messageState, setMessageState] = useState({
    email: '',
    message: '',
    status: '',
    date_created: new Date().toISOString().split('T')[0] // 'YYYY-MM-DD'
  }) 

  const [errmessage, setErrMessage] = useState({
    status: false,
    message: message$
  })


  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setMessageState({
      ...messageState,
      [name]: value
    })
  }

  const handleSubmit = async () => {
    if(messageState.email === '' || messageState.message === '') {
      setErrMessage({
        status: true,
        message: "Please fill out all the fields"
      })
      return;
    }

    try {

     const { payload } = await dispatch(postMessage(messageState))

     if(payload.success) {

      alert(`
        Hello! Thanks so much for reaching out.
        We’ve received your message and will be getting back to you shortly. Hang tight!
        `);

        setMessageState({
          email: '',
          message: '',
          status: '',
        })

     } else {
      setErrMessage({
        status: true,
        message: "Server Error!"
      })
     }
      
    } catch (error) {
      console.error("error: ", error);
    }


  }

  return (
    <>
        <div className="form-group">
              <label htmlFor="email" className="text-light m-3">Email</label>
              <input type="text" className="form-control" name="email" id="email" onChange={(e) => handleChange(e)} />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="text-light m-3">Message</label>
              <textarea className="form-control" id="message" name="message" rows="8" onChange={(e) => handleChange(e)}></textarea>
            </div>

            <div className="form-group">
              <button className="btn btn-secondary btn-sm" onClick={handleSubmit}>Submit</button>
        </div>

        {errmessage.status && (
           <div className="alert alert-danger alert-dismissible fade show" role="alert">
             <strong >{ errmessage.message }</strong>
             <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setErrMessage(e => e.status = false)}></button>
           </div>
        )}
    </>
  )
}

export default Inquiry