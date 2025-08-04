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
        window.open(url, '_blank');
    };

    return (
        <div ref={props.modalRef} className="modal fade modal-xl" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content dtr-modal-content">
                    {/* Header */}
                    <div className="modal-header dtr-modal-header">
                        <div className="d-flex align-items-center">
                            <div className="dtr-icon-wrapper me-3">
                                <i className="fas fa-clock"></i>
                            </div>
                            <div>
                                <h4 className="modal-title dtr-modal-title mb-0">DTR Details</h4>
                                <small className="text-muted">Daily Time Record Information</small>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="btn-close dtr-btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>

                    {/* Body */}
                    <div className="modal-body dtr-modal-body">
                        <div className="row g-4">
                            {/* Image Section */}
                            <div className="col-md-5">
                                <div className="dtr-image-container">
                                    <div className="dtr-image-wrapper">
                                        {imageUrl ? (
                                            <img src={imageUrl} alt="Captured Image" className="dtr-image" />
                                        ) : (
                                            <img src={BrokenImage} alt="Placeholder Broken Image" className="dtr-image" />
                                        )}
                                        <div className="dtr-image-overlay">
                                            <i className="fas fa-camera"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="col-md-7">
                                <div className="dtr-details-container">
                                    {/* Employee Info */}
                                    <div className="dtr-section">
                                        <h6 className="dtr-section-title">
                                            <i className="fas fa-user me-2"></i>Employee Information
                                        </h6>
                                        <div className="dtr-info-card">
                                            <div className="dtr-info-item">
                                                <span className="dtr-label">Full Name</span>
                                                <span className="dtr-value">
                                                    {user ? `${user.firstname} ${user.lastname}` : (
                                                        <div className="dtr-skeleton"></div>
                                                    )}
                                                </span>
                                            </div>
                                            <div className="dtr-info-item">
                                                <span className="dtr-label">Date</span>
                                                <span className="dtr-value">
                                                    {props.selectedDtr?.shift_date
                                                        ? formatDateReadable(props.selectedDtr.shift_date)
                                                        : "No date available"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Time Records */}
                                    <div className="dtr-section">
                                        <h6 className="dtr-section-title">
                                            <i className="fas fa-clock me-2"></i>Time Records
                                        </h6>
                                        <div className="dtr-info-card">
                                            <div className="row g-3">
                                                <div className="col-6">
                                                    <div className="dtr-time-item">
                                                        <span className="dtr-time-label">Time In</span>
                                                        <span className="dtr-time-value time-in">
                                                            {props.selectedDtr?.time_in || "---"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="dtr-time-item">
                                                        <span className="dtr-time-label">Time Out</span>
                                                        <span className="dtr-time-value time-out">
                                                            {props.selectedDtr?.time_out || "---"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="dtr-time-item">
                                                        <span className="dtr-time-label">Break In</span>
                                                        <span className="dtr-time-value">
                                                            {props.selectedDtr?.break_start || "---"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="dtr-time-item">
                                                        <span className="dtr-time-label">Break Out</span>
                                                        <span className="dtr-time-value">
                                                            {props.selectedDtr?.break_end || "---"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Overtime Records */}
                                    <div className="dtr-section">
                                        <h6 className="dtr-section-title">
                                            <i className="fas fa-plus-circle me-2"></i>Overtime Records
                                        </h6>
                                        <div className="dtr-info-card">
                                            <div className="row g-3">
                                                <div className="col-6">
                                                    <div className="dtr-time-item">
                                                        <span className="dtr-time-label">OT Start</span>
                                                        <span className="dtr-time-value ot-time">
                                                            {props.selectedDtr?.ot_start || "No Overtime"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="dtr-time-item">
                                                        <span className="dtr-time-label">OT End</span>
                                                        <span className="dtr-time-value ot-time">
                                                            {props.selectedDtr?.ot_end || "No Overtime"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Remarks */}
                                    {props.selectedDtr?.remarks && (
                                        <div className="dtr-section">
                                            <h6 className="dtr-section-title">
                                                <i className="fas fa-comment me-2"></i>Remarks
                                            </h6>
                                            <div className="dtr-remarks-card">
                                                <p className="mb-0">{props.selectedDtr.remarks}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="modal-footer dtr-modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-light dtr-btn-secondary" 
                            data-bs-dismiss="modal"
                        >
                            <i className="fas fa-times me-2"></i>Close
                        </button>
                        <button onClick={handleViewMap} className="btn dtr-btn-primary">
                            <i className="fas fa-map-marker-alt me-2"></i>View Location
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DtrDetailsModal;