import React, { useState, useEffect, useRef } from 'react'
import './Career.css'
import { useSelector, useDispatch } from 'react-redux' 
import { getAllCareers, deleteCareer } from '../../../store/features/careerSlice'
import DataTable from '../../../components/DataTable'
// import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
// import ClientDetails from '../../components/modals-forms/clients-details-modal/ClientDetails'
import { deleteConfirmation } from '../../../customs/global/alertDialog' 

const Career = () => {
  const dispatch = useDispatch();
   
  const [selectedCareer, setSelectedSelectedCareer] = useState({
    title: '',
    description: '',
    date_created: ''
  })
  

    
  const { data: allCareers, loading: careerLoading } = useSelector(state => state.careers);

  useEffect(() => {
    dispatch(getAllCareers())
  }, [dispatch])
  

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Details', accessor: 'description' },
    // { header: 'Date Posted', accessor: 'DATE_FORMAT(date_created, \"%M %d, %Y\")' },
    { header: 'Date Posted', accessor: 'date_created' },
  ]
  
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
    
      const { payload } =  await dispatch(deleteCareer(id)) 
      const result = payload.affectedRows > 0 ? true : false;
      if (result) {
        dispatch(getAllCareers());
        return true;
      }
      return false;

    })

  }
    

  return (
    <>
    {/* Navbar-style header */}
      <div className="px-4 py-3 text-black fw-bold fs-4 rounded" style={{ backgroundColor: "#ededed", marginBottom: "15px" }}>
      Career Management
    </div>

    

    <DataTable
      data={Array.isArray(allCareers) ? allCareers : []} // Ensure data is an array
      columns={columns}
      // actions={{ handleView, handleDelete }}
      actions={{ handleDelete }}
      perPage={10}
      showAddButtonAndSearchInput={{ searchInput: true, addButton: true }}
      deleteAccess={true}
      tableLabel='Career list'
      // addData={ addClientModal }
    />


    </>
  )
}

export default Career