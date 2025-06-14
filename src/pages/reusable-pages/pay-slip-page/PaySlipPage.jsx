import React, { useState, useEffect } from 'react';
import PaySlipForm from '../../../components/modals-forms/payslip-form/PaySlipForm';
import DataTable from '../../../components/DataTable';
import { getLoggedInID } from '../../../customs/global/manageLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import './PaySlip.css'
import { getEarningsByUserId, getFullEarnings } from '../../../store/features/earningSlice';

import { formatDateReadable } from '../../../customs/global/manageDates';

const PaySlipPage = () => {

  const dispatch = useDispatch();

  const columns = [
    { header: 'Date', accessor: 'date_from' },
  ];

  const [myEarnings, setMyEarnings] = useState([]);

  const { _getEarningsByUserId, _getFullEarnings } = useSelector(state => state.earnings); 

  useEffect(() => {

    const fetchGetEarningByUserId = async() => {
      await dispatch(getEarningsByUserId(getLoggedInID()));
    }

    fetchGetEarningByUserId();

  }, [])


  useEffect(() => {
    if (_getEarningsByUserId.length > 0) {
      const formattedEarnings = _getEarningsByUserId.map(item => ({
        ...item,
        date_from: formatDateReadable(item.date_from)
      }));
  
      setMyEarnings(formattedEarnings);
    }
  }, [_getEarningsByUserId]);
  

  const handleView = async (row) => {

    if(row) {
      await dispatch(getFullEarnings(row.id));
    }
    
  }


  const handleDelete = (row) => {}

  return (
    <>
    <div className="card-container">
    <div className="card payslipCard">
      <div className="card-body">

       <div className="row">
        <div className="col col-md-6">
            <PaySlipForm
              _getFullEarnings={_getFullEarnings}
            />
        </div>


        <div className="col col-md-6">
          <h1 className='mb-5'>PAYSLIP HISTORY</h1>

          <DataTable 
            data={myEarnings || []}
            columns={columns}
            actions={{ handleView, handleDelete }}
            perPage={10}
            deleteAccess={false}
            showAddButtonAndSearchInput={{ searchInput: false, addButton: false }}
            tableLabel=''
            // addData={resetModalFormAdd}
          />


        </div>
       </div>


      </div>
    </div>
    </div>
    
    </>
  )
}

export default PaySlipPage