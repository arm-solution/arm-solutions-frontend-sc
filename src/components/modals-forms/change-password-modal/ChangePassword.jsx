import React, { useState } from 'react'



const ChangePassword = (props) => {

 const [updatePassword, setUpdatePassword] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
 })

 const handlePasswordChange = (e) => {
    e.preventDefault();

    setUpdatePassword({
        ...updatePassword,
        [e.target.name]: e.target.value
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

            <div className="row" style={{ display: 'flex', flexDirection: 'column'}}>

            <div className="form-group">
            <label htmlFor="old_pasword">Password</label>
            <input type="password" className='form-control' name='old_pasword' value={updatePassword.old_password} onChange={handlePasswordChange}/>
            </div>


            <div className="form-group">
            <label htmlFor="new_password">New-Password</label>
            <input type="password" className='form-control' name='new_password' value={updatePassword.new_password} onChange={handlePasswordChange}/>
            </div>

            <div className="form-group">
            <label htmlFor="confirm_password">Confirm-Password</label>
            <input type="password" className='form-control' name='confirm_password' value={updatePassword.confirm_password} onChange={handlePasswordChange}/>
            </div>

            <div className="form-group" style={{ display: 'flex', justifyContent: 'end' }}>
                <button className='btn btn-primary'>Save</button>
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