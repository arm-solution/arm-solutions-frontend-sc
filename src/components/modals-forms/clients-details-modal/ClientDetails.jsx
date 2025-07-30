import React from 'react';
import './ClientDetails.css';
import { errorDialog, successDialog } from '../../../customs/global/alertDialog';
import { useDispatch } from 'react-redux';
import { addNewClient, updateClient, getAllCleints } from '../../../store/features/clientsSlice';
import { unwrapResult } from '@reduxjs/toolkit';
const ClientDetails = ({ modalRef, selectedClient, setSelectedClient }) => {
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setSelectedClient({
      ...selectedClient,
      [e.target.name]: e.target.value,
    });
  };


    const saveUpdateClient = async () => {
        if (
            selectedClient.name === '' ||
            selectedClient.address === '' ||
            selectedClient.email === '' ||
            selectedClient.contact_number === ''
        ) {
            errorDialog('All fields are required');
            return;
        }
    
        try {
            let actionResult;
    
            if (selectedClient.id) {
                actionResult = await dispatch(updateClient(selectedClient));
            } else {
                actionResult = await dispatch(addNewClient(selectedClient));
            }
    
            // Ensure the dispatched action is resolved and check the result
            const result = unwrapResult(actionResult);
    
            if (result.success) {
                successDialog(selectedClient.id ? 'Client Updated Successfully' : 'New Client Added');
                dispatch(getAllCleints());
            } else {
                errorDialog(selectedClient.id ? 'Failed to Update Client' : 'Failed to Add Client');
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
              <h5 className="modal-title">Client Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={selectedClient?.name}
                  className="form-control"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  value={selectedClient?.address}
                  className="form-control"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact_number">Contact</label>
                <input
                  type="number"
                  name="contact_number"
                  value={selectedClient?.contact_number}
                  className="form-control"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  value={selectedClient?.email}
                  className="form-control"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={saveUpdateClient}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientDetails;
