import React, { useRef, useState } from 'react';
import './MessageRequest.css';
import DataTable from '../../components/DataTable';
import Inquire from '../../components/modals-forms/inquiries-modal/Inquire';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import InquiryDetails from '../../components/modals-forms/inquiries-modal/Inquire';

const MessageRequest = () => {

    const modalRef = useRef(null);
    const [message, setMessage] = useState([]);

    const columns = [
        { header: 'Email', accessor: 'email' },
        { header: 'Date', accessor: 'date_sent' },
      ];


    const handleView = (id) => {}

    const handleDelete = (id) => {}

    const inquireModal = (e, message) => {
        e.preventDefault();
        
        setMessage({
            ...message
        })
        const modalElement = modalRef.current;
        const modal = new Modal(modalElement);
    
        modal.show();
    }
    

  return (
    <>
    <div className="table-message">
      
        <DataTable
          data={[]}
          columns={columns}
          actions={{ handleView, handleDelete }}
          perPage={10}
          showAddButtonAndSearchInput={{ searchInput: true, addButton: false }}
          tableLabel='Message request list'
          addData={inquireModal}
          headerColor='table-primary'
        />

        <InquiryDetails modalRef={modalRef}/>
    </div>
    </>
  )
}

export default MessageRequest