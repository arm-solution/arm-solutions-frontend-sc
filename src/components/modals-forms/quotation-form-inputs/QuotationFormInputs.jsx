import React from 'react'
import './QuotationFormInputs.css';
import { formatDateReadable } from '../../../customs/global/manageDates';
import { getLoggedInFullname } from '../../../customs/global/manageLocalStorage';

const QuotationFormsInputs = (props) => {

  const { quotation, setQuotation } = props.quotation;
  const currentDate = new Date();

  const handleQoutationInput = (event) => {
    const { name, value } = event.target;

    setQuotation(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  return (
    <>
        <div className="row-header">
            <h2>Create Quotation</h2>
            {quotation.client_id > 0 && (
                <button className="btn btn-outline-success">
                <i className="lni lni-plus"></i> New</button>
            )}
            </div>

            <div className="row mt-5">
                <div className="col col-md-6">
                    <div className="form-group">
                        <label htmlFor="client">Client</label>
                        <select className="form-select form-select-sm" name='client_id' aria-label=".form-select-sm example" onChange={handleQoutationInput} value={quotation.client_id} >
                            <option value='0' disabled>Select Client</option>
                            {props.clientData.map(client => <option key={client.id} value={client.id}>{client.name}</option>)}
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
                        <input type="text" className="form-control" name='contact_person' onChange={handleQoutationInput} value={quotation.contact_person}/>
                    </div>
                </div>
                <div className="col col-md-6 ">
                    <div className="form-group justify-content-center">
                        <label htmlFor="date">Prepared By </label>
                        <p>{ props.creator.fullname ? props.creator.fullname : getLoggedInFullname() }</p>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="form-group">
                    <label> Subject / Title</label>
                    <textarea className="form-control" id="subject" name='description' onChange={handleQoutationInput} rows="5" value={quotation.description} ></textarea>
                </div>
            </div>
    
    </>
  )
}

export default QuotationFormsInputs