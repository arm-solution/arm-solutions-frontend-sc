import React, { useEffect, useState, useRef } from 'react';
import { formatDateReadable } from '../../customs/global/manageDates';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateMultipleDtrStatus, getAllDtrWithDateRange, getDtr } from '../../store/features/dtrSlice';
import DtrDetailsModal from '../modals-forms/dtr-details/DtrDetailsModal';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import { successDialog, errorDialog } from '../../customs/global/alertDialog';
import './DtrByUser.css';

const DtrByUserTable = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const modalRef = useRef(null);

  const [ids, setIds] = useState([]);
  const [selectedDtr, setSelectedDtr] = useState(null);
  const [dateRangeStatus, setDateRangeStatus] = useState({
    date_start: '',
    date_end: '',
    status: ''
  });

  const { dtrWithDateRange } = useSelector(state => state.dtr);

  // Load DTR data on initial load and whenever dateRangeStatus changes
  useEffect(() => {
    if(parseInt(userId)) {
      dispatch(getAllDtrWithDateRange({userId: userId, dtrParams: dateRangeStatus}));
    }
  }, [dispatch, userId]);

  const handleCheckbox = (id, isChecked) => {
    setIds(prevIds =>
      isChecked ? [...prevIds, id] : prevIds.filter(item => item !== id)
    );
  };

  const handleView = (dtr) => {
    setSelectedDtr(dtr);
    new Modal(modalRef.current).show();
  };

  const handleAppproveReject = async (dtrStatus) => {
    const { payload } = await dispatch(updateMultipleDtrStatus({ status: dtrStatus, ids }));
    
    if (payload.success) {
      successDialog(`The records are now ${dtrStatus}`);
      dispatch(getAllDtrWithDateRange({userId: userId, dtrParams: dateRangeStatus}));
      setIds([]); // Reset selected IDs
    } else {
      errorDialog("Unsuccessful Operation", "Please report to the technical team");
    }
    
  };

  const updateDateRangeStatus = ({ target: { name, value } }) => {
    setDateRangeStatus(prev => ({ ...prev, [name]: value }));
  };

  const searchDtr = async () => {
    await dispatch(getAllDtrWithDateRange({userId: userId, dtrParams: dateRangeStatus}));
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
                value={dateRangeStatus.date_start}
              />
            </div>
            <div className="col-md-3">
              <label>To</label>
              <input
                type="date"
                className="form-control"
                name="date_end"
                onChange={updateDateRangeStatus}
                value={dateRangeStatus.date_end}
              />
            </div>
            <div className="col-md-2">
              <label>Select</label>
              <select
                className="form-select mb-3"
                name="status"
                onChange={updateDateRangeStatus}
                value={dateRangeStatus.status}
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
                          onChange={(e) => handleCheckbox(d.id, e.target.checked)}
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
