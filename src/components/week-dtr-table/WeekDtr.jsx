import React, { useState, useEffect } from 'react';
import './WeekDtr.css';
import { formatDateAndTimeReadable, formatDateReadable } from '../../customs/global/manageDates';

const WeekDtr = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Adjust this to set the number of rows per page

    const totalItems = props.dtr.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const currentItems = props.dtr.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Time In</th>
                            <th scope="col">Time Out</th>
                            <th scope="col">Status</th>
                            <th scope="col">Hour</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((d) => (
                            <tr key={d.id}>
                                <th>{formatDateReadable(d?.shift_date)}</th>
                                <td>{d.time_in}</td>
                                <td>{d?.time_out}</td>
                                <td>
                                    <span
                                        className={`badge ${
                                            d?.status === 'pending'
                                                ? 'bg-secondary'
                                                : 'bg-success'
                                        }`}
                                    >
                                        {d.status}
                                    </span>
                                </td>
                                <td>{d.total_hours ? d.total_hours : 0}</td>
                                <td>
                                    <button
                                        className="btn btn-info text-white"
                                        onClick={() => props.handleViewDetails(d)}
                                    >
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Center the pagination controls */}
                <div className="d-flex justify-content-center align-items-center mt-3">
                    <button
                        className="btn btn-outline-primary me-2"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        className="btn btn-outline-primary ms-2"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default WeekDtr;
