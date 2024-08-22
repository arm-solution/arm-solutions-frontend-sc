import React, { useEffect, useState, useLayoutEffect } from 'react';
import './QoutationForm.css';
import QoutationTableEditable from '../../qoutation-table-editable/QoutationTableEditable';
import { getLoggedInFullname } from '../../../customs/global/manageLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCleints } from '../../../store/features/clientsSlice';
import { getLoggedInUser } from '../../../customs/global/manageLocalStorage';
import { getCurrentDate, formatDateReadable, dateFormatted, formatDateTime } from '../../../customs/global/manageDates';
import { errorDialog, successDialog  } from '../../../customs/global/alertDialog';
import { createProposal, updateProposal } from '../../../store/features/proposalSlice';
import FloatNotification from '../../float-notification/FloatNotification';
import { getProposalItemsByProposalId, saveProposalItems, updateProposalItems } from '../../../store/features/proposalItemSlice'; 
import { compareIfExist, deepEqual } from './../../../customs/global/manageObjects';

const QoutationForm = (props) => {
    const currentDate = new Date();

    const [proposalIsSuccess, setProposalIsSuccess] = useState(props.proposalStatus);
    const [creator, setCreator] = useState('');
    const [notification, setNotification] = useState({
        message: '',
        type: ''
    });


    const [qoutation, setQoutation] = useState({
        client_id: 0,
        created_by: parseInt(getLoggedInUser().id),
        proposal_date: dateFormatted(getCurrentDate()),
        status: 'jared',
        description: '',
        total_estimate: 0,
        proposal_document: '',
        date_created: dateFormatted(getCurrentDate()),
        contact_person: ''
    });

    const [qoutationItem, setQoutationItem] = useState([]);

    const dispatch = useDispatch();

    const { loading: clientLoading, data: clientData } = useSelector(state => state.clients);
    
    useLayoutEffect(() => {
        dispatch(getAllCleints());
    }, [dispatch])

    useEffect(() => {
        setProposalIsSuccess(props.proposalStatus);
    }, [props.proposalStatus, proposalIsSuccess])

    useEffect(() => {
        if (props.proposalEdit) {
            setQoutation(props.proposalEdit);
        }
    }, [props.proposalEdit]);

    const handleQoutationInput = (event) => {
        const { name, value } = event.target;
        setQoutation(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddNewQoutation = async () => {

        if (qoutation.client_id === 0 || qoutation.created_by === 0) {
                setNotification({
                    message: 'All Fields Are Required',
                    type: 'error'
                });
                return;
        }
       

        try {
            await dispatch(createProposal(qoutation)).then( (d) => {
                // payload from the api/backend
                const { lastid } = d.payload;

                    if(lastid > 0 && qoutationItem.length > 0) {
                        const updatedQoutationItems = qoutationItem.map(data => ({ ...data, proposal_id: parseInt(lastid) }));
                        setQoutationItem(updatedQoutationItems);

                        // console.log({proposal_item_id, ...rest})
                        // removing proposal_item_id in create qoutation because is not required on backend
                        dispatch(saveProposalItems(updatedQoutationItems.map(({proposal_item_id, ...rest}) => rest)))
                        .then((s) => {

                            if(s.payload.success) {
                                successDialog('Qoutation is now available')
                            } else {
                                errorDialog('Failed to create a Qoutation');
                            }
                        }) 
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                            
                    } else {
                        if(d.payload.success) {
                            successDialog('Qoutation is now available')
                        } else {
                            errorDialog('Failed to create a Qoutation ');
                        }
                    }
                }) 

            
            } catch (error) {
                errorDialog('Failed To Save The Qoutation');
            }
    };
    

    const handleUpdateQoutation = async () => {
        let status = false 

        let addEditItem = qoutationItem.filter(item2 =>
            !props.proposalItemData.some(item1 => parseInt(item1.qty) === parseInt(item2.quantity) && item2.proposal_item_id > 0)
        );
         
        const {firstname, fullname, user_id, id, lastname, ...dataReshapeItems } = qoutation;
        const proposalFinal = {...dataReshapeItems, date_created: dataReshapeItems.date_created ? dateFormatted(dataReshapeItems.date_created) : '' };
        
        // This is for qoutation/proposal form
        if(!deepEqual(props.proposalEdit, qoutation)) {
            dispatch(updateProposal({proposalFinal, id: qoutation.id}));
            status = true;
        } 
        
        // adding proposal id for every items
        const itemsWithProId = addEditItem.map(d =>  ({ ...d, proposal_id: qoutation.id}))
        //  this is for proposalItem editable table update
        if(addEditItem.length > 0) {
                // dispatch update the items 
                await dispatch(updateProposalItems(itemsWithProId));
                //  refreshing the table to get the new ID from the database
                await dispatch(getProposalItemsByProposalId(qoutation.id));
                setQoutationItem([]);
                status = true;
        }
        
        if(status) {
            successDialog("Updated Successfully");
        } else {
            errorDialog("No changes detected!");
        }
        
    }


    return (
        <>
            <div className="qoutation">
                <div className="container mt-5 p-5">
                    <h2>Create Qoutation</h2>

                    <div className="row mt-5">
                        <div className="col col-md-6">
                            <div className="form-group">
                                <label htmlFor="client">Client</label>
                                <select className="form-select form-select-sm" name='client_id' aria-label=".form-select-sm example" onChange={handleQoutationInput} value={qoutation.client_id} >
                                    <option value='0' disabled>Select Client</option>
                                    {clientData.map(client => <option key={client.id} value={client.id}>{client.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="col col-md-6">
                            <div className="form-group justify-content-center">
                                <label htmlFor="date">Date : </label>
                                <p>{props.proposalEdit ? formatDateReadable(props.proposalEdit.date_created) : currentDate.toDateString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col col-md-6">
                            <div className="form-group">
                                <label htmlFor="client">Contact Person</label>
                                <input type="text" className="form-control" name='contact_person' onChange={handleQoutationInput} value={qoutation.contact_person}/>
                            </div>
                        </div>
                        <div className="col col-md-6 ">
                            <div className="form-group justify-content-center">
                                <label htmlFor="date">Prepared By </label>
                                <p>{ creator ? creator : getLoggedInFullname()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group">
                            <label> Subject / Title</label>
                            <textarea className="form-control" id="subject" name='description' onChange={handleQoutationInput} rows="5" value={qoutation.description} ></textarea>
                        </div>
                    </div>


                    {notification.message && ( 
                        <FloatNotification message={notification.message} type={notification.type} onClose={() => setNotification('')}/>
                    )}

                    <div className="row table-editable">
                        <QoutationTableEditable
                         setQoutationItem={setQoutationItem}
                         proposalItemEdit={props.proposalItemData}
                         proposalItemSuccess={props.proposalItemSuccess}
                         setNotification={ setNotification }
                         />
                    </div>
                    <div className="row row-btn-qout mt-3 mr-auto">

                        {props.proposalEdit ? 
                        <button className='btn-qoutation' onClick={handleUpdateQoutation}>Save</button>
                        :
                        <button className="btn-qoutation" onClick={handleAddNewQoutation}>Create Qoutation</button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default QoutationForm;
