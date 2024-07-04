import React, { useEffect } from 'react';
import './QoutationForm.css';
import QoutationTableEditable from '../../qoutation-table-editable/QoutationTableEditable';
import { getLoggedInFullname } from '../../../customs/global/manageLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCleints } from '../../../store/features/clientsSlice';

const QoutationForm = () => {

    const dispatch = useDispatch();

    const clients = useSelector(state => state.clients);

    const currentDate = new Date()

    useEffect(() => {
        dispatch(getAllCleints());
    }, [dispatch])
    

  return (
    <>
    
    <div className="qoutation">

    <div className="container mt-5 p-5">
        <h2>Create Qoutation</h2>

     <div className="row mt-5">
        <div className="col col-md-6">

            <div className="form-group">
                <label htmlFor="client">Client</label>

                <select className="form-select form-select-sm" name='client_id' aria-label=".form-select-sm example" defaultValue='0'>
                    <option value='0' disabled>Select Client</option>
                    { clients.data.map(client => <option value={client.id}>{client.name}</option>) }
                </select>


            </div>
        </div>

        <div className="col col-md-6 ">

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

                <input type="text" className="form-control" />


            </div>
        </div>

        <div className="col col-md-6 ">

            <div className="form-group justify-content-center">
                <label htmlFor="date">Prepared By </label>
                <p>{ getLoggedInFullname() }</p>
            </div>

        </div>

     </div>

     <div className="row">

        <div className="form-group">
            <label> Subject / Title</label>

            <textarea className="form-control" id="subject" rows="5"></textarea>
        </div>

     </div>

     <div className="row">
        <QoutationTableEditable />
     </div>

    </div>
    </div>
    </>
  )
}

export default QoutationForm