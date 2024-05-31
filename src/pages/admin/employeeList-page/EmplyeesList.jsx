import React, { useEffect, useRef, useState } from 'react';
import './Employees.css';
import { useScreenWidth } from '../../../customs/global/forMobile' 
import DataTable from '../../../components/DataTable';



const EmplyeesList = () => {


  const isWidth768 = useScreenWidth();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const thead = ['Fullname', 'Username', 'Email', 'Actions'];

  
  return (
    <>
      <h1 className='text-center'>EMPLOYEES</h1>

      <DataTable data={users} thead={thead} perPage={10}/>
        
    </>
  )
}

export default EmplyeesList