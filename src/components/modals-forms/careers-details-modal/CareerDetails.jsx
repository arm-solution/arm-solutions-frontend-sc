import React from 'react';
// import './ClientDetails.css';
import { errorDialog, successDialog } from '../../../customs/global/alertDialog';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { addNewCareer, updateCareer, getAllCareers } from '../../../store/features/careerSlice';

const CareerDetails = ({ modalRef, selectedCareer, setSelectedCareer }) => {
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setSelectedCareer({
      ...selectedCareer,
      [e.target.name]: e.target.value,
    });
  };


    const saveUpdateCareer = async () => {
        if (
            selectedCareer.title === '' ||
            selectedCareer.description === '' ||
            selectedCareer.location === '' ||
            selectedCareer.job_type === ''
        ) {
            errorDialog('All fields are required');
            return;
        }
    
        try {
            let actionResult;
    
            if (selectedCareer.id) {
                actionResult = await dispatch(updateCareer(selectedCareer));
            } else {
                actionResult = await dispatch(addNewCareer(selectedCareer));
            }
    
            // Ensure the dispatched action is resolved and check the result
            const result = unwrapResult(actionResult);
    
            if (result.success) {
                successDialog(selectedCareer.id ? 'Updated Successfully' : 'New Career Added');
                dispatch(getAllCareers());
            } else {
                errorDialog(selectedCareer.id ? 'Failed to Update Career' : 'Failed to Add Career');
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
              <h5 className="modal-title">Career Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  value={selectedCareer?.title}
                  className="form-control"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={selectedCareer?.description}
                  className="form-control"
                  onChange={(e) => handleInputChange(e)}
                  rows="5"
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  name="location"
                  value={selectedCareer?.location}
                  className="form-control"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="job_type">Job Type</label>
                <input
                  type="text"
                  name="job_type"
                  value={selectedCareer?.job_type}
                  className="form-control"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={saveUpdateCareer}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerDetails;
