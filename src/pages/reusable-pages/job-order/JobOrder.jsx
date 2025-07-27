import React, { useState, useEffect, useMemo  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProposalByFilter } from '../../../store/features/proposalSlice';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { formatDateReadable } from '../../../customs/global/manageDates';
import './JobOrder.css';

const JobOrder = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();

  // Split the current path and get the section (e.g., "admin", "hr", etc.)
  const department = location.pathname.split("/")[1]

  const [page, setPage] = useState(1);
  const limit = 10;

  const { dataByFilter } = useSelector((state) => state.proposals);
  const total = dataByFilter?.total || 0;
  const totalPages = Math.ceil(total / limit);


  useEffect(() => {
    dispatch(getProposalByFilter({ status: 'pending', page, limit }));
  }, [dispatch])
  


  return (
    <>
        <div className="container my-5">
        <div className="admin-table-wrapper p-4">
            {/* Header + Search */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <h2 className="mb-0 fs-4">Completed Proposal</h2>
            <div className="input-group search-group w-auto">
                <input
                type="search"
                className="form-control"
                placeholder="Search users…"
                />
                <button className="btn btn-primary">
                <i className="bi bi-search"></i> Search
                </button>
            </div>
            </div>

            {/* Table + Pagination inside single wrapper */}
            <div className="table-wrapper">
            <table className="table mb-0 clean-table">
                <thead className="table-success">
                <tr>
                    <th>Creator</th>
                    <th>Client</th>
                    <th>Date</th>
                    <th style={{ width: "160px" }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                  {(dataByFilter?.proposal ?? []).map((proposal) => (
                    <tr key={proposal.id} style={{ borderBottom: "1px solid #dee2e6" }}>
                        <td>{`${proposal.user.firstname} ${proposal.user.lastname}` || "-"}</td>
                        <td>{proposal.client.name || "-"}</td>
                        <td>{formatDateReadable(proposal.date_created) || "-"}</td>
                        <td>
                            <Link className="btn btn-sm btn-outline-success" to={`/${department}/common/job-order-form/${proposal.id}`} >Job Order</Link>
                        </td>
                    </tr>
                 ))}
                </tbody>
            </table>

            </div>
            {/* Pagination: placed INSIDE table-wrapper */}
            <div className="pagination-container p-3 d-flex justify-content-end">
            <ul className="pagination pagination-sm custom-pagination mb-0">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(page - 1)}>
                    Previous
                </button>
                </li>

                {Array.from({ length: totalPages }, (_, i) => (
                <li key={i + 1} className={`page-item ${page === i + 1 ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setPage(i + 1)}>
                    {i + 1}
                    </button>
                </li>
                ))}

                <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(page + 1)}>
                    Next
                </button>
                </li>
            </ul>
            </div>
        </div>
        </div>


    </>
  )
}

export default JobOrder