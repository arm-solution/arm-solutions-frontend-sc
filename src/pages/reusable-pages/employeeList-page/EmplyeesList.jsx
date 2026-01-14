import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import { getAllUsersWithPagination, deleteUser } from '../../../store/features/userSlice';
import { deleteConfirmation } from '../../../customs/global/alertDialog';
import EmployeesForm from './../../../components/modals-forms/employees-form/EmployeesForm'
import './Employees.css';

const EmployeesList = () => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  
  const { 
    paginatedUser, 
    loading = false,
  } = useSelector((state) => state.users);

  const employees = paginatedUser.data || [];
  const total = paginatedUser.total || 0;
  const totalPages = paginatedUser.totalPages || 1;

  const [searchInput, setSearchInput] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const limit = 10;

  // Fetch employees on mount and when dependencies change
  useEffect(() => {
    dispatch(getAllUsersWithPagination({ page, limit, search: activeSearch }));
  }, [dispatch, page, activeSearch]);

  // Search handler - triggered by button click
  const handleSearch = useCallback(() => {
    setActiveSearch(searchInput);
    setPage(1);
  }, [searchInput]);

  // Handle Enter key press for search
  const handleSearchKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  // Clear search handler
  const handleClearSearch = useCallback(() => {
    setSearchInput('');
    setActiveSearch('');
    setPage(1);
  }, []);

  // Pagination handler
  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  // Modal handlers
  const handleView = useCallback((employee) => {
    setSelectedUser(employee);
    const modal = new Modal(modalRef.current);
    modal.show();
  }, []);

  const handleAdd = useCallback(() => {
    setSelectedUser(null);
    const modal = new Modal(modalRef.current);
    modal.show();
  }, []);

  // Delete handler with confirmation
  const handleDelete = useCallback(async (id) => {
    deleteConfirmation(
      {
        title: "Delete Employee",
        text: "Are you sure you want to delete this employee?",
        icon: "warning",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
        deleteTitle: "Deleting...",
        deleteText: "Please wait",
        successTitle: "Deleted!",
        successText: "Employee has been deleted successfully."
      },
      async () => {
        const { payload } = await dispatch(deleteUser(id));
        const result = payload?.affectedRows > 0;
        
        if (result) {
          dispatch(getAllUsersWithPagination({ page, limit, search: activeSearch }));
        }
        
        return result;
      }
    );
  }, [dispatch, page, activeSearch]);

  // Calculate pagination range
  const maxVisiblePages = 5;
  const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  const adjustedStartPage = Math.max(1, endPage - maxVisiblePages + 1);

  return (
    <div className="employees-container">

      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Employee List</h5>
          <button 
            className="btn btn-light btn-sm"
            onClick={handleAdd}
            disabled={loading}
          >
            <i className="bi bi-plus-circle me-1"></i>
            Add Employee
          </button>
        </div>

        <div className="card-body">
          {/* Search and Info Row */}
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  🔍
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search employees..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  disabled={loading}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  Search
                </button>
                {activeSearch && (
                  <button
                    className="btn btn-outline-secondary"
                    onClick={handleClearSearch}
                    disabled={loading}
                    title="Clear search"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            <div className="col-md-6 text-end">
              <small className="text-muted">
                Showing {employees.length} of {total} employees
                {activeSearch && <span> (filtered)</span>}
              </small>
            </div>
          </div>

          {/* Loading Spinner */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Employee ID</th>
                      <th>Fullname</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.length > 0 ? (
                      employees.map((employee) => (
                        <tr key={employee.id}>
                          <td className="fw-bold">{employee.employee_id}</td>
                          <td>
                            {employee.firstname} {employee.middlename} {employee.lastname}
                            <br />
                            <small className="text-muted">({employee.nickname})</small>
                          </td>
                          <td>{employee.email}</td>
                          <td>
                            <span className="badge bg-info text-dark">
                              {employee.department_name}
                            </span>
                          </td>
                          <td className="text-center">
                              <button
                                className="btn btn-outline-primary"
                                onClick={() => handleView(employee)}
                                title="View/Edit"
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => handleDelete(employee.id)}
                                title="Delete"
                              >
                                Delete
                              </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={7}
                          style={{
                            padding: 0,
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              minHeight: "80px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span className="text-muted">
                              {activeSearch
                                ? "No employees found matching your search"
                                : "No employees found"}
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div aria-label="Employee pagination" className="mt-3">
                  <ul className="pagination justify-content-center mb-0">
                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1 || loading}
                      >
                        Previous
                      </button>
                    </li>
                    
                    {Array.from(
                      { length: endPage - adjustedStartPage + 1 }, 
                      (_, i) => adjustedStartPage + i
                    ).map((pageNum) => (
                      <li key={pageNum} className={`page-item ${page === pageNum ? 'active' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => handlePageChange(pageNum)}
                          disabled={loading}
                        >
                          {pageNum}
                        </button>
                      </li>
                    ))}
                    
                    <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages || loading}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Employee Form Modal - Import your EmployeesForm component */}
      <EmployeesForm modalRef={modalRef} selectedUser={selectedUser} />
    </div>
  );
};

export default EmployeesList;