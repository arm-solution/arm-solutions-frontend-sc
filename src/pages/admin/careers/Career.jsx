import React, { useState, useEffect, useRef } from 'react';
import './Career.css';
import { useSelector, useDispatch } from 'react-redux'; 
import { getAllCareers, deleteCareer } from '../../../store/features/careerSlice';
import DataTable from '../../../components/DataTable';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import { deleteConfirmation } from '../../../customs/global/alertDialog'; 
import { dateFormat } from '../../../customs/global/dateFormat';
import CareerDetails from '../../../components/modals-forms/careers-details-modal/CareerDetails';

const Career = () => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  
  const [selectedCareer, setSelectedCareer] = useState({
    title: '',
    description: '',
    location: '',
    job_type: '',
    date_created: ''
  });

  const { data: allCareers, loading: careerLoading } = useSelector(state => state.careers);

  useEffect(() => {
    dispatch(getAllCareers());
  }, [dispatch]);

  const formattedCareers = allCareers.map(career => ({
    ...career,
    date_created: dateFormat(career.date_created)
  }));

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Details', accessor: 'description' },
    { header: 'Location', accessor: 'location' },
    { header: 'Type', accessor: 'job_type' },
    { header: 'Date Posted', accessor: 'date_created' }
  ];

  const handleView = (career) => {
    const modalElement = modalRef.current;
    const modal = new Modal(modalElement);
    setSelectedCareer(career);
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
      const { payload } = await dispatch(deleteCareer(id));
      const result = payload.affectedRows > 0;
      if (result) {
        dispatch(getAllCareers());
        return true;
      }
      return false;
    });
  };

  
  
  const addCareerModal = () => {
    const modalElement = modalRef.current;
    const modal = new Modal(modalElement);
    setSelectedCareer({
      title: '',
      description: '',
      location: '',
      job_type: '',
      date_created: ''
    });
    modal.show();
  }

  return (
    <>
      <div className="px-4 py-3 text-black fw-bold fs-4 rounded" style={{ backgroundColor: "#ededed", marginBottom: "15px" }}>
        Career Management
      </div>

      <DataTable
        data={Array.isArray(formattedCareers) ? formattedCareers : []}
        columns={columns}
        actions={{ handleView, handleDelete }}
        perPage={10}
        showAddButtonAndSearchInput={{ searchInput: true, addButton: true }}
        deleteAccess={true}
        tableLabel='Career list'
        addData={ addCareerModal }
      />

      <CareerDetails
      modalRef={modalRef}
      selectedCareer={selectedCareer}
      setSelectedCareer={setSelectedCareer}
      />

    </>
  );
};

export default Career;
