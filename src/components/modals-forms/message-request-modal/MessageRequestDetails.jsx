import React from 'react';
// import './ClientDetails.css';
import { errorDialog, successDialog } from '../../../customs/global/alertDialog';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { getAllMessageRequest, updateMessageRequest, postMessageRequest } from '../../../store/features/messageRequestSlice';
import { dateFormat } from '../../../customs/global/dateFormat';

const MessageRequestDetails = ({ modalRef, selectedMessageRequest, setSelectedMessageRequest }) => {
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setSelectedMessageRequest({
      ...selectedMessageRequest,
      [e.target.name]: e.target.value,
    });
  };


    const saveUpdateMessageRequest = async () => {
        if (
            selectedMessageRequest.title === '' ||
            selectedMessageRequest.description === '' ||
            selectedMessageRequest.location === '' ||
            selectedMessageRequest.job_type === ''
        ) {
            errorDialog('All fields are required');
            return;
        }
    
        try {
            let actionResult;
    
            if (selectedMessageRequest.id) {
                actionResult = await dispatch(updateMessageRequest(selectedMessageRequest));
            } else {
                actionResult = await dispatch(postMessageRequest(selectedMessageRequest));
            }
    
            // Ensure the dispatched action is resolved and check the result
            const result = unwrapResult(actionResult);
    
            if (result.success) {
                successDialog(selectedMessageRequest.id ? 'Updated Successfully' : 'New Career Added');
                dispatch(getAllMessageRequest());
            } else {
                errorDialog(selectedMessageRequest.id ? 'Failed to Update Career' : 'Failed to Add Career');
            }
        } catch (error) {
            errorDialog('An unexpected error occurred');
        }
    };

  return (
    <>
      <div className="modal fade modal-lg" ref={modalRef} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Message Request Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  value={selectedMessageRequest?.email}
                  className="form-control"
                  onChange={(e) => handleInputChange(e)}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  value={selectedMessageRequest?.message}
                  className="form-control"
                  onChange={(e) => handleInputChange(e)}
                  rows="5"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="date_created">Date Posted</label>
                <input
                  type="text"
                  name="date_created"
                  value={dateFormat(selectedMessageRequest?.date_created)}
                  className="form-control"
                  onChange={(e) => handleInputChange(e)}
                  readOnly
                />
              </div>
            </div>
            <div className="modal-footer">
              {/* <button type="button" className="btn btn-primary" onClick={saveUpdateMessageRequest}>
                Save changes
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageRequestDetails;
