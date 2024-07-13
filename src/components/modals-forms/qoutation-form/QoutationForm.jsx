import React, { useEffect, useState, useLayoutEffect } from 'react';
import './QoutationForm.css';
import QoutationTableEditable from '../../qoutation-table-editable/QoutationTableEditable';
import { getLoggedInFullname } from '../../../customs/global/manageLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCleints } from '../../../store/features/clientsSlice';
import { getLoggedInUser } from '../../../customs/global/manageLocalStorage';
import { getCurrentDate } from '../../../customs/global/manageDates';
import { errorDialog } from '../../../customs/global/alertDialog';
import { createProposal } from '../../../store/features/proposalSlice';
import FloatNotification from '../../float-notification/FloatNotification';

const QoutationForm = (props) => {
    const currentDate = new Date();

    const [proposalIsSuccess, setProposalIsSuccess] = useState(props.proposalStatus);
    const [notification, setNotification] = useState({
        message: '',
        type: ''
    });
    const [qoutation, setQoutation] = useState({
        client_id: 0,
        created_by: parseInt(getLoggedInUser().id),
        proposal_date: getCurrentDate().id,
        status: 'pending',
        description: '',
        total_estimate: 0,
        proposal_document: '',
        date_created: getCurrentDate(),
        contact_person: ''
    });

    const [qoutationItem, setQoutationItem] = useState({
        proposal_id: 0,
        product_id: 0,
        quantity: 0
    });

    const dispatch = useDispatch();

    const { loading: clientLoading, data: clientData } = useSelector(state => state.clients);

    
    useLayoutEffect(() => {
        dispatch(getAllCleints());
    }, [dispatch])


    useEffect(() => {
        setProposalIsSuccess(props.proposalStatus);
    }, [props.proposalStatus, proposalIsSuccess])
    
    const handleQoutationItemInput = (e) => {
        e.preventDefault();

        setQoutationItem({
            ...qoutationItem,
            [e.target.name]: e.target.value
        });
    };

    const handleQoutationInput = (e) => {
        e.preventDefault();
        setQoutation({
            ...qoutation,
            [e.target.name]: e.target.value
        });
    };


    const handleAddQoutation = async () => {
    
        if (qoutation.client_id === 0 || qoutation.created_by === 0) {
                setNotification({
                    message: 'All Fields Are Required',
                    type: 'error'
                });
                return;
        }
            
            try {
                await dispatch(createProposal(qoutation)).then((d) => {
                    // payload from the api/backend
                    const { success, lastid } = d.payload;
                    if(success) {
                        alert("Success");
                    } else {
                        alert("Failed");
                    }
                }) 

            
            } catch (error) {
                errorDialog('Failed To Save The Qoutation');
            }
        

    };

    return (
        <>
            <div className="qoutation">
                <div className="container mt-5 p-5">
                    <h2>Create Qoutation</h2>

                    <div className="row mt-5">
                        <div className="col col-md-6">
                            <div className="form-group">
                                <label htmlFor="client">Client</label>
                                <select className="form-select form-select-sm" name='client_id' aria-label=".form-select-sm example" onChange={handleQoutationInput} defaultValue='0'>
                                    <option value='0' disabled>Select Client</option>
                                    {clientData.map(client => <option key={client.id} value={client.id}>{client.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="col col-md-6">
                            <div className="form-group justify-content-center">
                                <label htmlFor="date">Date : </label>
                                <p>{currentDate.toDateString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col col-md-6">
                            <div className="form-group">
                                <label htmlFor="client">Contact Person</label>
                                <input type="text" className="form-control" name='contact_person' onChange={handleQoutationInput} />
                            </div>
                        </div>
                        <div className="col col-md-6 ">
                            <div className="form-group justify-content-center">
                                <label htmlFor="date">Prepared By </label>
                                <p>{getLoggedInFullname()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group">
                            <label> Subject / Title</label>
                            <textarea className="form-control" id="subject" name='description' onChange={handleQoutationInput} rows="5"></textarea>
                        </div>
                    </div>


                    {notification.message && ( 
                        <FloatNotification message={notification.message} type={notification.type} onClose={() => setNotification('')}/>
                    )}



                    <div className="row table-editable">
                        <QoutationTableEditable setQoutationItem={setQoutationItem} qoutationItem={qoutationItem} />
                    </div>
                    <div className="row row-btn-qout mt-3 mr-auto">
                        <button className="btn-qoutation" onClick={handleAddQoutation}>Create Qoutation</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QoutationForm;
