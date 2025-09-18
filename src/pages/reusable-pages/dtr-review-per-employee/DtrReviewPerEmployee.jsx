import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../../components/loading-spinner/Loading';
import { formatDateReadable } from '../../../customs/global/manageDates';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../../store/features/userSlice';
import { getAllDtrWithDateRange } from '../../../store/features/dtrSlice';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import './DtrReviewPerEmployee.css'
import { updateMultipleDtrStatus } from '../../../store/features/dtrSlice';
import { handleConfirmation } from '../../../customs/global/alertDialog';

import DtrDetailsModal from '../../../components/modals-forms/dtr-details/DtrDetailsModal';

const DtrReviewPerEmployee = () => {

  const modalEngrRevRef = useRef(null);

  const dispatch = useDispatch();
  const { userId } = useParams();

  const { dtrWithDateRange, loading: dtrLoding } = useSelector(state => state.dtr);
  const { userById, loading: userLoding} = useSelector(state => state.users)
    
  const { getPendingUserDtr, loading: pendingDtrLoading } = useSelector(
    (state) => state.dtr
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedDtr, setSelectedDtr] = useState(null);

  const totalPages = Math.ceil(
    (getPendingUserDtr?.length || 0) / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = getPendingUserDtr?.slice(startIndex, endIndex) || [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  useEffect(() => {
    console.log("dtrWithDateRange", dtrWithDateRange)
    if(userById.data) {
        console.log("userById", userById.data.firstname)
    }

  }, [dtrWithDateRange, userById])

  const reviewDtrModal = (event, dtr) => {
    event.preventDefault();

    if(dtr) {
      const modalElement = modalEngrRevRef.current;
      const modal = new Modal(modalElement);
      setSelectedDtr(dtr);
    
      modal.show(); 
    } else {
      console.error("No DTR selected!");
    }

  } 

  useEffect(() => {
    if(userId) {
        dispatch(getUserById(userId));
        dispatch(getAllDtrWithDateRange({userId, dtrParams: {status: 'for engineering review'}}))
    }
  }, [])

  const handleApproval = async (event, status, itemSelected) => {
    event.preventDefault();

    if(!status && !itemSelected) {
      console.error("Missing parameter");
      return;
    }

    handleConfirmation({
        title: "",
        text: "Are you sure you want to time out early?",
        confirmButtonText: "Yes, Time Out"
    }, async () => {

      const { payload } = await dispatch(updateMultipleDtrStatus({status, ids: [itemSelected.id] }))
      
      if(payload.success) {
        // refetch the data displaying to table
        await dispatch(getAllDtrWithDateRange({userId, dtrParams: {status: 'for engineering review'}}))
        return true;
      }
      
      return false
      
    })

  }
  

  return (
    <>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h4 className="mb-0">
                    {  userById.data ? `${userById.data.firstname} ${userById.data.lastname}` : 'no-data' }
                  </h4>
                </div>
                <div className="card-body">
    
                  {/* Loading Spinner */}
                  {pendingDtrLoading ? (
                    <div className="text-center my-5">
                      <Loading />
                    </div>
                  ) : (
                    <>
                      {/* Table */}
                      <div className="table-responsive">
                        <table className="table table-hover table-striped custom-table">
                          <thead className="table-dark">
                            <tr>
                              <th>Date</th>
                              <th>Total Hours</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dtrWithDateRange.length > 0 ? (
                              dtrWithDateRange.map((item) => (
                                <tr key={item.id}>
                                  <td className="fw-medium">{item.shift_date ? formatDateReadable(item.shift_date) : '---'}</td>
                                  <td className="text-break">{item.total_hours}</td>
                                  <td>
                                    <span className="badge bg-secondary">
                                      {item.status}
                                    </span>
                                  </td>
                                  <td>
                                      <button className="btn btn-outline-primary me-2" onClick={(e) => reviewDtrModal(e, item)}>
                                        Details
                                      </button>
        
                                      <button className="btn btn-outline-success me-2" onClick={(e) => handleApproval(e, 'for approval', item)}>
                                        Approve
                                      </button>
                                      <button className="btn btn-outline-danger" onClick={(e) => handleApproval(e, 'rejected', item)}>
                                        Reject
                                      </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                            <tr className="empty-row">
                                <td colSpan="4" className="p-0">
                                <div className="empty-placeholder">
                                    <div className="empty-message">
                                    <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                                    No records found
                                    </div>
                                </div>
                                </td>
                            </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
    
                      {/* Pagination */}
                      {getAllDtrWithDateRange?.length > 0 && (
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <small className="text-muted">
                            Showing {startIndex + 1}-
                            {Math.min(endIndex, getAllDtrWithDateRange.length)} of{' '}
                            {getAllDtrWithDateRange.length} entries
                          </small>
                          <ul className="pagination pagination-sm mb-0">
                            <li
                              className={`page-item ${
                                currentPage === 1 ? 'disabled' : ''
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                              >
                                <i className="bi bi-chevron-left"></i>
                              </button>
                            </li>
                            {getPageNumbers().map((page) => (
                              <li
                                key={page}
                                className={`page-item ${
                                  currentPage === page ? 'active' : ''
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() => handlePageChange(page)}
                                >
                                  {page}
                                </button>
                              </li>
                            ))}
                            <li
                              className={`page-item ${
                                currentPage === totalPages ? 'disabled' : ''
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                              >
                                <i className="bi bi-chevron-right"></i>
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DtrDetailsModal modalRef={modalEngrRevRef} selectedDtr={selectedDtr}/>
    </>
  )
}

export default DtrReviewPerEmployee