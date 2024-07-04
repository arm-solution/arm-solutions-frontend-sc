import React, { useEffect, useRef, useState } from 'react';
import './Employees.css';
import { useScreenWidth } from '../../../customs/global/forMobile' 
import DataTable from '../../../components/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../store/features/userSlice';
import EmployeesForm from './../../../components/modals-forms/employees-form/EmployeesForm';



const EmplyeesList = () => {
  
  const isWidth768 = useScreenWidth();
  const dispatch = useDispatch();
  
  const users = useSelector((state) => state.users);

  const columns = [
    {header: 'Fullname', accessor: 'fullname'},
    {header: 'Emp Id', accessor: 'employee_id'},
    {header: 'Email', accessor: 'email'},
    {header: 'Contact No', accessor: 'contact_number'},
    // {header: 'Department', accessor: 'department'}
  ]
  
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch]);
  

  const handleView = (id) => {
    alert(id);
  }

  const handleDelete = (id) => {
    alert('deleted'+ id);
  }
  
  return (
    <>
      <h1 className='text-center'>EMPLOYEES</h1>
      <DataTable 
      data={users.data}
      columns={columns}
      actions={{ handleView, handleDelete }}
      perPage={10}
      showAddButtonAndSearchInput={{ searchInput: true, addButton: true }}
      tableLabel = 'Employees list'
      targetForm= '#employeeForm'
      />

      <EmployeesForm />
        
    </>
  )
}

export default EmplyeesList