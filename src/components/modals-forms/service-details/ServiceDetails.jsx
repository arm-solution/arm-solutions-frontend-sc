import React from 'react';
import './ServiceDetails.css';
import { errorDialog, successDialog } from '../../../customs/global/alertDialog';
import { useDispatch } from 'react-redux';
import { addNewService, getAllServices, updateService } from '../../../store/features/serviceSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { dateFormat } from '../../../customs/global/dateFormat';

const ServiceDetails = ({ modalRef, selectedService, setSelectedService }) => {
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setSelectedService({
      ...selectedService,
      [e.target.name]: e.target.value,
    });
  };


  const saveUpdateService = async () => {
    if (
        selectedService.title === '' ||
        selectedService.description === ''
    ) {
        errorDialog('All fields are required');
        return;
    }

    try {
        let actionResult;
        let serviceData = { ...selectedService };

        if (!serviceData.id) {
            // If adding new, set date_created to today
            serviceData.date_created = new Date().toISOString().split('T')[0];
        } else {
            // If updating, ensure date_created is not removed
            serviceData.date_created = selectedService.date_created;
        }

        if (serviceData.id) {
            actionResult = await dispatch(updateService(serviceData));
        } else {
            actionResult = await dispatch(addNewService(serviceData));
        }

        const result = unwrapResult(actionResult);

        if (result.success) {
            successDialog(serviceData.id ? 'Updated Successfully' : 'New Service Added');
            dispatch(getAllServices());
        } else {
            errorDialog(serviceData.id ? 'Failed to Update Service' : 'Failed to Add Service');
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
              <h5 className="modal-title">Service Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  value={selectedService?.title}
                  className="form-control"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                    name="description"
                    value={selectedService?.description}
                    className="form-control"
                    onChange={(e) => handleInputChange(e)}
                    rows="4" // Adjust the number of rows as needed
                    />
                </div>

                <div className="form-group">
  <label htmlFor="date_created">Date Created</label>
  <input
    type="text"
    name="date_created"
    value={dateFormat(selectedService?.date_created || new Date().toISOString().split('T')[0])}
    className="form-control"
    onChange={(e) => handleInputChange(e)}
    disabled
  />
</div>


            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={saveUpdateService}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetails;
