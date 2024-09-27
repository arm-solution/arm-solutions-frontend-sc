import React, { useEffect, useState } from 'react';
import './AttendanceTable.css';
import { useDispatch, useSelector } from 'react-redux';
import { FaMapMarker, FaCheckCircle, FaInfo } from "react-icons/fa";
import { VscError } from "react-icons/vsc";
import { getDtr } from '../../store/features/dtrSlice';
import { dateFormatted } from '../../customs/global/manageDates';

const AttendanceTable = (props) => {

    const dispatch = useDispatch();

    const { data: dtr } = useSelector(state => state.dtr);

    const [currentPage, setCurrentPage] = useState(1);

    const getIndex = () => {
      const startIndex = (currentPage - 1) * parseInt(props.perPage, 10);
      const endIndex = startIndex + parseInt(props.perPage, 10);

      return { start: startIndex, end: endIndex };
      
    }

    const totalPages = Math.ceil(dtr.length / 10);

    useEffect(() => {
      dispatch(getDtr);
    }, [dispatch])

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };
    
    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    


  return (
    <>
        <div className="attendance-table-container mt-5">
            <div className="search-date-container">
            <div className="row">
                <div className="col-md-6">
                    
                <p>Search By Date Range</p>
                <div className="input-group">
                <input type="date" className="form-control" placeholder="First Name" aria-label="First Name" />
                <input type="date" className="form-control" placeholder="Last Name" aria-label="Last Name" />
                <button className="btn btn-primary">Search</button>
                </div>


                </div>
                <div className="col-md-6">
                </div>
            </div>
            </div>

        <div className="card mt-3">
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
                    { dtr.map((row, index) => (
                        <tr key={index}>
                        <th>{row.shift_date ? dateFormatted(row.shift_date) : 'no-date' }</th>
                        <td> { row.status ? <span className="badge bg-success"> Approved <FaCheckCircle/></span> : <span className="badge bg-danger"> Rejected <VscError /></span>} </td>
                        <td>
                            <button className="btn btn-sm btn-danger me-3"><FaMapMarker /></button>
                            <button className="btn btn-sm btn-info text-white"><FaInfo /></button>
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