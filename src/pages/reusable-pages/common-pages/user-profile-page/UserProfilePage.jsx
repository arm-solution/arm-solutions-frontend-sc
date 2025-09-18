import React, { useEffect, useState, useRef } from 'react';
import './UserProfile.css';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartment } from '../../../../store/features/departmentSlice';
import { getUserById, updateUser } from '../../../../store/features/userSlice';
import { getLoggedInID } from '../../../../customs/global/manageLocalStorage';
import { fetchAllProvince, fetchAllCities, fetchAllBarangays } from '../../../../store/features/getProvince'; 
import { errorDialog, successDialog } from '../../../../customs/global/alertDialog';
import { dateFormatted } from '../../../../customs/global/manageDates';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import ChangePassword from '../../../../components/modals-forms/change-password-modal/ChangePassword';

const UserProfilePage = () => {
 
  const [myAccountData, setMyAccountData] = useState();
  const dispatch = useDispatch();

  const changePasswordModal = useRef(null);

  const { provinces, cities, barangays, loading: loadingProvinces } = useSelector(state => state.provinces);

  const { data: userData, loading: userLoading } = useSelector(state => state.users); 
  const { data: deptData } = useSelector(state => state.departments);

  useEffect(() => {
   dispatch(getUserById(getLoggedInID()));
   dispatch(getDepartment());
   dispatch(fetchAllProvince());
  }, [dispatch])

    
  useEffect(() => {
    if(userData) {
      setMyAccountData(userData.data);

    } else {
      setMyAccountData([]);
    }
  }, [userData]);

  
  useEffect(() => {
    if(userData.data) {
  
      if(userData.data.province !== null && userData.data.province_code !==  null) {
        dispatch(fetchAllCities(userData.data.province_code));
      } 
  
      if(userData.data.city_mun_code !== null && userData.data.citymun !==  null) {
        dispatch(fetchAllBarangays(userData.data.city_mun_code));
      } 

    }
  }, [userData])
  

  const handleAccountFormChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setMyAccountData({
      ...myAccountData,
      [name]: value
    })
  }

  const openPasswordModal = () => {
    const modalElement = changePasswordModal.current;
    const modal = new Modal(modalElement);

    modal.show();
  }

  const closePasswordModal = () => {
    const modalElement = changePasswordModal.current;  

    if (modalElement) {
      const modal = Modal.getInstance(modalElement); 
      if (modal) {
        modal.hide();
      }
    }
  };
  

  const handleSelectedProvince = async(e) => {
    const name = e.target.options[e.target.selectedIndex].text;
    const { value } = e.target;

    setMyAccountData({ ...myAccountData, province: name, province_code: value})
    await dispatch(fetchAllCities(value));

  }

  const handleSelectedCity = async (e) => {
    const name = e.target.options[e.target.selectedIndex].text;
    const { value } = e.target;

    setMyAccountData({ ...myAccountData, citymun: name, city_mun_code: value});
    await dispatch(fetchAllBarangays(value));
  }

  const handleSelectedBarangay = (e) => {
    const name = e.target.options[e.target.selectedIndex].text;
    const { value } = e.target;

    setMyAccountData({ ...myAccountData, barangay: name, barangay_code: value})
  }


  const saveChanges = async(e) => {
    e.preventDefault();

    // remove unecessary propertis
    const { user_password, email, department_details, ...modifiedData} = myAccountData;

    if(modifiedData.email === userData.data.email) {
      modifiedData.email = email;
    }

    const { payload } = await dispatch(updateUser({...modifiedData, birthday: modifiedData.birthday ? dateFormatted(modifiedData.birthday) : ''}))

    if(payload.success) {
      successDialog('Updated Success');
    } else {
      errorDialog('Failed to update the employee');
    }
  
  }
  
  return (
    <>
    <div className="card mt-3">
      <div className="card-body">
        <div className="row"><h4>My Account Information</h4></div>

        <div className="row flex-container">

          <div className="form-group">
            <label htmlFor="name">First name</label>
            <input type="text" className='form-control' name='firstname' value={myAccountData?.firstname || ''} onChange={handleAccountFormChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="middlename">Middle name</label>
            <input type="text" className='form-control' name='middlename' value={myAccountData?.middlename || ''} onChange={handleAccountFormChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Last name</label>
            <input type="text" className='form-control' name='lastname' value={myAccountData?.lastname || ''} onChange={handleAccountFormChange}/>
          </div>

        </div>

        <div className="row flex-container">

          <div className="form-group">
            <label htmlFor="nickname">Nickname</label>
            <input type="text" className='form-control' name='nickname' value={myAccountData?.nickname || ''} onChange={handleAccountFormChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select className="form-select" value={myAccountData?.gender || ''} name='gender' onChange={handleAccountFormChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="birthday">Birthday</label>
            <input type="date" className='form-control' name='birthday' value={myAccountData?.birthday ? dateFormatted(myAccountData?.birthday) : ''} onChange={handleAccountFormChange} />
          </div>

        </div>

        <div className="row flex-container">

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" className='form-control' name='email' value={myAccountData?.email || ''} onChange={handleAccountFormChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="contact_number">Conact number</label>
            <input type="text" className='form-control' name='contact_number' value={myAccountData?.contact_number || ''} onChange={handleAccountFormChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="civil_status">Civil status</label>
            <select className="form-select" value={myAccountData?.civil_status || ''} name='civil_statue' onChange={handleAccountFormChange}>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="widow">Widow</option>
            </select>
          </div>

        </div>

        <div className="row flex-container">

          <div className="form-group">
            <label htmlFor="nationality">Nationality</label>
            <input type="text" className='form-control' name='nationality' value={myAccountData?.nationality || ''} onChange={handleAccountFormChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="house_number">House number</label>
            <input type="text" className='form-control' name='house_number' value={myAccountData?.house_number || ''} onChange={handleAccountFormChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="street_purok_subdivision">Street</label>
            <input type="text" className='form-control' name='street_purok_subdivision' value={myAccountData?.street_purok_subdivision || ''} onChange={handleAccountFormChange}/>
          </div>

        </div>

        <div className="row flex-container">

          <div className="form-group">
              <label htmlFor="province">Province</label>
              {/* <input type="text" className="form-control" name="province" value={employeeData.province || ''} onChange={handleEmployeeFormInput}/> */}

              <select className="form-select" name="province" value={myAccountData?.province_code || '' } onChange={handleSelectedProvince}>
                <option value="" disabled> Select </option>
                {provinces.map(p => (
                  <option key={p.id} value={p.code}> {p.name} </option>
                ))}
              </select>
          </div>

          <div className="form-group">
            <label htmlFor="citymun">City/Municipality</label>
            <select className="form-select" name="citynum" value={myAccountData?.city_mun_code || '' }  onChange={handleSelectedCity}>
                <option value="" disabled> Select </option>
                {!cities ? [] : cities.map(p => (
                  <option key={p.id} value={p.code}> {p.name} </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="barangay">Barangay</label>
            {/* <input type="text" className="form-control" name="barangay" value={employeeData.barangay || ''} onChange={handleEmployeeFormInput} /> */}
                    
            <select className="form-select" name="barangay" value={myAccountData?.barangay_code || '' } onChange={handleSelectedBarangay} >
              <option value="" disabled> Select </option>
              {!barangays ? [] : barangays.map(p => (
                <option key={p.id} value={p.code}> {p.name} </option>
              ))}
            </select>

          </div>

        </div>

        <div className="row flex-container">

          <div className="form-group">
            <label htmlFor="region">Region</label>
            <input type="text" className='form-control' name='region' value={myAccountData?.region || ''} onChange={handleAccountFormChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select className="form-select" disabled value={myAccountData?.department || ''} name='department' onChange={handleAccountFormChange}>
              <option value="0" disabled>Open this select menu</option>
              {deptData.map(d => (
                <option key={d.id} value={d.id}>{d.department}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="section">Section</label>
            <input type="text" className='form-control' name='section' value={myAccountData?.section || ''} onChange={handleAccountFormChange}/>
          </div>

        </div>

        <div className="row">
          <button className="btn btn-outline-danger btn-change-password" onClick={openPasswordModal}>Change my password</button>
        </div>

        <ChangePassword 
          changePasswordModal={changePasswordModal} 
          currentPassword={myAccountData?.user_password } 
          closePasswordModal={closePasswordModal}
        />

        <hr />

        <div className="row flex-container" style={{ backgroundColor: '#D5DBDB', borderRadius: '10px', paddingTop: '10px'}}>

          <div className="form-group">
            <label htmlFor="user_type">Department</label>
            <p className='text-center'><b><span className="badge bg-success">
            </span></b></p>
          </div>

          <div className="form-group">
            <label htmlFor="start_date">Date started</label>
            <p className='text-center'><b></b></p>
          </div>


          <div className="form-group">
            <label htmlFor="salary_grade">Daily Salary</label>
            <p className='text-center'><b>₱{myAccountData?.salary ? myAccountData?.salary : '---'}</b></p>
          </div>


        </div>

        <div className="row flex-container mt-3">
        {/* 
          <div className="form-group">
            <label htmlFor="user_type">Created by</label>
            <p><b>Lance Jared Cabiscuelas</b> <br />
            <i>System Administrator</i>
            </p>
          </div> */}

        </div>

        <div className="row save-changes-btn-con">
          <button className="btn btn-secondary save-changes-btn" onClick={(e) => saveChanges(e) }>Save Changes</button>
        </div>

      </div>
    </div>
    
    </>
  ) 
}

export default UserProfilePage