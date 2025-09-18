import React, { useEffect, useState } from 'react';
import './DtrReview.css';
import { useSelector, useDispatch } from 'react-redux';
import { getPendingDtrUsers } from '../../../store/features/dtrSlice';
import { useNavigate } from "react-router-dom";
import Loading from '../../../components/loading-spinner/Loading';

const DtrReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getPendingUserDtr, loading: pendingDtrLoading } = useSelector(
    (state) => state.dtr
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getPendingDtrUsers('for engineering review'));
  }, [dispatch]);

  // Pagination logic
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

  const reviewDtr = (employeeID) => {
    navigate(`/engineering/dtr-review-employees/${employeeID}`);
  }

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Employee Directory</h4>
            </div>
            <div className="card-body">
              {/* Search (UI only, no function) */}
              <div className="row mb-3">
                <div className="col-md-6 col-lg-4">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search employees..."
                      // no value / onChange here
                    />
                  </div>
                </div>
                <div className="col-md-6 col-lg-8 mt-1">
                  <div className="ms-auto">
                    <button className="btn btn-primary btn-sm">
                      <i className="bi bi-search me-1"></i>
                      Search
                    </button>
                  </div>
                </div>
              </div>

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
                          <th>Fullname</th>
                          <th>Employee ID</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentData.length > 0 ? (
                          currentData.map((item) => (
                            <tr key={item.id}>
                              <td className="fw-medium">{item.firstname} {item.lastname}</td>
                              <td className="text-break">{item.employee_id}</td>
                              <td>
                                <span className="badge bg-secondary">
                                  {item.status}
                                </span>
                              </td>
                              <td>
                                <div className="btn-group btn-group-sm">
                                  <button className="btn btn-outline-primary" onClick={() => reviewDtr(item.id) }>
                                    Review
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center py-4">
                              <div className="text-muted">
                                <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                                No records found
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {getPendingUserDtr?.length > 0 && (
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <small className="text-muted">
                        Showing {startIndex + 1}-
                        {Math.min(endIndex, getPendingUserDtr.length)} of{' '}
                        {getPendingUserDtr.length} entries
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
  );
};

export default DtrReview;
