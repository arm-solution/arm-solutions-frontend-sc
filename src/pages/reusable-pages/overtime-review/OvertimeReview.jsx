import { useEffect, useState } from 'react';
import './OvertimeReview.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/loading-spinner/Loading';
import { getAllUsersWithPagination } from '../../../store/features/userSlice';

const OvertimeReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { paginatedUser, loading } = useSelector((state) => state.users);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch data when component mounts or when page/search changes
  useEffect(() => {
    dispatch(getAllUsersWithPagination({ page, limit, search }));
  }, [dispatch, page]);

  // Handle search button click
  const handleSearch = () => {
    setPage(1); // reset to first page when searching
    dispatch(getAllUsersWithPagination({ page: 1, limit, search }));
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= paginatedUser?.totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container" style={{ marginTop: '3rem' }}>
      <div className="card shadow-sm cutoff-card" style={{ borderRadius: '1rem' }}>
        <div
          className="card-header bg-primary text-white d-flex justify-content-between align-items-center cutoff-header"
          style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
        >
          <h5 className="mb-0">Overtime Review</h5>
        </div>

        <div className="card-body p-0">
          {/* 🔍 Search Section */}
          <div className="d-flex justify-content-end align-items-center p-3">
            <div className="input-group" style={{ maxWidth: '300px' }}>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-sm btn-primary"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>

          {/* 📋 Table Section */}
          <div className="table-responsive">
            {loading ? (
              <div className="text-center py-5">
                <Loading />
              </div>
            ) : (
              <table
                className="table table-bordered table-hover align-middle mb-0 cutoff-table"
                role="table"
              >
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Employee ID</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedUser?.data?.length > 0 ? (
                    paginatedUser.data.map((user) => (
                      <tr key={user.id}>
                        <td>{`${user.firstname} ${user.middlename ? user.middlename[0] + '.' : ''} ${user.lastname}`}</td>
                        <td>{user.email}</td>
                        <td>{user.employee_id}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => navigate(`/admin/overtime-records/${user.id}`)}
                          >
                            View Request
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center text-muted py-3">
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination Section */}
          {!loading && paginatedUser && (
            <div className="d-flex justify-content-between align-items-center px-3 py-3 flex-wrap gap-2 border-top">
              <span className="text-muted small">
                Showing {(page - 1) * limit + 1}–
                {Math.min(page * limit, paginatedUser.total)} of{' '}
                {paginatedUser.total} entries
              </span>

              <ul className="pagination pagination-sm mb-0 cutoff-pagination">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page - 1)}
                  >
                    Previous
                  </button>
                </li>

                {[...Array(paginatedUser.totalPages)].map((_, idx) => (
                  <li
                    key={idx}
                    className={`page-item ${page === idx + 1 ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(idx + 1)}
                    >
                      {idx + 1}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    page === paginatedUser.totalPages ? 'disabled' : ''
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OvertimeReview;
