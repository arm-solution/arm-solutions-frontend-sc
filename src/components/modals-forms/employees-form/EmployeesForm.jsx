import React, { useState } from 'react';
import './EmployeesForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../../store/features/userSlice';
import { getLoggedInUser } from '../../../customs/global/manageLocalStorage';

const EmployeesForm = (props) => {

  const loginUser = localStorage.getItem('authEmployee');
  const now = new Date();
  const formattedDate = now.toISOString().split('T')[0];

  const [employeeData, setEmployeeData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    nickname: '',
    gender: '',
    birthday: '',
    email: '',
    contact_number: '',
    civil_status: '',
    nationality: '',
    house_number: '',
    street_purok_subdivision: '',
    citymun: '',
    province: '',
    barangay: '',
    religion: '',
    department: '',
    created_by: getLoggedInUser().id,
    created: formattedDate,
    start_date: formattedDate
  });

  const dispatch = useDispatch();
  const user = useSelector(state => state.users)

  const handleEmployeeFormInput = (e) => {
    e.preventDefault();

    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addUser(employeeData))
  }


  return (
    <>
    <div className="modal fade modal-lg" id="employeeForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Employee Form</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
          <div className="modal-container">
            

            <div className="row">
  
              <div className="col col-md-4">
                <div className="form-group">
                  <label htmlFor="firstname">Firstname</label>
                  <input type="text" className="form-control" name="firstname" onChange={handleEmployeeFormInput} />
                </div>
              </div>
  
              <div className="col col-md-4">
                <div className="form-group">
                  <label htmlFor="middlename">Middlename</label>
                  <input type="text" className="form-control" name="middlename" onChange={handleEmployeeFormInput} />
                </div>
              </div>
  
              <div className="col col-md-4">
                <div className="form-group">
                  <label htmlFor="lastname">Lastname</label>
                  <input type="text" className="form-control" name="lastname" onChange={handleEmployeeFormInput} />
                </div>
              </div>
  
            </div>
  
            <div className="row">
  
             <div className="col col-md-4">
                <div className="form-group">
                  <label htmlFor="nickname">Nickname</label>
                  <input type="text" className="form-control" name="nickname" onChange={handleEmployeeFormInput} />
                </div>
              </div>
  
             <div className="col col-md-4">
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select className="form-select" aria-label="Default select example" name='gender' onChange={handleEmployeeFormInput} defaultValue='0'>
                    <option value='0' disabled>select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
  
                </div>
              </div>
  
              <div className="col col-md-4">
                <div className="form-group">
                  <label htmlFor="birthday">Birthday</label>
                  <input type="date" className="form-control" name="birthday" onChange={handleEmployeeFormInput} />
                </div>
              </div>
  
            </div>
  
            <div className="row">
               <div className="col col-md-4">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" name="email" onChange={handleEmployeeFormInput} />
                  </div>
               </div>
  
               <div className="col col-md-4">
                  <div className="form-group">
                    <label htmlFor="contact_number">Contact Number</label>
                    <input type="text" className="form-control" name="contact_number" onChange={handleEmployeeFormInput} />
                  </div>
               </div>
  
               <div className="col col-md-4">
                  <div className="form-group">
                    <label htmlFor="civil_status">Civil Status</label>
                      <select className="form-select" aria-label="Default select example" name='civil_status' onChange={handleEmployeeFormInput} defaultValue='0'>
                        <option value='0' disabled>select</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                    </select>
                  </div>
                </div>
            </div>
  
            <div className="row">
              <div className="col col-md-4">
                  <div className="form-group">
                    <label htmlFor="nationality">Nationality</label>
                    <input type="text" className="form-control" name="nationality" onChange={handleEmployeeFormInput} />
                  </div>
               </div>
  
              <div className="col col-md-4">
                  <div className="form-group">
                    <label htmlFor="house_number">House Number</label>
                    <input type="text" className="form-control" name="house_number" onChange={handleEmployeeFormInput} />
                  </div>
               </div>
  
              <div className="col col-md-4">
                  <div className="form-group">
                    <label htmlFor="street_purok_subdivision">Street/Purok/Subdivision</label>
                    <input type="text" className="form-control" name="street_purok_subdivision" onChange={handleEmployeeFormInput} />
                  </div>
               </div>
            </div>
  
  
            <div className="row">
              <div className="col col-md-4">
                  <div className="form-group">
                    <label htmlFor="barangay">Barangay</label>
                    <input type="text" className="form-control" name="barangay" onChange={handleEmployeeFormInput} />
                  </div>
               </div>
  
              <div className="col col-md-4">
                  <div className="form-group">
                    <label htmlFor="citymun">Municipality</label>
                    <input type="text" className="form-control" name="citymun" onChange={handleEmployeeFormInput} />
                  </div>
               </div>
  
              <div className="col col-md-4">
                  <div className="form-group">
                    <label htmlFor="province">Province</label>
                    <input type="text" className="form-control" name="province" onChange={handleEmployeeFormInput} />
                  </div>
               </div>
            </div>
  
            <div className="row">
              <div className="col col-md-4">
                  <div className="form-group">
                    <label htmlFor="barangay">Barangay</label>
                    <input type="text" className="form-control" name="barangay" onChange={handleEmployeeFormInput} />
                  </div>
               </div>
  
              <div className="col col-md-4">
                  <div className="form-group">
                    <label htmlFor="religion">Religion</label>
                    <input type="text" className="form-control" name="religion" onChange={handleEmployeeFormInput} />
                  </div>
               </div>
  
              <div className="col col-md-4">
                  <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <select className="form-select" aria-label="Default select example" name='department' onChange={handleEmployeeFormInput} defaultValue='0'>
                        <option value='0' disabled>select</option>
                        <option value="single">Marketing</option>
                        <option value="warehouse">Warehouse</option>
                        <option value="finance">Finance</option>
                        <option value="admin">Admin</option>
                        <option value="accounting">Accounting</option>
                        <option value="employees">Employees</option>
                    </select>
                  </div>
               </div>
            </div>
  
  
            </div>


          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default EmployeesForm