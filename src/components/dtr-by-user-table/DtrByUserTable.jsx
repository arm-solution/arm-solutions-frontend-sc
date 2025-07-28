import React, { useEffect, useState, useRef } from 'react';
import { formatDateReadable } from '../../customs/global/manageDates';
import { useDispatch, useSelector } from 'react-redux';

import { getDtrById, updateMultipleDtrStatus, getAllDtrWithDateRange } from '../../store/features/dtrSlice';
import DtrDetailsModal from '../modals-forms/dtr-details/DtrDetailsModal';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import { successDialog, errorDialog } from '../../customs/global/alertDialog';
import './DtrByUser.css';

const DtrByUserTable = (props) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const [ids, setIds] = useState([]);
  const [imageLinks, setImageLinks] = useState([]);
  const [selectedDtr, setSelectedDtr] = useState(null);


  
  const { dtrWithDateRange } = useSelector(state => state.dtr);  

  // Load DTR data on initial load and whenever dateRangeStatus changes
  useEffect(() => {
    if(parseInt(props.userId)) {
      dispatch(getAllDtrWithDateRange({userId: props.userId, dtrParams: props.dateRangeStatus}));
    }
  }, [dispatch, props.userId]);

  const handleCheckbox = (data, isChecked) => {
    setImageLinks(preImage => 
      isChecked ? [...preImage, data.image_link] : preImage.filter(item => item !== data.image_link)
    );
    setIds(prevIds =>
      isChecked ? [...prevIds, data.id] : prevIds.filter(item => item !== data.id)
    );
    props.setDtrIds(prevIds =>
      isChecked ? [...prevIds, data.id] : prevIds.filter(item => item !== data.id)
    );
  };

  const handleView = (dtr) => {
    setSelectedDtr(dtr);
    new Modal(modalRef.current).show();
  };

  const handleAppproveReject = async (dtrStatus) => {

    const { payload } = await dispatch(updateMultipleDtrStatus({ status: dtrStatus, ids, imageLinks: imageLinks }));
    
    if (payload.success) {
      successDialog(`The records are now ${dtrStatus}`);
      // dispatch(getDtrById(userId));
      props.setShowForm(true);
      setIds([]); // Reset selected IDs
    } else {
      errorDialog("Unsuccessful Operation", "Please report to the technical team");
    }
  };

  const updateDateRangeStatus = ({ target: { name, value } }) => {
    props.setDateRangeStatus(prev => ({ ...prev, [name]: value }));
  };

  const searchDtr = async () => {
    await dispatch(getAllDtrWithDateRange({userId: props.userId, dtrParams: props.dateRangeStatus}));
  };

  return (
    <>
      <DtrDetailsModal selectedDtr={selectedDtr} modalRef={modalRef} />

      <div className="card mt-5">
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <label>From</label>
              <input
                type="date"
                className="form-control"
                name="date_start"
                onChange={updateDateRangeStatus}
                value={props.dateRangeStatus.date_start}
              />
            </div>
            <div className="col-md-3">
              <label>To</label>
              <input
                type="date"
                className="form-control"
                name="date_end"
                onChange={updateDateRangeStatus}
                value={props.dateRangeStatus.date_end}
              />
            </div>
            <div className="col-md-2">
              <label>Select</label>
              <select
                className="form-select mb-3"
                name="status"
                onChange={updateDateRangeStatus}
                value={props.dateRangeStatus.status}
              >
                <option value="" disabled>Status</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="for approval">For Approval</option>
              </select>
            </div>
            <div className="col-md-4 mt-4">
              <button className="btn btn-secondary btn-sm" onClick={searchDtr}>
                Search
              </button>
              {ids.length > 0 && (
                <>
                  <button className="btn btn-success btn-sm mx-2" onClick={() => handleAppproveReject('approved')}>
                    Approve
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleAppproveReject('rejected')}>
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>

          <table className="table table-bordered mt-3">
            <thead className="table-success">
              <tr>
                <th></th>
                <th>Date</th>
                <th>Time In</th>
                <th>Time Out</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            {dtrWithDateRange.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="6" style={{ height: '100px', textAlign: 'center' }}>
                      <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                        No Data Found
                      </div>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {dtrWithDateRange.map(d => (
                    <tr key={d.id}>
                      <td className="text-center align-middle">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={ids.includes(d.id)}
                          onChange={(e) => handleCheckbox(d, e.target.checked)}
                        />
                      </td>
                      <td>{d?.shift_date ? formatDateReadable(d?.shift_date) : 'No data available'}</td>
                      <td>{d?.time_in}</td>
                      <td>{d?.time_out}</td>
                      <td>
                          {d?.status === 'for approval' ? (
                            <span className="badge bg-secondary">{d?.status}</span>
                          ) : d?.status === 'approved' ? (
                            <span className="badge bg-success">{d?.status}</span>
                          ) : (
                            <span className="badge bg-danger">{d?.status}</span>
                          )}
                       </td>
                      <td>
                        <button className="btn btn-info text-white btn-sm" onClick={() => handleView(d)}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}

          </table>
        </div>
      </div>
    </>
  );
};

export default DtrByUserTable;
