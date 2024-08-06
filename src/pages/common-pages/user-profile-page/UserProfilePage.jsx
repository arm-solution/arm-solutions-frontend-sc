import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartment } from '../../../store/features/departmentSlice';
import { getUserById } from '../../../store/features/userSlice';
import { getLoggedInID, logout } from '../../../customs/global/manageLocalStorage';
import { errorDialog } from './../../../customs/global/alertDialog'

const UserProfilePage = () => {
 
  const [myAccountData, setMyAccountData] = useState();
  const dispatch = useDispatch();

  const { data: userData, loading: userLoading } = useSelector(state => state.users); 
  const { data: deptData } = useSelector(state => state.departments);


  useEffect(() => {
   dispatch(getUserById(getLoggedInID()));
   dispatch(getDepartment());
  }, [dispatch])

    
  useEffect(() => {
    if(userData[0]) {
      setMyAccountData(userData[0])
    } else {
      setMyAccountData([]);
    }
  }, [userData]);

  const handleAccountFormChange = (e) => {
    e.preventDefault();

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
            <input type="date" className='form-control' name='birthday' value={myAccountData?.birthday || ''} onChange={handleAccountFormChange} />
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
            <label htmlFor="barangay">Barangay</label>
            <input type="text" className='form-control' name='barangay' value={myAccountData?.barangay || ''} onChange={handleAccountFormChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="citymun">City/Municipality</label>
            <input type="text" className='form-control' name='citymun' value={myAccountData?.citymun || ''} onChange={handleAccountFormChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="province">Province</label>
            <input type="text" className='form-control' name='province' value={myAccountData?.province || ''} onChange={handleAccountFormChange}/>
          </div>

        </div>

        <div className="row flex-container">

          <div className="form-group">
            <label htmlFor="region">Region</label>
            <input type="text" className='form-control' name='region' value={myAccountData?.region || ''} onChange={handleAccountFormChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select className="form-select" value={myAccountData?.department || ''} name='department' onChange={handleAccountFormChange}>
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

        <hr />

        <div className="row flex-container" style={{ backgroundColor: '#D5DBDB', borderRadius: '10px', paddingTop: '10px'}}>

          <div className="form-group">
            <label htmlFor="user_type">System status</label>
            <p className='text-center'><b><span className="badge bg-success">Admin</span></b></p>
          </div>

          <div className="form-group">
            <label htmlFor="start_date">Date started</label>
            <p className='text-center'><b>July 1, 2024</b></p>
          </div>


          <div className="form-group">
            <label htmlFor="salary_grade">Salary</label>
            <p className='text-center'><b>₱450</b></p>
          </div>


        </div>

        <div className="row flex-container mt-3">

          <div className="form-group">
            <label htmlFor="user_type">Created by</label>
            <p><b>Lance Jared Cabiscuelas</b> <br />
            <i>System Administrator</i>
            </p>
          </div>

        </div>


      </div>
    </div>
    
    </>
  )
}

export default UserProfilePage