import React, { useState, useEffect } from 'react';
import './EmployeesForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser, getUser } from '../../../store/features/userSlice';
import { getLoggedInUser } from '../../../customs/global/manageLocalStorage';
import { getDepartment } from '../../../store/features/departmentSlice';
import { errorDialog, successDialog } from '../../../customs/global/alertDialog';
import { dateFormatted } from '../../../customs/global/manageDates';
import { fetchAllBarangays, fetchAllCities, fetchAllProvince } from '../../../store/features/getProvince';

const EmployeesForm = (props) => {
  const dispatch = useDispatch();

  const { data: deptData } = useSelector((state) => state.departments);


  const { provinces, cities, barangays,
    isSuccess: provincesStatus,
    loading: loadingProvinces } = useSelector(state => state.provinces);

  // Utility function to format today's date
  const formattedDateNow = new Date().toISOString().split('T')[0];
  const [conPass, setConPass] = useState('')

  // Initial State
  const getInitialEmployeeData = () => ({
    employee_id: '',
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
    province: '',
    province_code: '',
    citymun: '',
    city_mun_code: '',
    barangay: '',
    barangay_code: '',
    region: '',
    department: '',
    section: 0,
    user_type: '',
    user_password: '',
    created_by: getLoggedInUser()?.id || '',
    created: formattedDateNow,
    start_date: formattedDateNow,
  });


  const [employeeData, setEmployeeData] = useState(getInitialEmployeeData());


  // Fetch department data when the component mounts
  useEffect(() => {
    dispatch(getDepartment());
    dispatch(fetchAllProvince());
  }, [dispatch]);


    useEffect(() => {
      console.log("province", provinces)
    }, [])
  
  
  
    const handleSelectedProvince = async (e) => {
      e.preventDefault();
      const name = e.target.options[e.target.selectedIndex].text;
      const { value } = e.target;
    
      setEmployeeData({ ...employeeData, province: name, province_code: value });
      dispatch(fetchAllCities(value))
    };


   const handleSelectedCity = async (e) => {
      e.preventDefault();
      const name = e.target.options[e.target.selectedIndex].text;
      const { value } = e.target;

      setEmployeeData({ ...employeeData, citymun: name, city_mun_code: value });
      dispatch(fetchAllBarangays(value));

   }

   const handleSelectedBarangay = (e) => {
    const name = e.target.options[e.target.selectedIndex].text;
    const { value } = e.target;

    setEmployeeData({ ...employeeData, barangay: name, barangay_code: value})
   }


  // Update employee data based on the selected user
  useEffect(() => {
    if (props.selectedUser) {

      if(props.selectedUser.province_code != null) {
        dispatch(fetchAllCities(props.selectedUser.province_code))
        if(props.selectedUser.city_mun_code != null) {
          dispatch(fetchAllBarangays(props.selectedUser.city_mun_code))
        }
      }
      

      setEmployeeData({
        ...props.selectedUser,
        created_by: props.selectedUser?.created_by || getLoggedInUser()?.id || '',
        created: props.selectedUser?.created || formattedDateNow,
        start_date: props.selectedUser?.start_date || formattedDateNow,
      });
    } else {
      setEmployeeData(getInitialEmployeeData());
    }
  }, [props.selectedUser]);

  const handleEmployeeFormInput = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  useEffect(() => {
  

  }, [])
  

  const confirmPassword = (e) => {
    setConPass(e.target.value); 
  }

  // FOR SAVING NEW EMPLOYEE FUNCTION
  const saveNewEmployee = async (e) => {
    e.preventDefault();

    if (!employeeData.employee_id || !employeeData.firstname || !employeeData.lastname || !employeeData.email || !employeeData.user_type || !employeeData.contact_number) {
      errorDialog('Please fill in all required fields.');
      return;
    }

    try {

     const { payload } = await dispatch(addUser(employeeData))

     if(payload.message) {
          errorDialog(payload.message);
          return;
     } else {
          if(payload.success) {
            successDialog('New Employee is added');
            dispatch(getUser());
          } else {
            errorDialog('Failed to add new employee');
          }
     }
      
    } catch (error) {
      errorDialog('Failed to add new employee')
    }

  };

  // FOR EDITING FUNCTION OF EMPLOYEE
  const saveEditedEmployee = async(e) => {
    e.preventDefault();

    const oldEmailRef = props.selectedUser ? props.selectedUser.email : '';

    if (!employeeData.employee_id || !employeeData.firstname || !employeeData.lastname || !employeeData.email || !employeeData.user_password || !employeeData.user_type || !employeeData.contact_number) {
      alert('Please fill in all required fields.');
      return;
    }

    if(employeeData.user_password !== conPass) {
      errorDialog('Password not match');
      return;
    }

    // remove unecessary property that backend not allowing
    let { fullname, created, start_date, email, ...modifyEmployeeData } = employeeData;

    // adding email property if the email input is modified or change
    if (email !== oldEmailRef) {
      modifyEmployeeData.email = email;
    }


    try {
     const  { payload } = await dispatch(updateUser({...modifyEmployeeData, birthday: modifyEmployeeData.birthday ? dateFormatted(modifyEmployeeData.birthday) : ''}))
      
      if(payload.success) {
        successDialog('Updated Success');
      } else {
        errorDialog('Failed to update the employee');
      }

    } catch (error) {
      errorDialog('Failed to update employee')
    }

  }

  return (
    <div className="modal fade modal-lg" id="employeeForm" ref={props.modalRef} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: "#B22222" }}>
            <h5 className="modal-title" id="exampleModalLabel" style={{ color: "white" }}>
              Employee Form
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
          </div>
          
          <div className="modal-body">
            <div className="modal-container">
             
                <div className="row">
                  <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="employee_id">Employee Number:</label>
                      <input type="text" className="form-control" name="employee_id" value={employeeData.employee_id || ''} onChange={handleEmployeeFormInput} />
                    </div>
                  </div>
                  <div className="col col-md-4">
                  </div>

                  <div className="col col-md-4">
                  </div>
                </div>
             
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
                      <input type="date" className="form-control" name="birthday" value={ employeeData.birthday ? dateFormatted(employeeData.birthday) : ''} onChange={handleEmployeeFormInput} />
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
                      <label htmlFor="province">Province</label>
                      {/* <input type="text" className="form-control" name="province" value={employeeData.province || ''} onChange={handleEmployeeFormInput}/> */}

                      <select className="form-select" name="province" value={employeeData.province_code || '' } onChange={handleSelectedProvince} >
                        <option value="" disabled> Select </option>
                        {provinces.map(p => (
                          <option key={p.id} value={p.code}> {p.name} </option>
                        ))}
                      </select>
                    
                  
                    </div>
                  </div>

                 <div className="col col-md-4">
                  <div className="form-group">
                    <label htmlFor="citymun">City/Municipality</label>
                    <select className="form-select" name="citynum" value={employeeData.city_mun_code || '' } onChange={handleSelectedCity} >
                        <option value="" disabled> Select </option>
                        {!cities ? [] : cities.map(p => (
                          <option key={p.id} value={p.code}> {p.name} </option>
                        ))}
                    </select>
                  </div>
                  </div>

                  <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="barangay">Barangay</label>  
                      <select className="form-select" name="barangay" value={ employeeData.barangay_code || ''  } onChange={handleSelectedBarangay} >
                        <option value="" disabled> Select </option>
                        {!barangays ? [] : barangays.map(p => (
                          <option key={p.id} value={p.code}> {p.name} </option>
                        ))}
                     </select>

                    </div>
                  </div>

                </div>

                <div className="row">

                  <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="region">Region</label>
                      <input type="text" className="form-control" name="region" value={employeeData.region || ''} onChange={handleEmployeeFormInput}/>
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

                  <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="user_type">User Type</label>
                      <select className="form-select" name="user_type" value={employeeData.user_type || ''} onChange={handleEmployeeFormInput}>
                        <option value="" disabled>Select</option>
                        <option value="employee" >Employee</option>
                        <option value="admin" >Admin</option>
                        <option value="marketing" >Marketing</option>
                        <option value="engineering" >Engineering</option>
                        <option value="hr" >HR</option>
                        <option value="sales" >Sales</option>
                        <option value="it" >IT</option>
                        
                      </select>
                    </div>
                  </div>

                </div>

                <div className="row">

                 <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="seection">Section</label>
                      <select className="form-select" name="section" value={employeeData.section || ''} onChange={handleEmployeeFormInput}>
                        <option value="" disabled>Select</option>
                      </select>
                    </div>
                  </div>

                  <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="user_password">Password</label>
                      <input type="text" className="form-control" name="user_password" value={employeeData.user_password || ''} onChange={handleEmployeeFormInput}/>
                    </div>
                  </div>

                  <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="confirm_password">Confirm-Password</label>
                      <input type="text" className="form-control" name="confirm_password" value={conPass} onChange={confirmPassword}/>
                    </div>
                  </div>

                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  { props.selectedUser ? (
                    <button className="btn btn-primary" onClick={(e) => saveEditedEmployee(e)}>Save changes</button>
                  ) : (
                    <button className="btn btn-primary" onClick={(e) => saveNewEmployee(e)}>Save</button>
                  )}
                </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesForm;
