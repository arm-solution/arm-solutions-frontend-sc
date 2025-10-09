import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaMapMarker, FaCheckCircle, FaInfo } from "react-icons/fa";
import { VscError } from "react-icons/vsc";
import { getDtrById } from '../../store/features/dtrSlice';
import { dateFormatted } from '../../customs/global/manageDates';
import { getLoggedInID } from '../../customs/global/manageLocalStorage';
import { formatDateReadable } from '../../customs/global/manageDates';

const AttendanceTable = (props) => {

    const dispatch = useDispatch();

    const { dtrById } = useSelector(state => state.dtr);

    const [currentPage, setCurrentPage] = useState(1);
    const [dateRange, setDateRange] = useState({
        dateFrom: '',
        dateTo: ''
    })
    
    useEffect(() => {
        dispatch(getDtrById({
          id: getLoggedInID(),
          from: dateRange.dateFrom | undefined,
          to: dateRange.dateTo | undefined
        }));
      }, []);

    const getIndex = () => {
      const startIndex = (currentPage - 1) * parseInt(props.perPage, 10);
      const endIndex = startIndex + parseInt(props.perPage, 10);
      return { start: startIndex, end: endIndex };
    }
    
    const totalPages = Math.ceil(dtrById.length / 10);

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };
    
    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const getDateChange = (e, field) => {
        setDateRange((pre) => ({
            ...pre,
            [field]: e.target.value
        }))
    }

    const searchAttendance = () => {
        if(dateRange.dateFrom === '' || dateRange.dateTo === '') {
            return;
        }
        
        dispatch(getDtrById({
            id: getLoggedInID(),
            from: dateRange.dateFrom || undefined,
            to: dateRange.dateTo || undefined
          }));
    }

  return (
    <div className="container-fluid p-3 bg-light min-vh-100">
        {/* Header Section */}
        <div className="card mb-4 border-0 shadow-sm">
            <div className="card-body bg-gradient text-center py-4" style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'}}>
                <h1 className="h3 mb-0 text-secondary fw-semibold">Attendance Records</h1>
            </div>
        </div>

        {/* Search Section */}
        <div className="card mb-4 border-0 shadow-sm">
            <div className="card-body p-4">
                <h6 className="text-muted mb-3">Search By Date Range</h6>
                <div className="row g-3">
                    <div className="col-md-5">
                        <input 
                            type="date" 
                            className="form-control form-control-sm" 
                            placeholder="From Date"
                            onChange={(e) => getDateChange(e, 'dateFrom')} 
                        />
                    </div>
                    <div className="col-md-5">
                        <input 
                            type="date" 
                            className="form-control form-control-sm" 
                            placeholder="To Date"
                            onChange={(e) => getDateChange(e, 'dateTo')} 
                        />
                    </div>
                    <div className="col-md-2">
                        <button 
                            className="btn btn-primary btn-sm w-100" 
                            onClick={searchAttendance}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Table Section */}
        <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                <th scope="col" className="fw-semibold text-uppercase small text-muted py-3">Date</th>
                                <th scope="col" className="fw-semibold text-uppercase small text-muted py-3">Status</th>
                                <th scope="col" className="fw-semibold text-uppercase small text-muted py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dtrById && dtrById.length > 0 ? (
                                dtrById.map((row, index) => (
                                    <tr key={index}>
                                        <td className="py-3 fw-medium text-dark">
                                            {row.shift_date ? formatDateReadable(row.shift_date) : 'No Date'}
                                        </td>
                                        <td className="py-3">
                                            {row.status ? (
                                                <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-2">
                                                    <FaCheckCircle className="me-1" style={{fontSize: '0.75rem'}} /> 
                                                    <span className="d-none d-md-inline">Approved</span>
                                                </span>
                                            ) : (
                                                <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-3 py-2">
                                                    <VscError className="me-1" style={{fontSize: '0.75rem'}} /> 
                                                    <span className="d-none d-md-inline">Rejected</span>
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 text-center">
                                            <button 
                                                className="btn btn-warning btn-sm rounded-circle me-2 d-inline-flex align-items-center justify-content-center"
                                                style={{width: '32px', height: '32px'}}
                                                title="View Location"
                                            >
                                                <FaMapMarker style={{fontSize: '0.75rem'}} />
                                            </button>
                                            <button 
                                                className="btn btn-info btn-sm rounded-circle d-inline-flex align-items-center justify-content-center"
                                                style={{width: '32px', height: '32px'}}
                                                title="View Details"
                                            >
                                                <FaInfo style={{fontSize: '0.75rem'}} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center py-5 text-muted">
                                        <div className="d-flex flex-column align-items-center">
                                            <div className="mb-2 opacity-50">
                                                <FaInfo size={24} />
                                            </div>
                                            <span>No attendance records found</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination Section */}
                {dtrById && dtrById.length > 0 && (
                    <div className="bg-light border-top p-3">
                        <div className="d-flex justify-content-center align-items-center gap-3">
                            <button 
                                className="btn btn-outline-secondary btn-sm" 
                                onClick={handlePrevPage} 
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle px-3 py-2 fs-6">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button 
                                className="btn btn-outline-secondary btn-sm" 
                                onClick={handleNextPage} 
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default AttendanceTable