import { useEffect, useState } from "react";
import "./PaySlipUserRecords.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEarningsByUserIdWithPagination } from "../../../store/features/earningSlice";

const PaySlipUserRecords = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const { _getEarningsByUserWithPagination, loading } = useSelector(
    (state) => state.earnings
  );

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const total = _getEarningsByUserWithPagination?.total || 0;
  const totalPages = _getEarningsByUserWithPagination?.totalPages || 1;
  const data = _getEarningsByUserWithPagination?.data || [];

  // Fetch paginated data
  useEffect(() => {
    const getUserRecord = async () => {
      if (userId) {
        await dispatch(getEarningsByUserIdWithPagination({ employeeId: userId, page, limit }));
      } else {
        navigate("/not-found");
      }
    };

    getUserRecord();
  }, [dispatch, userId, page, limit, navigate]);

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    console.log("data", data)
  }, [data])
  

  // Handle View button
  const handleView = (recordId) => {
    navigate(`/payslip/view/${recordId}`);
  };

  return (
    <div className="container" style={{ marginTop: "3rem" }}>
      <div className="card shadow-sm cutoff-card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Pay Slip Records</h5>
        </div>

        <div className="card-body p-0">
          {/* 🔍 Search Section */}
          <div className="d-flex justify-content-end align-items-center p-3">
            <div className="d-flex align-items-end" style={{ gap: "10px", maxWidth: "500px" }}>
              <div className="form-group mb-0">
                <label htmlFor="dateFrom" className="form-label" style={{ fontSize: "0.85rem" }}>
                  Date From
                </label>
                <input type="date" className="form-control form-control-sm" id="dateFrom" />
              </div>

              <div className="form-group mb-0">
                <label htmlFor="dateTo" className="form-label" style={{ fontSize: "0.85rem" }}>
                  Date To
                </label>
                <input type="date" className="form-control form-control-sm" id="dateTo" />
              </div>

              <div className="form-group mb-0">
                <button
                  className="btn btn-sm btn-primary"
                  type="button"
                  id="searchButton"
                  style={{ marginTop: "1.45rem" }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle mb-0 cutoff-table">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "50%" }}>Date Created</th>
                  <th style={{ width: "50%" }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {/* 🌀 Centered Loading Spinner */}
                {loading && (
                  <tr>
                    <td colSpan={2} className="cutoff-no-data">
                      <div className="d-flex justify-content-center align-items-center">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                          style={{ width: "2rem", height: "2rem" }}
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

                {/* 🧾 No Data */}
                {!loading && data.length === 0 && (
                  <tr>
                    <td colSpan={2} className="cutoff-no-data">
                      No data available
                    </td>
                  </tr>
                )}

                {/* 📋 Data Rows */}
                {!loading &&
                  data.length > 0 &&
                  data.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {item.date_created
                          ? new Date(item.date_created).toLocaleDateString()
                          : "—"}
                      </td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleView(item.id)}
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* 🔸 Pagination */}
          <div className="d-flex justify-content-between align-items-center px-3 py-3 flex-wrap gap-2 border-top">
            <span className="text-muted small">
              Showing {(page - 1) * limit + 1}–
              {Math.min(page * limit, total)} of {total} entries
            </span>

            <ul className="pagination pagination-sm mb-0 cutoff-pagination">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(page - 1)}>
                  Previous
                </button>
              </li>

              {[...Array(totalPages)].map((_, idx) => (
                <li key={idx} className={`page-item ${page === idx + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => handlePageChange(idx + 1)}>
                    {idx + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
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

export default PaySlipUserRecords;
