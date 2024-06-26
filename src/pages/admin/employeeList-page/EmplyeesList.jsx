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
  
  const users = useSelector((state) => state.user);

  const columns = [
    {header: 'Fullname', accessor: 'name'},
    {header: 'Username', accessor: 'username'},
    {header: 'Email', accessor: 'email'}
  ]
  
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch]);
  


  const handleViewEmployee = (id) => {
    alert(id);
  }

  const handleDeleteEmployee = (id) => {
    alert('deleted'+ id);
  }
  
  return (
    <>
      <h1 className='text-center'>EMPLOYEES</h1>

      <DataTable 
      data={users.data}
      columns={columns}
      actions={{ handleViewEmployee, handleDeleteEmployee }}
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