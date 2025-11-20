import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaInfo } from "react-icons/fa";
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import DtrDetailsModal from '../modals-forms/dtr-details/DtrDetailsModal';

import { 
    getAllDtrByStatusAndUserIdPaginated 
} from '../../store/features/dtrSlice';

import { getLoggedInID } from '../../customs/global/manageLocalStorage';
import { formatDateReadable } from '../../customs/global/manageDates';

import './AttendanceTable.css';

const AttendanceTable = (props) => {

    const dispatch = useDispatch();

    const modalRef = useRef(null);

    const { getDtrWithUserIdStatusPaginated } = useSelector(state => state.dtr);

    const [dateRange, setDateRange] = useState({
        dateFrom: '',
        dateTo: ''
    });

    const [selectedDtr, setSelectedDtr] = useState(null);

    const page = getDtrWithUserIdStatusPaginated?.page ?? 1;
    const limit = (getDtrWithUserIdStatusPaginated?.limit ?? props.perPage) || 10;
    const total = getDtrWithUserIdStatusPaginated?.total ?? 0;
    const totalPages = Math.ceil(total / limit);

    useEffect(() => {
        fetchData(1);
    }, []);

    const fetchData = (pageToLoad) => {
        dispatch(
            getAllDtrByStatusAndUserIdPaginated({
                userId: getLoggedInID(),
                dtrParams: {
                    page: pageToLoad,
                    limit: props.perPage || 10,
                    fromDate: dateRange.dateFrom || undefined,
                    toDate: dateRange.dateTo || undefined
                }
            })
        );
    };

    const handlePrevPage = () => {
        if (page > 1) fetchData(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) fetchData(page + 1);
    };

    const getDateChange = (e, field) => {
        setDateRange(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const searchAttendance = () => {
        if (!dateRange.dateFrom || !dateRange.dateTo) return;
        fetchData(1);
    };

    const handleShowDetails = (row) => {
        setSelectedDtr(row);

        if(selectedDtr) {
            new Modal(modalRef.current).show();
        } else {
            return
        }
    }

    return (
        <div className="attendance-wrapper">

            <DtrDetailsModal selectedDtr={selectedDtr} modalRef={modalRef} />

            <div className="container-fluid">
                
                {/* Header */}
                <div className="attendance-header">
                    <h1 className="attendance-title">Attendance Records</h1>
                </div>

                {/* Search Filter */}
                <div className="attendance-search">
                    <h6 className="search-label">Search By Date Range</h6>
                    <div className="row g-2">
                        <div className="col-12 col-sm-6 col-lg-5">
                            <label className="form-label-sm">From Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={dateRange.dateFrom}
                                onChange={(e) => getDateChange(e, 'dateFrom')}
                            />
                        </div>
                        <div className="col-12 col-sm-6 col-lg-5">
                            <label className="form-label-sm">To Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={dateRange.dateTo}
                                onChange={(e) => getDateChange(e, 'dateTo')}
                            />
                        </div>
                        <div className="col-12 col-lg-2">
                            <label className="form-label-sm d-none d-lg-block">&nbsp;</label>
                            <button 
                                className="btn btn-primary w-100" 
                                onClick={searchAttendance}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table Card */}
                <div className="attendance-table-card">
                    <div className="table-responsive">
                        <table className="table attendance-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {getDtrWithUserIdStatusPaginated?.data?.length > 0 ? (
                                    getDtrWithUserIdStatusPaginated.data.map((row, index) => (
                                        <tr key={index}>
                                            <td>
                                                <span className="date-text">
                                                    {row.shift_date ? formatDateReadable(row.shift_date) : 'No Date'}
                                                </span>
                                            </td>

                                            <td>
                                                {row.status}
                                            </td>

                                            <td className="text-center">
                                                <div className="action-buttons">
                                                    <button 
                                                        className="btn btn-primary" 
                                                        onClick={() => handleShowDetails(row)}
                                                    >
                                                        Details
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="no-records">
                                            <div className="no-records-content">
                                                <FaInfo className="no-records-icon" />
                                                <p className="no-records-text">No attendance records found</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {getDtrWithUserIdStatusPaginated?.data?.length > 0 && (
                        <div className="attendance-pagination">
                            <button
                                className="btn btn-pagination"
                                onClick={handlePrevPage}
                                disabled={page === 1}
                            >
                                Previous
                            </button>

                            <span className="pagination-info">
                                Page <strong>{page}</strong> of <strong>{totalPages}</strong>
                            </span>

                            <button
                                className="btn btn-pagination"
                                onClick={handleNextPage}
                                disabled={page === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AttendanceTable;