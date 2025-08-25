import React, { useState, useEffect, useCallback } from 'react';
import './WeekDtr.css';
import { formatDateAndTimeReadable, formatDateReadable } from '../../customs/global/manageDates';

const WeekDtr = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalItems = props.dtr?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const currentItems = props.dtr?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) || [];

    // Format time for display
    const formatTime = useCallback((time) => {
        if (!time || time === '00:00:00' || time === '') return '--:--';
        return time.substring(0, 5);
    }, []);

    // Get status class for styling
    const getStatusClass = useCallback((status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'status-completed';
            case 'approved': return 'status-approved';
            case 'for approval': return 'status-approved';
            default: return 'status-pending';
        }
    }, []);

    // Format hours display
    const formatHours = useCallback((hours) => {
        if (!hours || hours === 0) return '0.00';
        return parseFloat(hours).toFixed(2);
    }, []);

    // Navigation handlers
    const handleNextPage = useCallback(() => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    }, [currentPage, totalPages]);

    const handlePreviousPage = useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    }, [currentPage]);

    // Reset to page 1 when DTR data changes
    useEffect(() => {
        setCurrentPage(1);
    }, [props.dtr]);

    // Render empty state
    const renderEmptyState = () => (
        <div className="empty-state">
            <div className="empty-icon">
                <i className="fas fa-calendar-times" aria-hidden="true"></i>
            </div>
            <p className="empty-text">No DTR records found</p>
        </div>
    );

    // Render card layout for mobile
    const renderCardLayout = () => (
        <div className="dtr-list">
            {currentItems.map((d) => (
                <div key={d.id} className="dtr-card">
                    <div className="card-header">
                        <div className="card-date">
                            {formatDateReadable(d.shift_date)}
                        </div>
                        <span className={`card-status ${getStatusClass(d.status)}`}>
                            {d.status || 'pending'}
                        </span>
                    </div>
                    
                    <div className="card-details">
                        <div className="detail-item">
                            <div className="detail-label">Time In</div>
                            <div className="detail-value">
                                {formatTime(d.time_in)}
                            </div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Time Out</div>
                            <div className={`detail-value ${!d.time_out ? 'empty' : ''}`}>
                                {formatTime(d.time_out)}
                            </div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Hours</div>
                            <div className="detail-value">
                                {formatHours(d.total_hours)}h
                            </div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Status</div>
                            <div className="detail-value">
                                {d.status || 'Pending'}
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-actions">
                        <button
                            className="details-btn"
                            onClick={() => props.handleViewDetails(d)}
                            aria-label={`View details for ${formatDateReadable(d.shift_date)}`}
                        >
                            <i className="fas fa-eye" style={{ marginRight: '0.5rem' }} aria-hidden="true"></i>
                            View Details
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    // Render table layout for desktop
    const renderTableLayout = () => (
        <div className="dtr-table-container">
            <table className="dtr-table">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Time In</th>
                        <th scope="col">Time Out</th>
                        <th scope="col">Status</th>
                        <th scope="col">Hours</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((d) => (
                        <tr key={d.id}>
                            <td className="table-date">
                                {formatDateReadable(d.shift_date)}
                            </td>
                            <td className="table-time">
                                {formatTime(d.time_in)}
                            </td>
                            <td className="table-time">
                                {formatTime(d.time_out)}
                            </td>
                            <td>
                                <span className={`card-status ${getStatusClass(d.status)}`}>
                                    {d.status || 'pending'}
                                </span>
                            </td>
                            <td className="table-hours">
                                {formatHours(d.total_hours)}h
                            </td>
                            <td>
                                <button
                                    className="details-btn"
                                    onClick={() => props.handleViewDetails(d)}
                                    aria-label={`View details for ${formatDateReadable(d.shift_date)}`}
                                >
                                    Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    // Render pagination
    const renderPagination = () => (
        <div className="pagination-container">
            <button
                className="pagination-btn"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                <i className="fas fa-chevron-left" aria-hidden="true"></i>
            </button>
            
            <span className="pagination-info">
                Page {currentPage} of {totalPages}
            </span>
            
            <button
                className="pagination-btn"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                <i className="fas fa-chevron-right" aria-hidden="true"></i>
            </button>
        </div>
    );

    return (
        <div className="week-dtr-container">
            <div className="dtr-header">
                <h3 className="dtr-title">
                    <i className="fas fa-calendar-week" aria-hidden="true"></i>
                    Weekly DTR
                </h3>
                <p className="dtr-summary">
                    {totalItems} record{totalItems !== 1 ? 's' : ''} found
                </p>
            </div>

            {totalItems === 0 ? (
                renderEmptyState()
            ) : (
                <>
                    {renderCardLayout()}
                    {renderTableLayout()}
                    {totalPages > 1 && renderPagination()}
                </>
            )}
        </div>
    );
};

export default WeekDtr;