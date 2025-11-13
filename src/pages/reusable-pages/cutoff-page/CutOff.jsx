import React, { useState, useEffect } from 'react';
import './CutOff.css';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsersWithPagination } from './../../../store/features/userSlice';
import { useNavigate } from 'react-router-dom';

const CutOff = () => {
  const dispatch = useDispatch();
  const { paginatedUser, loading, message } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    dispatch(getAllUsersWithPagination({ page, limit, search }));
  }, [dispatch, page]);

  const handleSearch = () => {
    setPage(1);
    dispatch(getAllUsersWithPagination({ page: 1, limit, search }));
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    setPage(newPage);
  };

  const handleCutOffPerUser = (user) => {
    if (user?.id) {
      navigate(`/admin/payslip-records/${user.id}`);
    } else {
      console.error("No user id found");
    }
  };

  const total = paginatedUser?.total || 0;
  const totalPages = Math.ceil(total / limit);


  // ✅ Safely extract a readable message
  const displayMessage =
    typeof message === 'object'
      ? message?.message || 'No data available'
      : message || 'No data available';

  return (
    <div className="container" style={{ marginTop: '3rem' }}>
      <div className="card shadow-sm cutoff-card" style={{ borderRadius: '1rem' }}>
        <div
          className="card-header bg-primary text-white d-flex justify-content-between align-items-center cutoff-header"
          style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
        >
          <h5 className="mb-0">Cut-off Records</h5>
        </div>

        <div className="card-body p-0">
          {/* 🔍 Search Section */}
          <div className="d-flex justify-content-end align-items-center p-3">
            <div className="input-group" style={{ maxWidth: '300px' }}>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-sm btn-primary"
                type="button"
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>

          {/* 🧾 Table Section */}
          <div className="table-responsive">
            <table
              className={`table table-bordered table-hover align-middle mb-0 cutoff-table ${
                !(paginatedUser?.data && paginatedUser.data.length > 0)
                  ? 'empty-state'
                  : ''
              }`}
              role="table"
            >
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Employee ID</th>
                  <th></th>
                </tr>
              </thead>

              {paginatedUser?.data && paginatedUser.data.length > 0 ? (
                <tbody>
                  {paginatedUser.data.map((item, index) => (
                    <tr key={item.id || index}>
                      <td>{item.firstname} {item.lastname}</td>
                      <td>{item.email}</td>
                      <td>{item.employee_id}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => handleCutOffPerUser(item)}
                        >
                          Show Records
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={4} className="no-data cutoff-no-data text-center" role="cell">
                      {loading ? 'Loading...' : displayMessage}
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>

          {/* 🔸 Pagination Section */}
          <div className="d-flex justify-content-between align-items-center px-3 py-3 flex-wrap gap-2 border-top">
            <span className="text-muted small">
              Showing{' '}
              {paginatedUser?.data && paginatedUser.data.length > 0
                ? (page - 1) * limit + 1
                : 0}
              –
              {paginatedUser?.data && paginatedUser.data.length > 0
                ? Math.min(page * limit, total)
                : 0}{' '}
              of {total} entries
            </span>

            <ul className="pagination pagination-sm mb-0 cutoff-pagination">
              <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(page - 1)}>
                  Previous
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CutOff;
