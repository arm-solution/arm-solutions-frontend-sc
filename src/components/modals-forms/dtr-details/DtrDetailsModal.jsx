import React, { useEffect, useState } from 'react';
import './DtrDetails.css';
import BrokenImage from './../../../assets/images/brokenImage.png';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../../../store/features/userSlice';
import { getLoggedInData } from '../../../customs/global/manageLocalStorage';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import { formatDateReadable } from '../../../customs/global/manageDates'; 

const DtrDetailsModal = (props) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();


    useEffect(() => {

        const getLoginImage = () => {
            const image_link = props.selectedDtr?.image_link;
    
            if(image_link) {
                setImageUrl(image_link);
            }
        }

        getLoginImage();

    }, [props.selectedDtr]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (props.selectedDtr) {
                const { payload } = await dispatch(getUserById(props.selectedDtr.user_id));
                if (payload.data) {
                    setUser(payload.data);
                } else {
                    console.error("Failed to fetch user details");
                }
            }
        };
        fetchUserDetails();
    }, [props.selectedDtr, dispatch]);

    const handleViewMap = () => {
        const modalElement = props.modalRef.current;
        const modal = new Modal(modalElement);
        modal.hide();

        const data = encodeURIComponent(JSON.stringify(props.selectedDtr));

        // Manually remove the backdrop
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.remove();
        }

        const url = `/${getLoggedInData().department_name}/common/map?data=${data}`;
        window.open(url, '_blank'); // <-- opens in new tab
    };

    return (
        <div ref={props.modalRef} className="modal fade modal-lg" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1" >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalToggleLabel">DTR Details</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            {imageUrl ? (
                                <img src={imageUrl} alt="Captured Image" className="image-capture" />
                            ) : (
                                <img src={BrokenImage} alt="Placeholder Broken Image" className="image-capture" />
                            )}
                        </div>
                        <div className="row">
                            <p>Name: {user ? `${user.firstname} ${user.lastname}` : "Loading..."}</p>
                            <p>
                                Date:{" "}
                                {props.selectedDtr?.shift_date
                                    ? formatDateReadable(props.selectedDtr.shift_date)
                                    : "No date available"}
                            </p>
                            <p>Break In: {props.selectedDtr?.break_start || "---"}</p>
                            <p>Break Out: {props.selectedDtr?.break_end || "---"}</p>
                            <p>Time In: {props.selectedDtr?.time_in || "---"}</p>
                            <p>Time Outssss: {props.selectedDtr?.time_out || "---"}</p>
                            <p>
                                Over Time Start: {props.selectedDtr?.ot_start || "No Overtime"}
                            </p>
                            <p>
                                Over Time End: {props.selectedDtr?.ot_end || "No Overtime"}
                            </p>
                            <p>Remarks: {props.selectedDtr?.remarks || "No Remarks"}</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleViewMap} className="btn btn-primary">
                            View Map
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DtrDetailsModal;
