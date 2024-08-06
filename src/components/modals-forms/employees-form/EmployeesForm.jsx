import React, { useState, useEffect } from 'react';
import './EmployeesForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser } from '../../../store/features/userSlice';
import { getLoggedInUser } from '../../../customs/global/manageLocalStorage';
import { getDepartment } from '../../../store/features/departmentSlice';
import { errorDialog, successDialog } from '../../../customs/global/alertDialog';
import axios from 'axios';
import { dateFormatted } from '../../../customs/global/manageDates';

const EmployeesForm = (props) => {
  const dispatch = useDispatch();

  const { data: deptData } = useSelector((state) => state.departments);



  // Utility function to format today's date
  const formattedDateNow = new Date().toISOString().split('T')[0];
  const [conPass, setConPass] = useState('')

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

    // GET ALL PROVINCE FIRST LOAD
    const fetchProvince = async () => {
      try {
        const { data } = await axios.get('https://psgc.cloud/api/provinces');
        props.province.setProvince(data.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (error) {
        console.log('error fetching provinces', error);
      }
    };

    useEffect(() => {
      fetchProvince();
    }, []);
  
    const handleSelectedProvince = async (e) => {
      const name = e.target.options[e.target.selectedIndex].text;
      const { value } = e.target;
    
      setEmployeeData({ ...employeeData, province: name, province_code: value });
      props.selectedProvince.setSelectedProvince(value);
    
      try {
        // Fetch both cities and municipalities in parallel
        const [cityResponse, municipalityResponse] = await Promise.all([
          axios.get(`https://psgc.cloud/api/provinces/${value}/cities`),
          axios.get(`https://psgc.cloud/api/provinces/${value}/municipalities`),
        ]);
    
        // Extract data from responses
        const cityData = cityResponse.data;
        const municipalityData = municipalityResponse.data;
    
        // Combine the city and municipality data
        props.city.setCity([...cityData, ...municipalityData]);
      } catch (error) {
        console.error("Error loading cities/municipalities:", error);
    
        // Optional: Provide user feedback
        errorDialog("Failed to load cities and municipalities. Please try again.");
      }
    };


   const handleSelectedCity = async (e) => {
      const name = e.target.options[e.target.selectedIndex].text;
      const { value } = e.target;

      setEmployeeData({ ...employeeData, citymun: name, city_mun_code: value });
    
      try {
        
        const { data } = await axios.get(`https://psgc.cloud/api/cities-municipalities/${value}/barangays`)

        // console.log('barangay ', data);
        props.barangay.setBarangay(data);

      } catch (error) {
        console.error("Error loading Barangay:", error);
    
        // Optional: Provide user feedback
        errorDialog("Failed to load Barangay. Please try again.");
      }

   }

   const handleSelectedBarangay = (e) => {
    const name = e.target.options[e.target.selectedIndex].text;
    const { value } = e.target;

    setEmployeeData({ ...employeeData, barangay: name, barangay_code: value})
    props.selectedBarangay.setSelectedBarangay(value)
   }

  // Fetch department data when the component mounts
  useEffect(() => {
    dispatch(getDepartment());
  }, [dispatch]);

  const getBarangayCitySelected = async () => {
    try {
      if(props.selectedCity.selectedCity && props.selectedProvince.selectedProvince) {

        // Fetch both cities and municipalities in parallel
        const [cityResponse, municipalityResponse, barangayResponse] = await Promise.all([
          axios.get(`https://psgc.cloud/api/provinces/${props.selectedProvince.selectedProvince}/cities`),
          axios.get(`https://psgc.cloud/api/provinces/${props.selectedProvince.selectedProvince}/municipalities`),
          axios.get(`https://psgc.cloud/api/cities-municipalities/${props.selectedCity.selectedCity}/barangays`)
        ]);
                  
        // Extract data from responses
        const cityData = cityResponse.data;
        const municipalityData = municipalityResponse.data;
        const barangayData = barangayResponse.data;
                  
        // Combine the city and municipality data
        props.city.setCity([...cityData, ...municipalityData]);
        props.barangay.setBarangay(barangayData);
      } else {
        props.barangay.setBarangay([]);
      }

    } catch (error) {
      console.log('Error while getting data', error);
    }
  }

  // Update employee data based on the selected user
  useEffect(() => {
    if (props.selectedUser) {

      getBarangayCitySelected();

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

  const confirmPassword = (e) => {
    setConPass(e.target.value); 
  }

  // FOR SAVING NEW EMPLOYEE FUNCTION
  const saveNewEmployee = async (e) => {
    e.preventDefault();

    if (!employeeData.firstname || !employeeData.lastname || !employeeData.email || !employeeData.user_password || !employeeData.user_type || !employeeData.contact_number) {
      errorDialog('Please fill in all required fields.');
      return;
    }

    if(employeeData.user_password !== conPass) {
      errorDialog("Password not match");
      return;
    }

    try {
      await dispatch(addUser(employeeData)).then(s => {
        if(s.payload.success) {
          successDialog('New Employee are added');
        } else {
          errorDialog('Failed to add new employee');
        }
      }).catch((error) => {
        console.log('Error: ', error);
      })
      
    } catch (error) {
      errorDialog('Failed to add new employee')
    }

  };

  // FOR EDITING FUNCTION OF EMPLOYEE
  const saveEditedEmployee = async(e) => {
    e.preventDefault();


    if (!employeeData.firstname || !employeeData.lastname || !employeeData.email || !employeeData.user_password || !employeeData.user_type || !employeeData.contact_number) {
      alert('Please fill in all required fields.');
      return;
    }

    if(employeeData.user_password !== conPass) {
      alert("Password not match");
      return;
    }

    try {
      await dispatch(updateUser(employeeData)).then(s => {
        if(s.payload.success) {
          successDialog('Updated Success');
        } else {
          errorDialog('Failed to update the employee');
        }
      }).catch(error => {
        errorDialog('Failed to update employee ', error)
      })
      
    } catch (error) {
      errorDialog('Failed to update employee')
    }


  }

  return (
    <div className="modal fade modal-lg" id="employeeForm" ref={props.modalRef} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
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

                      <select className="form-select" name="province" value={props.selectedProvince.selectedProvince || '' } onChange={handleSelectedProvince} >
                        <option value="" disabled> Select </option>
                        {props.province.province.map(p => (
                          <option key={p.id} value={p.code}> {p.name} </option>
                        ))}
                      </select>
                    
                  
                    </div>
                  </div>

                 <div className="col col-md-4">
                  <div className="form-group">
                    <label htmlFor="citymun">City/Municipality</label>
                    <select className="form-select" name="citynum" value={props.selectedCity.selectedCity ? props.selectedCity.selectedCity : employeeData.city_mun_code || '' } onChange={handleSelectedCity} >
                        <option value="" disabled> Select </option>
                        {!props.city ? [] : props.city.city.map(p => (
                          <option key={p.id} value={p.code}> {p.name} </option>
                        ))}
                    </select>
                  </div>
                  </div>

                  <div className="col col-md-4">
                    <div className="form-group">
                      <label htmlFor="barangay">Barangay</label>
                      {/* <input type="text" className="form-control" name="barangay" value={employeeData.barangay || ''} onChange={handleEmployeeFormInput} /> */}
                    
                      <select className="form-select" name="barangay" value={props.selectedBarangay.selectedBarangay ? props.selectedBarangay.selectedBarangay : employeeData.barangay_code || ''  } onChange={handleSelectedBarangay} >
                        <option value="" disabled> Select </option>
                        {!props.barangay ? [] : props.barangay.barangay.map(p => (
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
