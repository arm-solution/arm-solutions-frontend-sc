import React, { useState, useEffect } from "react";
import "./RejectedDtrModal.css";
import { getCurrentDate } from "../../../customs/global/manageDates";
import { updateOvertimeByID } from "../../../store/features/overtime.Slice";
import { useDispatch } from "react-redux";
import { successDialog, errorDialog } from "../../../customs/global/alertDialog";
import { getDepartmentLoggedIn } from "../../../customs/global/manageLocalStorage";
import { getOvertimeByUserId } from "../../../store/features/overtime.Slice";


const RejectedDtrModal = (props) => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    remarks: "",
  });

  // Load default values when user clicks Edit button
  useEffect(() => {
    if (props.selectedOt) {
      const start = new Date(props.selectedOt.ot_date_time_start);
      const end = new Date(props.selectedOt.ot_date_time_end);

      setFormData({
        startDate: start.toISOString().slice(0, 10),
        startTime: start.toISOString().slice(11, 16),
        endDate: end.toISOString().slice(0, 10),
        endTime: end.toISOString().slice(11, 16),
        remarks: props.selectedOt.remarks || "",
        engr_remarks: props.selectedOt.engr_remarks || "",
        hr_remarks: props.selectedOt.hr_remarks || "",
      });
    }
  }, [props.selectedOt]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async () => {
  // Required format: 2025-10-26T22:00:00
  const startISO = `${formData.startDate}T${formData.startTime}:00`;
  const endISO = `${formData.endDate}T${formData.endTime}:00`;

  // Required format: 2025-12-02 14:26:59
  const dateModified = getCurrentDate();

  const params = {
    id: props.selectedOt.id,
    ot_date_time_start: startISO,
    ot_date_time_end: endISO,
    user_id: props.selectedOt.user_id,
    remarks: formData.remarks,
    date_modified: dateModified,
    status: parseInt(getDepartmentLoggedIn()) === 10 ? 'for engineering review' : 'for approval'
  };

  // console.log("params being sent:", params);

  const { payload } = await dispatch(updateOvertimeByID(params));

  if(payload.success) {
    successDialog("Overtime is now updated");

    if(props.selectedOt) {
      await dispatch(getOvertimeByUserId({
        id: props.selectedOt.user_id,
        status: 'rejected',
        from: '',
        to: '',
        page: 1,
        limit: 10,
      }))
    }
  } else {
    errorDialog('Failed to update the overtime');
  }
};


  return (
    <>
      <div
        className="modal fade"
        ref={props.overtimeEditModal}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="overtime-form p-4 rounded shadow">
                <h4 className="mb-3">Edit Overtime</h4>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Start Time</label>
                    <input
                      type="time"
                      className="form-control"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">End Time</label>
                    <input
                      type="time"
                      className="form-control"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Engineering Remarks</label>
                    <textarea
                      disabled
                      className="form-control"
                      rows="2"
                      name="remarks"
                      value={formData.engr_remarks}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">HR Remarks</label>
                    <textarea
                      disabled
                      className="form-control"
                      rows="2"
                      name="remarks"
                      value={formData.hr_remarks}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Remarks</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                  />
                </div>

                <button
                  className="btn btn-danger w-100"
                  onClick={handleSubmit}
                >
                  Resubmit
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default RejectedDtrModal;
