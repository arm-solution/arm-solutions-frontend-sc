import React, { useEffect, useState, useRef } from 'react';
import { formatDateReadable } from '../../customs/global/manageDates';
import DtrDetailsModal from '../modals-forms/dtr-details/DtrDetailsModal';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import './DtrByUser.css';
import DtrRemarks from '../modals-forms/dtr-remarks-approval-modal/DtrRemarks';

const DtrByUserTable = (props) => {
  const modalRef = useRef(null);
  const modalForApproval = useRef(null);

  const [selectedDtr, setSelectedDtr] = useState(null);


  const handleView = (dtr) => {
    setSelectedDtr(dtr);
    new Modal(modalRef.current).show();
  };

  // handle approval
  const handleApproval = async (event, dtr) => {
    event.preventDefault();

    if(dtr) {
      const modalElement = modalForApproval.current;
      const modal = new Modal(modalElement);
      setSelectedDtr(dtr);

      modal.show()
    } else {
      console.error("No DTR selected!");
    }
  }


  return (
    <>
      <DtrDetailsModal selectedDtr={selectedDtr} modalRef={modalRef} />
      <DtrRemarks modalDtrRemarks={modalForApproval} selectedDtr={selectedDtr} userId={props.userId} department='engineering' status='for engineering review' />

      <div className="card mt-5">
        <div className="card-body">

          <div class="card-header">
            DTR from <b>{`${formatDateReadable(props.dateRangeStatus?.date_start)} to ${formatDateReadable(props.dateRangeStatus?.date_end)}`}</b>
          </div>

          <table className="table table-bordered mt-3">
            <thead className="table-success">
              <tr className='highlight-red'>
                <th>Date</th>
                <th>Time In</th>
                <th>Time Out</th>
                <th>Total Hours</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            {props.dtrWithDateRange.length === 0 ? (
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
                  {props.dtrWithDateRange.map(d => (
                    <tr 
                      key={d.id}
                      className={d?.total_hours < 8 ? 'highlight-red' : ''}
                    >
  
                      <td>{d?.shift_date ? formatDateReadable(d?.shift_date) : 'No data available'}</td>
                      <td>{d?.time_in}</td>
                      <td>{d?.time_out}</td>
                      <td>{d?.total_hours || 0}</td>
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
                        <button className="btn btn-info text-white btn-sm me-2" onClick={() => handleView(d)}>
                          View
                        </button>
                        <button className="btn btn-secondary text-white btn-sm" onClick={(e) => handleApproval(e, d)} >
                          Approval
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
