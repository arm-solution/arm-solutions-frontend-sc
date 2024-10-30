import React, { useEffect, useState } from 'react';
import './DtrDetails.css';
import { getUserById } from '../../../store/features/userSlice';
import { useDispatch } from 'react-redux';
import { dateFormatted, formatDateReadable } from '../../../customs/global/manageDates'; 
import { useNavigate } from 'react-router-dom';
import { getLoggedInData } from '../../../customs/global/manageLocalStorage';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';

const DtrDetailsModal = (props) => {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (props.selectedDtr) {
                const resultAction = await dispatch(getUserById(props.selectedDtr.user_id));
                
                if (getUserById.fulfilled.match(resultAction)) {
                    const userData = resultAction.payload;
                    setUser(userData[0]);
                } else {
                    console.error("Failed to fetch user details");
                }
            }
        };

        fetchUserDetails();
    }, [props.selectedDtr, dispatch]);

    const handleViewMap = () => {
        // Initialize and hide the modal using the modalRef from props
        const modalElement = props.modalRef.current;
        const modal = new Modal(modalElement);
        modal.hide();
 
        const data = encodeURIComponent(JSON.stringify(props.selectedDtr));

        // Manually remove the backdrop
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.remove();
        }

        // Navigate to the map route
        navigate(`/${getLoggedInData().user_type}/common/map?data=${data}`);
    };

    return (
      <>
        <div ref={props.modalRef} className="modal fade modal-lg" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalToggleLabel">DTR Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Name: {user ? `${user.firstname} ${user.lastname}` : "Loading..."}</p>
                        <p>Date: {props.selectedDtr?.shift_date ? formatDateReadable(props.selectedDtr.shift_date) : "No date available"}</p>
                        <p>Break In: {props.selectedDtr?.break_start ? props.selectedDtr.break_start : '---'}</p>
                        <p>Break Out: {props.selectedDtr?.break_end ? props.selectedDtr.break_end : '---'}</p>
                        <p>Time In: {props.selectedDtr?.time_in ? props.selectedDtr.time_in : '---'}</p>
                        <p>Time Out: {props.selectedDtr?.time_out ? props.selectedDtr.time_out : '---'}</p>
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleViewMap} className='btn btn-primary'>View Map</button>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
};

export default DtrDetailsModal;
