import React, { useEffect, useState } from 'react';
import './DtrDetails.css';
import { getUserById } from '../../../store/features/userSlice';
import { useDispatch } from 'react-redux';
import { dateFormatted, formatDateReadable } from '../../../customs/global/manageDates'; 

const DtrDetailsModal = (props) => {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserDetails = async () => {
            console.log(props.selectedDtr)
            if (props.selectedDtr) {
                const resultAction = await dispatch(getUserById(props.selectedDtr.user_id));
                
                // Check if the payload is fulfilled and contains data
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

  return (
    <>
      <div className="modal fade modal-lg" id="exampleModalToggle" ref={props.modalRef} aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalToggleLabel">DTR Details</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                      <p>Name: {user ? `${user.firstname} ${user.lastname}`  : "Loading..."}</p> {/* Display user name if available */}
                      <p>Date: {props.selectedDtr?.shift_date ? formatDateReadable(props.selectedDtr.shift_date) : "No date available"}</p>
                      <p>Time In: { props.selectedDtr?.time_in ? props.selectedDtr?.time_in : '---' }</p>
                      <p>Time Out: { props.selectedDtr?.time_out ? props.selectedDtr?.time_out : '---' }</p>
                  </div>
                  <div className="modal-footer">
                      <button className="btn btn-primary">View Map</button>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
};

export default DtrDetailsModal;
