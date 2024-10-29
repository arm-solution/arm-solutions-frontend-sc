import React, { useState, useEffect, useRef } from 'react'
import './Client.css'
import { useSelector, useDispatch } from 'react-redux' 
import { getAllCleints, deleteClient } from '../../store/features/clientsSlice'
import DataTable from '../../components/DataTable'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import ClientDetails from '../../components/modals-forms/clients-details-modal/ClientDetails'
import { deleteConfirmation } from '../../customs/global/alertDialog'; 

const Client = () => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
 
  const [selectedClient, setSelectedClient] = useState({
    name: '',
    address: '',
    contact_number: '',
    email: ''
  })

  const { data: allClient, loading: clientLoading } = useSelector(state => state.clients);

  useEffect(() => {
    dispatch(getAllCleints())
  }, [dispatch])
  

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Contact Number', accessor: 'contact_number' },
    { header: 'Email', accessor: 'email' },
  ]

  const handleView = (client) => {
    const modalElement = modalRef.current;
    const modal = new Modal(modalElement);
    setSelectedClient(client);
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
    
      const { payload } =  await dispatch(deleteClient(id)) 
      const result = payload.affectedRows > 0 ? true : false;

      return result;

    })

  }

  const addClientModal = () => {
    const modalElement = modalRef.current;
    const modal = new Modal(modalElement);
    setSelectedClient({
      name: '',
      address: '',
      contact_number: '',
      email: ''
    });
    modal.show();
  }


  return (
    <>
        <DataTable
          data={Array.isArray(allClient) ? allClient : []} // Ensure data is an array
          columns={columns}
          actions={{ handleView, handleDelete }}
          perPage={10}
          showAddButtonAndSearchInput={{ searchInput: true, addButton: true }}
          tableLabel='Clients list'
          addData={ addClientModal }
        />

        <ClientDetails
        modalRef={modalRef}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        />
    </>
  )
}

export default Client