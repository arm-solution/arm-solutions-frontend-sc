import React, { useState, useEffect } from 'react';
import './EmployeesForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../../store/features/userSlice';
import { getLoggedInUser } from '../../../customs/global/manageLocalStorage';
import { getDepartment } from '../../../store/features/departmentSlice';

const EmployeesForm = ({ selectedUser, modalRef }) => {
  const dispatch = useDispatch();

  const { data: deptData } = useSelector((state) => state.departments);

  // Utility function to format today's date
  const formattedDate = new Date().toISOString().split('T')[0];

  // Initial State
  const getInitialEmployeeData = () => ({
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
    created_by: getLoggedInUser()?.id || '',
    created: formattedDate,
    start_date: formattedDate,
  });

  const [employeeData, setEmployeeData] = useState(getInitialEmployeeData());

  // Fetch department data when the component mounts
  useEffect(() => {
    dispatch(getDepartment());
  }, [dispatch]);

  // Update employee data based on the selected user
  useEffect(() => {
    if (selectedUser) {
      setEmployeeData({
        ...selectedUser,
        created_by: selectedUser?.created_by || getLoggedInUser()?.id || '',
        created: selectedUser?.created || formattedDate,
        start_date: selectedUser?.start_date || formattedDate,
      });
    } else {
      setEmployeeData(getInitialEmployeeData());
    }
  }, [selectedUser]);

  const handleEmployeeFormInput = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employeeData.firstname || !employeeData.lastname || !employeeData.email) {
      alert('Please fill in all required fields.');
      return;
    }
    dispatch(addUser(employeeData));
  };

  return (
    <div className="modal fade modal-lg" id="employeeForm" ref={modalRef} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Employee Form
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
          </div>
          
          <div className="modal-body">
            <div className="modal-container">
             
                <div className="row">
                  <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="firstname">Firstname</label>
                      <input type="text" className="form-control" name="firstname" value={employeeData.firstname || ''} onChange={handleEmployeeFormInput} />
                    </div>
                  </div>
                  <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="middlename">Middlename</label>
                      <input type="text" className="form-control" name="middlename" value={employeeData.middlename || ''} onChange={handleEmployeeFormInput} />
                    </div>
                  </div>

                  <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="lastname">Lastname</label>
                      <input type="text" className="form-control" name="lastname" value={employeeData.lastname || ''} onChange={handleEmployeeFormInput} />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="nickname">Nickname</label>
                      <input type="text" className="form-control" name="nickname" value={employeeData.nickname || ''} onChange={handleEmployeeFormInput} />
                    </div>
                  </div>

                  <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="gender">Gender</label>
                      <select className="form-select" name="gender" value={employeeData.gender || ''} onChange={handleEmployeeFormInput} >
                        <option value="" disabled> Select </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="birthday">Birthday</label>
                      <input type="date" className="form-control" name="birthday" value={employeeData.birthday || ''} onChange={handleEmployeeFormInput} />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" className="form-control" name="email" value={employeeData.email || ''} onChange={handleEmployeeFormInput} />
                    </div>
                  </div>

                  <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="contact_number">Contact Number</label>
                      <input type="tel" className="form-control" name="contact_number" value={employeeData.contact_number || ''} onChange={handleEmployeeFormInput} />
                    </div>
                  </div>

                  <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="civil_status">Civil Status</label>
                      <select className="form-select" name="civil_status" value={employeeData.civil_status || ''} onChange={handleEmployeeFormInput} >
                        <option value="" disabled>Select</option>
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
                      <input type="text" className="form-control" name="nationality" value={employeeData.nationality || ''} onChange={handleEmployeeFormInput} />
                    </div>
                  </div>

                  <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="house_number">House Number</label>
                      <input type="text" className="form-control" name="house_number" value={employeeData.house_number || ''} onChange={handleEmployeeFormInput} />
                    </div>
                  </div>

                  <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="street_purok_subdivision">Street/Purok/Subdivision</label>
                      <input type="text" className="form-control" name="street_purok_subdivision" value={employeeData.street_purok_subdivision || ''} onChange={handleEmployeeFormInput} />
                    </div>
                  </div>

                </div>

                <div className="row">
                  <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="barangay">Barangay</label>
                      <input type="text" className="form-control" name="barangay" value={employeeData.barangay || ''} onChange={handleEmployeeFormInput} />
                    </div>
                  </div>

                  <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="citymun">City/Municipality</label>
                      <input type="text" className="form-control" name="citymun" value={employeeData.citymun || ''} onChange={handleEmployeeFormInput} />
                    </div>
                  </div>

                  <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="province">Province</label>
                      <input type="text" className="form-control" name="province" value={employeeData.province || ''} onChange={handleEmployeeFormInput}/>
                    </div>
                  </div>
                </div>

                <div className="row">

                  <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="religion">Religion</label>
                      <input type="text" className="form-control" name="religion" value={employeeData.religion || ''} onChange={handleEmployeeFormInput}/>
                    </div>
                  </div>

                  <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="department">Department</label>
                      <select className="form-select" name="department" value={employeeData.department || ''} onChange={handleEmployeeFormInput}>
                        <option value="" disabled>Select</option>
                        {deptData.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.department}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button className="btn btn-primary">Save changes</button>
                </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesForm;
