import React, { useEffect } from 'react'
import './DtrRequest.css'
import { useSelector, useDispatch } from 'react-redux'
import { getPendingDtrUsers } from '../../store/features/dtrSlice';
import DataTable from '../../components/DataTable';

const DtrRequest = () => {

 const dispatch = useDispatch();

 const columns = [
    { header: 'Fullname', accessor: 'fullname' },
    { header: 'Emp Id', accessor: 'employee_id' },
    { header: 'Status', accessor: 'status' }
  ];

 useEffect(() => {
    dispatch(getPendingDtrUsers());
 }, [dispatch])

 const { getPendingUserDtr, loading: pendingDtrLoading } = useSelector(state => state.dtr);
 
const handleView = (id) => {
    console.log("id", id)
}

  return (
    <>
        <div className="mt-5">

            { pendingDtrLoading ? 'Loading...' : (
                <DataTable
                data={Array.isArray(getPendingUserDtr) ? getPendingUserDtr : []} // Ensure data is an array
                columns={columns}
                actions={{ handleView }}
                perPage={10}
                showAddButtonAndSearchInput={{ searchInput: true, addButton: false }}
                deleteAccess={false}
                tableLabel='Pending Dtr users'
                />
            )}
        </div>

    </>
  )
}

export default DtrRequest