import React, { useEffect } from 'react'
import './DtrRequest.css'
import DtrRequestTable from '../../components/dtr-request-table/DtrRequestTable'
import { useSelector, useDispatch } from 'react-redux'
import { getAllDtrRequest } from '../../store/features/dtrRequestSlice'

const DtrRequest = () => {

 const dispatch = useDispatch();

 useEffect(() => {
    dispatch(getAllDtrRequest())
 }, [dispatch])

 const { getAllDtrRequestResponse, loading } = useSelector(state => state.dtrRequests);
 

  return (
    <>
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Dtr Request</h5>
                    <DtrRequestTable 
                        dtrRequest={getAllDtrRequestResponse}
                    />
                </div>
            </div>
        </div>
    </>
  )
}

export default DtrRequest