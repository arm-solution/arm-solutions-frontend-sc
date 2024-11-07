import React, { useEffect, useState } from 'react'
import { formatDateReadable } from '../../customs/global/manageDates'
import { useDispatch, useSelector } from 'react-redux'
import './DtrByUser.css';

const DtrByUserTable = (props) => {

  const [ids, setIds] = useState([]);

  const sampleData = [
    {
      id: 151,
      user_id: 14,
      shift_id: null,
      time_in: "11:05:41",
      time_out: "15:11:20",
      overtime: null,
      undertime: null,
      status: "pending",
      shift_date: "2024-11-04T00:00:00.000Z",
      break_start: "14:49:13",
      break_end: "15:05:11",
      ot_start: null,
      ot_end: null,
      modified_by: null,
      date_modified: null,
      remarks: null,
      longitude: "121.1100241",
      latitude: "14.0354858",
      inside_geofence: null,
      total_hours: 3.72
    },
    {
      id: 152,
      user_id: 14,
      shift_id: null,
      time_in: "11:05:41",
      time_out: "15:11:20",
      overtime: null,
      undertime: null,
      status: "pending",
      shift_date: "2024-11-04T00:00:00.000Z",
      break_start: "14:49:13",
      break_end: "15:05:11",
      ot_start: null,
      ot_end: null,
      modified_by: null,
      date_modified: null,
      remarks: null,
      longitude: "121.1100241",
      latitude: "14.0354858",
      inside_geofence: null,
      total_hours: 3.72
    },
    {
      id: 153,
      user_id: 14,
      shift_id: null,
      time_in: "00:47:14",
      time_out: "00:58:41",
      overtime: null,
      undertime: null,
      status: "pending",
      shift_date: "2024-11-05T00:00:00.000Z",
      break_start: "00:54:17",
      break_end: "00:57:26",
      ot_start: null,
      ot_end: null,
      modified_by: null,
      date_modified: null,
      remarks: null,
      longitude: "121.1587269",
      latitude: "14.0432759",
      inside_geofence: null,
      total_hours: 0.12
    },
    {
      id: 154,
      user_id: 1,
      shift_id: null,
      time_in: "00:59:00",
      time_out: "01:31:42",
      overtime: null,
      undertime: null,
      status: "pending",
      shift_date: "2024-11-05T00:00:00.000Z",
      break_start: "01:09:27",
      break_end: "01:15:58",
      ot_start: null,
      ot_end: null,
      modified_by: null,
      date_modified: null,
      remarks: null,
      longitude: "121.1587269",
      latitude: "14.0432759",
      inside_geofence: null,
      total_hours: 0.18
    }
  ];

  const handleCheckbox = (id, e) => {
    e.preventDefault();

  }
      
  return (
    <>
        <div className="card mt-5">
            <div className="card-body">

            <div className="row">
                <div className="col col-md-3">

                    <div className="form-group">
                        <label>From</label>
                        <input type="date" className="form-control" />
                    </div>
                </div>

                <div className="col col-md-3">

                    <div className="form-group">
                        <label>To</label>
                        <input type="date" className="form-control" />
                    </div>
                </div>

                <div className="col col-md-3">
                    <label >Select</label>
                    <select className="form-select mb-3"  style={{ width: '10rem'}} defaultValue="">
                        <option value='' disabled>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </div>


                <table className="table table-bordered">
                    <thead className='table-success'>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Date</th>
                            <th scope="col">Time In</th>
                            <th scope="col">Time Out</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {sampleData.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>No Data Found</td>
                        </tr>
                    ) : (
                        sampleData.map(d => (
                            <tr key={d.id}>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" onChange={(e) => handleCheckbox(d.id, e)} style={{ border: '1px solid black'}} />
                                </td>
                                <td>{ d?.shift_date }</td>
                                <td>{d?.time_in}</td>
                                <td>{d?.time_out}</td>
                                <td>{d?.status}</td>
                                <td>
                                    <button className="btn btn-info text-white btn-sm">View</button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>

            </div>
        </div>

    </>
  )
}

export default DtrByUserTable