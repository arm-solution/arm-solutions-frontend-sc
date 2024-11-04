import React, { useEffect } from 'react'
import { formatDateReadable } from '../../customs/global/manageDates'
import { useDispatch, useSelector } from 'react-redux'

const DtrRequestTable = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {

  }, [])
  

  return (
    <>

    <div className="row">
        <div className="col col-md-3">

            <div className="form-group">
                <label>From</label>
                <input type="date" className="form-control" />
            </div>
        </div>

        <div className="col col-md-3">

            <div className="form-group">
                <label>From</label>
                <input type="date" className="form-control" />
            </div>
        </div>

        <div className="col col-md-3">
            <label >Select</label>
            <select className="form-select mb-3"  style={{ width: '10rem'}}>
                <option selected disabled>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
        </div>
    </div>

        <table className="table table-bordered">
            <thead className='table-success'>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Date From</th>
                <th scope="col">Date To</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
            {props.dtrRequest.length === 0 ? (
                <tr>
                     <td colSpan="5" style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>No Data Found</td>
                </tr>
            ) : (
                props.dtrRequest.map(d => (
                    <tr key={d.id}>
                        <th>{`${d.firstname} ${d.lastname}`}</th>
                        <th>{formatDateReadable(d?.date_from)}</th>
                        <th>{formatDateReadable(d?.date_to)}</th>
                        <th>{d.status}</th>
                        <th>
                            <button className="btn btn-info text-white btn-sm">View</button>
                        </th>
                    </tr>
                ))
            )}
            </tbody>
        </table>

    </>
  )
}

export default DtrRequestTable