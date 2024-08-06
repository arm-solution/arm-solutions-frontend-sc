import React, { useEffect, useRef, useState } from 'react';
import './Employees.css';
import { useScreenWidth } from '../../../customs/global/forMobile';
import DataTable from '../../../components/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUserById } from '../../../store/features/userSlice';
import EmployeesForm from './../../../components/modals-forms/employees-form/EmployeesForm';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';


const EmployeesList = () => {
  const modalRef = useRef(null);
  // const isWidth768 = useScreenWidth();
  const dispatch = useDispatch();

  // Separate state for handling selected user detail
  const [selectedUser, setSelectedUser] = useState(null);

  // For province municipality and barangay selected 
  const [province, setProvince] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("")
  const [barangay, setBarangay] = useState([]);
  const [selectedBarangay, setSelectedBarangay] = useState("")
  

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

    emp.province_code && setSelectedProvince(emp.province_code);
    emp.city_mun_code && setSelectedCity(emp.city_mun_code);
    emp.barangay_code && setSelectedBarangay(emp.barangay_code);

    const modalElement = modalRef.current;
    const modal = new Modal(modalElement);
    setSelectedUser(emp);
    modal.show();
  };

  const handleDelete = (id) => {
    alert('Deleted ' + id);
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
        province = {{ province, setProvince}}
        city =  {{ city, setCity }}
        barangay = {{ barangay, setBarangay}}
        selectedProvince = {{ selectedProvince, setSelectedProvince }}
        selectedCity = {{ selectedCity, setSelectedCity }}
        selectedBarangay = {{ selectedBarangay, setSelectedBarangay }}
        />
    </>
  );
};

export default EmployeesList;
