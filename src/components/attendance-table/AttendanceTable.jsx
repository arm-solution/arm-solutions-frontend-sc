import React, { useEffect, useState } from 'react';
import './AttendanceTable.css';
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
        if(dateRange.dateFrom === '' || dateRange.dateTo ) {
            return;
        }
        
        dispatch(getDtrById({
            id: getLoggedInID(),
            from: dateRange.dateFrom || undefined,
            to: dateRange.dateTo || undefined
          }));
    }


  return (
    <>
        <div className="attendance-table-container mt-5">
            <div className="card mt-3">
                <div className="card-header fw-bold bg-light">
                    <div className="search-date-container">
                    <div className="row">
                        <div className="col-md-6">
                            
                        <p>Search By Date Range</p>
                        <div className="input-group">
                        <input type="date" className="form-control" onChange={(e) => getDateChange(e, 'dateFrom')} />
                        <input type="date" className="form-control" onChange={(e) => getDateChange(e, 'dateTo')} />
                        <button className="btn btn-primary" onClick={searchAttendance}>Search</button>
                        </div>


                        </div>
                        <div className="col-md-6">
                        </div>
                    </div>
                    </div>
                </div>

                <div className="card-body">
                    
                <table className="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">DATE</th>
                        <th scope="col">STATUS</th>
                        <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        { dtrById.map((row, index) => (
                            <tr key={index}>
                            <th>{row.shift_date ? formatDateReadable(row.shift_date) : 'no-date' }</th>
                            <td> { row.status ? <span className="badge bg-success"> Approved <FaCheckCircle/></span> : <span className="badge bg-danger"> Rejected <VscError /></span>} </td>
                            <td>
                                {/* <button className="btn btn-sm btn-danger me-3"><FaMapMarker /></button> */}
                                {/* <button className="btn btn-sm btn-info text-white"><FaInfo /></button> */}
                                <button
                                    className="btn btn-sm btn-info text-white"
                                    // onClick={() => props.handleViewDetails(row)}
                                    aria-label={`View details for ${formatDateReadable(row.shift_date)}`}
                                >
                                    Details
                                </button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="row">
                    <div className="pagination">
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                </div>

                </div>
            </div>
        </div>
    </>
  )
}

export default AttendanceTable