import React, { useEffect, useState } from 'react';
import './OvertimeTableStatus.css';
import { useSelector, useDispatch } from 'react-redux';
import { getOvertimeByUserId, updateOvertimeByID } from '../../store/features/overtime.Slice';
import { getDepartmentLoggedIn } from '../../customs/global/manageLocalStorage';
import { successDialog, errorDialog } from '../../customs/global/alertDialog';
import { formatDateAndTimeReadable, formatDateTimeReadable } from '../../customs/global/manageDates';

const OvertimeTableStatus = (props) => {
  const dispatch = useDispatch();
  const { _getOtByUserId, loading } = useSelector((state) => state.overtime);

  const [params, setParams] = useState({
    id: props.userId,
    status: props.status,
    from: '',
    to: '',
    page: 1,
    limit: 10,
  });


  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [engrRemarks, setEngrRemarks] = useState('');
  const [hrRemarks, setHrRemarks] = useState('');

  // Fetch data whenever params or status change
  useEffect(() => {
    if (params.id) {
      dispatch(getOvertimeByUserId(params));
    }

  }, [dispatch, props.status, props.userId, params.page]);

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      status: props.status,
      page: 1,
    }));
  }, [props.status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setParams((prev) => ({ ...prev, page: 1 }));
    dispatch(getOvertimeByUserId(params));
  };

  const handlePrev = () => {
    if (params.page > 1) {
      setParams((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const handleNext = () => {
    if (_getOtByUserId?.totalPages && params.page < _getOtByUserId.totalPages) {
      setParams((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const records = _getOtByUserId?.data || [];

  const handleDetailsClick = (record) => {
    setSelectedRecord(record);
    setEngrRemarks(record.engr_remarks || '');
    setHrRemarks(record.hr_remarks || '');
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedRecord(null);
    setEngrRemarks('');
    setHrRemarks('');
  };

  const handleApprove = async () => {

    let reshapeData = {id: selectedRecord.id }
    if(parseInt(getDepartmentLoggedIn()) === 2 || parseInt(getDepartmentLoggedIn()) === 1) {
      reshapeData = { ...reshapeData, hr_remarks: hrRemarks, status: 'approved' }
    } else {
       reshapeData = { ...reshapeData, engr_remarks: hrRemarks, status: 'for approval' }
    }

    if(selectedRecord.id) {
      const { payload } = await dispatch(updateOvertimeByID(reshapeData));

      if(payload.success) {
         successDialog('Approved Successfully');
      } else {
        errorDialog('Faild to approved this overtime');
      }
    }

    handleModalClose();
  };

  const handleReject = () => {
    alert(`Rejected OT ID: ${selectedRecord.id}`);
    handleModalClose();
  };

  return (
    <>
      <div className="overtime-status-wrapper">
        {/* 🔍 Date Range Filter */}
        <div className="overtime-filter d-flex justify-content-end align-items-end flex-wrap">
          <div className="overtime-date-field d-flex flex-column">
            <label className="form-label">Date From</label>
            <input
              type="date"
              name="from"
              value={params.from}
              onChange={handleChange}
              className="form-control form-control-sm"
            />
          </div>
          <div className="overtime-date-field d-flex flex-column">
            <label className="form-label">Date To</label>
            <input
              type="date"
              name="to"
              value={params.to}
              onChange={handleChange}
              className="form-control form-control-sm"
            />
          </div>
          <button
            className="btn btn-sm btn-primary overtime-search-btn"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* 📋 Table Section */}
        <div className="table-responsive overtime-table-container">
          <table className="table table-bordered table-hover align-middle mb-0 overtime-table">
            <thead className="table-light">
              <tr>
                <th>Date Start</th>
                <th>Date End</th>
                <th>Status</th>
                <th>Date Filed</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {records.length > 0 ? (
                records.map((item) => (
                  <tr key={item.id}>
                    <td>{formatDateTimeReadable(item.ot_date_time_start)}</td>
                    <td>{formatDateTimeReadable(item.ot_date_time_end)}</td>
                    <td>{item.status}</td>
                    <td>{item.date_filed ? new Date(item.date_filed).toLocaleDateString() : '-'}</td>
                    <td>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => handleDetailsClick(item)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="overtime-empty text-muted">
                    No records available for <strong>{props.status}</strong> requests
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 🔸 Pagination Section */}
        <div className="overtime-pagination-wrapper d-flex justify-content-between align-items-center flex-wrap border-top mt-2">
          <span className="text-muted small">
            Showing {records.length} of {_getOtByUserId?.total || 0} entries
          </span>

          <ul className="pagination pagination-sm mb-0 overtime-pagination">
            <li className={`page-item ${params.page === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handlePrev}>
                Previous
              </button>
            </li>
            <li className="page-item active">
              <button className="page-link">{params.page}</button>
            </li>
            <li
              className={`page-item ${
                params.page === _getOtByUserId?.totalPages || _getOtByUserId?.totalPages === 0
                  ? 'disabled'
                  : ''
              }`}
            >
              <button className="page-link" onClick={handleNext}>
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* 🟢 MODAL SECTION */}
      {showModal && selectedRecord && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Overtime Details</h5>
                <button type="button" className="btn-close" onClick={handleModalClose}></button>
              </div>
              <div className="modal-body">
                <div className="row mb-2">
                  <div className="col-md-6">
                    <strong>Employee:</strong> {selectedRecord.employee.firstname} {selectedRecord.employee.lastname}
                  </div>
                  <div className="col-md-6">
                    <strong>Employee ID:</strong> {selectedRecord.employee.employee_id}
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <strong>Start:</strong> {formatDateTime(selectedRecord.ot_date_time_start)}
                  </div>
                  <div className="col-md-6">
                    <strong>End:</strong> {formatDateTime(selectedRecord.ot_date_time_end)}
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <strong>Status:</strong> {selectedRecord.status}
                  </div>
                  <div className="col-md-6">
                    <strong>Date Filed:</strong>{' '}
                    {selectedRecord.date_filed ? new Date(selectedRecord.date_filed).toLocaleDateString() : '-'}
                  </div>
                </div>

              {(parseInt(getDepartmentLoggedIn()) === 2 || parseInt(getDepartmentLoggedIn()) === 1) && (
                  <div className="mb-3">
                    <label className="form-label">HR Remarks</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={hrRemarks}
                      onChange={(e) => setHrRemarks(e.target.value)}
                      placeholder="Enter remarks from HR Department"
                    ></textarea>
                  </div>
                )}


                {parseInt(getDepartmentLoggedIn()) === 6 && (
                  <div className="mb-3">
                    <label className="form-label">Engineering Remarks</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={engrRemarks}
                      onChange={(e) => setEngrRemarks(e.target.value)}
                      placeholder="Enter remarks from Engineering Department"
                    ></textarea>
                  </div>
                )}

              </div>
              <div className="modal-footer">
                {props.canApprove && (
                  <>                  
                  <button className="btn btn-success" onClick={handleApprove}>
                    Approve
                  </button>
                  <button className="btn btn-danger" onClick={handleReject}>
                    Reject
                  </button>
                  </>
                )}
                <button className="btn btn-secondary" onClick={handleModalClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OvertimeTableStatus;
