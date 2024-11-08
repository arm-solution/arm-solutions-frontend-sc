import React, { useState } from 'react'
import { getLoggedInID } from '../../../customs/global/manageLocalStorage'
import { changePassword } from '../../../store/features/userSlice'
import { useDispatch } from 'react-redux'
import { successDialog } from '../../../customs/global/alertDialog'



const ChangePassword = (props) => {

 const dispatch = useDispatch();

 const [updatePassword, setUpdatePassword] = useState({
    userId: getLoggedInID(),
    currentPassword: "",
    newPassword: "",
    confirm_password: "",
 })

 const [error, seterror] = useState({
    status: false,
    message: ''
 });

 const handlePasswordChange = (e) => {
    e.preventDefault();
    setUpdatePassword({
        ...updatePassword,
        [e.target.name]: e.target.value
    })
 }
 

 const saveNewPassword = async () => {
   const {confirm_password, ...newPass} = updatePassword;

   if(updatePassword.newPassword === '') {
    seterror({
        status: true,
        message: "All fields are required"
    });

    return;
   }
   await dispatch(changePassword(newPass)).then(d => {
      if(d.payload.success) {
        successDialog('Password Change Successfully');
        setUpdatePassword({
            userId: getLoggedInID(),
            currentPassword: "",
            newPassword: "",
            confirm_password: "",
        })
      } else {
        seterror({
            status: true,
            message: d.payload.message
        })
      }
   })
 }
 

  return (
    <>
    <div className="modal fade" ref={props.modalRef} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

            <div className="row m-2">
            { error.status &&   (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <p className='text-center'>{ error.message }</p>
                <button type="button btn-sm" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            )}

            </div>

            <div className="row" style={{ display: 'flex', flexDirection: 'column'}}>

            <div className="form-group">
            <label htmlFor="currentPassword">Password</label>
            <input type="password" className='form-control' name='currentPassword' value={updatePassword.currentPassword} onChange={handlePasswordChange}/>
            </div>


            <div className="form-group">
            <label htmlFor="newPassword">New-Password</label>
            <input type="password" className='form-control' name='newPassword' value={updatePassword.newPassword} onChange={handlePasswordChange}/>
            </div>

            <div className="form-group">
            <label htmlFor="confirm_password">Confirm-Password</label>
            <input type="password" className='form-control' name='confirm_password' value={updatePassword.confirm_password} onChange={handlePasswordChange}/>
            </div>

            <div className="form-group" style={{ display: 'flex', justifyContent: 'end' }}>
                <button className='btn btn-primary' onClick={saveNewPassword}>Save</button>
            </div>

            </div>

            </div>
            <div className="modal-footer">
            </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default ChangePassword