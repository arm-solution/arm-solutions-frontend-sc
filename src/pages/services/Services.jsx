import React, { useState, useEffect, useRef } from 'react'
import './Services.css'
import { useSelector, useDispatch } from 'react-redux' 
import { getAllServices, getServiceById, deleteService, addNewService, updateService } from '../../store/features/serviceSlice'
import DataTable from '../../components/DataTable'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import ServiceDetails from '../../components/modals-forms/service-details/ServiceDetails'
import { deleteConfirmation } from '../../customs/global/alertDialog'; 
import { dateFormat } from '../../customs/global/dateFormat'

const Services = () => {
    const modalRef = useRef(null);
    const dispatch = useDispatch();
  

    const { data: allServices, loading: serviceLoading } = useSelector(state => state.services);

  
    useEffect(() => {
      dispatch(getAllServices())
    }, [dispatch])


    const [selectedService, setSelectedService] = useState({
      title: '',
      description: '',
      date_created: ''
    })
    
   
    const formattedServices = allServices.map(services => ({
        ...services,
        date_created: dateFormat(services.date_created)
    }));
  
    const columns = [
      { header: 'Title', accessor: 'title' },
      { header: 'Description', accessor: 'description' },
      { header: 'Date Created', accessor: 'date_created' },
    ]
  
    const handleView = (service) => {
      const modalElement = modalRef.current;
      const modal = new Modal(modalElement);
      setSelectedService(service);
      modal.show();
    }
  
    const handleDelete = (id) => {
      
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
      
        const { payload } =  await dispatch(deleteService(id)) 
        const result = payload.affectedRows > 0 ? true : false;
        if (result) {
          dispatch(getAllServices());
          return true;
        }
        return false;
  
      })
  
    }
  
    const addServiceModal = () => {
      const modalElement = modalRef.current;
      const modal = new Modal(modalElement);
      setSelectedService({
        title: '',
        description: '',
        date_created: ''
      });
      modal.show();
    }
  
  
    return (
      <>
      {/* Navbar-style header */}
        <div className="px-4 py-3 text-black fw-bold fs-4 rounded" style={{ backgroundColor: "#ededed", marginBottom: "15px" }}>
        Services Management
      </div>
  
          <DataTable
            data={Array.isArray(formattedServices) ? formattedServices : []} // Ensure data is an array
            columns={columns}
            actions={{ handleView, handleDelete }}
            perPage={10}
            showAddButtonAndSearchInput={{ searchInput: true, addButton: true }}
            deleteAccess={true}
            tableLabel='Services list'
            addData={ addServiceModal }
          />
  
          <ServiceDetails
          modalRef={modalRef}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          />
      </>
    )
  }
  
  export default Services