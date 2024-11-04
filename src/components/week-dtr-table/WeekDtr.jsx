import React from 'react';
import './WeekDtr.css';
import { formatDateAndTimeReadable, formatDateReadable } from '../../customs/global/manageDates';

const WeekDtr = (props) => {
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
                { props.dtr.map(d => (
                <tr key={d.id}>
                    <th>{ formatDateReadable(d?.shift_date) }</th>
                    <td>{ d.time_in }</td>
                    <td>{ d?.time_out }</td>
                    <td><span className={`badge ${d?.status === 'pending' ? 'bg-secondary' : 'bg-success'}`}>{d.status}</span></td>
                    <td>{ d.total_hours ? d.total_hours : 0 }</td>
                    <td>
                        <button className="btn btn-info text-white" onClick={() => props.handleViewDetails(d)}>Details</button>
                    </td>
                </tr>
                ))}

            </tbody>
        </table>
    </div>
    </>
  )
}

export default WeekDtr