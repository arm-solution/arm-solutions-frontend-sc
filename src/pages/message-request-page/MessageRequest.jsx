import React, { useState, useEffect, useRef } from 'react'
import './MessageRequest.css';
import { useSelector, useDispatch } from 'react-redux' 
import DataTable from '../../components/DataTable';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import InquiryDetails from '../../components/modals-forms/inquiries-modal/Inquire';
import { getAllMessageRequest, deleteMessageRequest } from '../../store/features/messageRequestSlice';
import { deleteConfirmation } from '../../customs/global/alertDialog'; 
import MessageRequestDetails from '../../components/modals-forms/message-request-modal/MessageRequestDetails';

const MessageRequest = () => {

    const modalRef = useRef(null);
    const dispatch = useDispatch();

      
    const [selectedMessageRequest, setSelectedMessageRequest] = useState({
      Email: '',
      Message: '',
      date_created: ''
    });
    
    const { data: allMessageRequest, loading: messageRequestLoading } = useSelector(state => state.messageRequest);

    useEffect(() => {
      dispatch(getAllMessageRequest())
    }, [dispatch])
    
    const columns = [
        { header: 'Email', accessor: 'email' },
        { header: 'Message', accessor: 'message' },
        { header: 'Date', accessor: 'DATE_FORMAT(date_created, \"%M %d, %Y\")' },
      ];

      const handleView = (career) => {
        const modalElement = modalRef.current;
        const modal = new Modal(modalElement);
        setSelectedMessageRequest(career);
        modal.show();
      }

      const handleDelete = (id) => {
        // console.log(id);
        
        deleteConfirmation({
          title: "",
          text: "",
          icon: "",
          confirmButtonText: "",
          cancelButtonText: "",
          deleteTitle: "",
          deleteText: "",
          successTitle: "", 
          successText: ""
        }, async () => {
        
          const { payload } =  await dispatch(deleteMessageRequest(id)) 
          const result = payload.affectedRows > 0 ? true : false;
          if (result) {
            dispatch(getAllMessageRequest());
            return true;
          }
          return false;
    
        })
    
      }
  
      const inquireModal = (e, message) => {
          e.preventDefault();
          
          const modalElement = modalRef.current;
          const modal = new Modal(modalElement);
      
          modal.show();
      }

  return (
    <>
    {/* Navbar-style header */}
      <div className="px-4 py-3 text-black fw-bold fs-4 rounded" style={{ backgroundColor: "#ededed", marginBottom: "15px" }}>
      Message Request
    </div>

    <div className="table-message" style={{marginTop : "5%"}}>
      
        <DataTable
          data={Array.isArray(allMessageRequest) ? allMessageRequest : []}
          columns={columns}
          actions={{ handleView, handleDelete }}
          perPage={10}
          showAddButtonAndSearchInput={{ searchInput: true, addButton: false }}
          tableLabel='Request List'
          deleteAccess={true}
          addData={inquireModal}
          headerColor='table-primary'
        />

        <MessageRequestDetails
        modalRef={modalRef}
        selectedMessageRequest={selectedMessageRequest}
        setSelectedMessageRequest={setSelectedMessageRequest}
        />
    </div>
    </>
  )
}

export default MessageRequest