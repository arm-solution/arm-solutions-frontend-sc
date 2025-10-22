import React, { useEffect, useState } from 'react'

import './Attendance.css';
import DataTable from '../../../components/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../store/features/userSlice';
import AttendanceTable from '../../../components/attendance-table/AttendanceTable';

const AttendancePage = () => {

  const dispatch = useDispatch();
  
  const users = useSelector((state) => state.users);


  const columns = [
    {header: 'Fullname', accessor: 'name'},
    {header: 'Username', accessor: 'username'},
    {header: 'Email', accessor: 'email'}
  ]
  
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])
  


  const handleViewEmployee = (id) => {
    alert(id);
  }

  const handleDeleteEmployee = (id) => {
    alert('deleted'+ id);
  }
  

  return (
    <>
      <h1 className='text-center'>My Attendance</h1>
      <AttendanceTable />
    </>
  )
}

export default AttendancePage