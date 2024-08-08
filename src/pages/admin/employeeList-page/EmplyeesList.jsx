import React, { useEffect, useRef, useState } from 'react';
import './Employees.css';
import { useScreenWidth } from '../../../customs/global/forMobile';
import DataTable from '../../../components/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUser } from '../../../store/features/userSlice';
import EmployeesForm from './../../../components/modals-forms/employees-form/EmployeesForm';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import { deleteConfirmation } from '../../../customs/global/alertDialog';

const EmployeesList = () => {
  const modalRef = useRef(null);
  // const isWidth768 = useScreenWidth();
  const dispatch = useDispatch();

  // Separate state for handling selected user detail
  const [selectedUser, setSelectedUser] = useState(null);
  const [employees, setEmployees] = useState([])

  // userData will be ensured to always be an array
  const { data: userData = [], loading: userLoading, error: userError } = useSelector(
    (state) => state.users
  );

  const columns = [
    { header: 'Fullname', accessor: 'fullname' },
    { header: 'Emp Id', accessor: 'employee_id' },
    { header: 'Email', accessor: 'email' },
    { header: 'Contact No', accessor: 'contact_number' },
    // { header: 'Department', accessor: 'department' }
  ];

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
   

  // HANDLE FOR OPEN MODAL
  const handleView = async (emp) => {
    const modalElement = modalRef.current;
    const modal = new Modal(modalElement);
    setSelectedUser(emp);
    modal.show();
  };


  const handleDelete = async (id) => {
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
      await dispatch(deleteUser(id)).then(u => {
        const { payload } = u;

        const result = payload.affectedRows > 0 ? true : false
        return result
      }) 
    })

    // dispatch(deleteUser(id))

  };

  const resetModalFormAdd = () => {
    const modalElement = modalRef.current;
    const modal = new Modal(modalElement);
    setSelectedUser(null);
    modal.show();
  }

  return (
    <>
      <h1 className='text-center'>EMPLOYEES</h1>
        <DataTable
          data={Array.isArray(userData) ? userData : []} // Ensure data is an array
          columns={columns}
          actions={{ handleView, handleDelete }}
          perPage={10}
          showAddButtonAndSearchInput={{ searchInput: true, addButton: true }}
          tableLabel='Employees list'
          addData={resetModalFormAdd}
        />


        <EmployeesForm 
        modalRef={modalRef}
        selectedUser={selectedUser} 
        />
    </>
  );
};

export default EmployeesList;
