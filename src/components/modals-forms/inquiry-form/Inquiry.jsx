import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Inquiry.css';
import { postMessageRequest } from '../../../store/features/messageRequestSlice';

const Inquiry = () => {
  const employeeAuth = useSelector((state) => state.auth);
  const { message, loading: loginLoading } = employeeAuth;

  const [errmessage, setErrMessage] = useState({
    status: false,
    message: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [postMessageRequestData, setPostMessageRequestData] = useState({
    email: '',
    message: '',
    date_created: ''
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostMessageRequestData({
      ...postMessageRequestData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postMessageRequestData.email === '' || postMessageRequestData.message === '') {
      setErrMessage({
        status: true,
        message: 'All fields are required!'
      });
      return;
    }

    const currentDate = new Date().toISOString();
    const requestData = {
      ...postMessageRequestData,
      date_created: currentDate
    };

    try {
      const { payload, error } = await dispatch(postMessageRequest(requestData));

      if (error) {
        console.error('Dispatch Error:', error);
        setErrMessage({
          status: true,
          message: error.message || 'An unexpected error occurred'
        });
        return;
      }

      if (payload?.message) {
        setErrMessage({
          status: true,
          message: payload.message
        });
        return;
      }

      setSuccessMessage('Thank you! Your message has been received. Our team will review your request and reach out with a proposal shortly.');
      setPostMessageRequestData({ email: '', message: '', date_created: '' });
      setTimeout(() => setSuccessMessage(''), 10000);
    } catch (error) {
      console.error('Submission Error:', error);
      setErrMessage({
        status: true,
        message: 'An unexpected error occurred'
      });
    }
  };

  const closeErrorMessage = () => setErrMessage({ status: false, message: '' });
  const closeSuccessMessage = () => setSuccessMessage('');

  return (
    <>
      {errmessage.status && (
        <div className='alert alert-danger alert-dismissible fade show' role='alert'>
          {errmessage.message}
          <button type='button' className='btn-close' onClick={closeErrorMessage}></button>
        </div>
      )}
      {successMessage && (
        <div className='alert alert-success alert-dismissible fade show' role='alert'>
          {successMessage}
          <button type='button' className='btn-close' onClick={closeSuccessMessage}></button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email' className='text-light m-3'>Email</label>
          <input type='text' className='form-control' id='email' name='email' value={postMessageRequestData.email} onChange={handleChange} required />
        </div>
        <div className='form-group'>
          <label htmlFor='message' className='text-light m-3'>Message</label>
          <textarea className='form-control' id='message' name='message' rows='8' value={postMessageRequestData.message} onChange={handleChange} required></textarea>
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-secondary btn-sm'>Submit</button>
        </div>
      </form>
    </>
  );
};

export default Inquiry;