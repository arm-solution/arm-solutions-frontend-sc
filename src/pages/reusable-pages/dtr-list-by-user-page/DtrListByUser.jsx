import React, { useState, useEffect } from 'react';
import './DtrListByUser.css';
import DtrByUserTable from '../../../components/dtr-by-user-table/DtrByUserTable';
import PaySlipInputForm from '../../../components/modals-forms/payslip-input-form/PaySlipInputForm'
import { useDispatch, useSelector } from 'react-redux';
import { getDtrByMultipleIds } from '../../../store/features/dtrSlice';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../../store/features/userSlice'; 
import { getDepartmentById } from '../../../store/features/departmentSlice';
import { getEarningsByUserId, getFullEarnings } from '../../../store/features/earningSlice';
import EarningListByUser from '../../../components/earning-list-by-user/EarningListByUser';

const DtrListByUser = () => {

  const dispatch = useDispatch();

  const { userId } = useParams();

  const [showForm, setShowForm] = useState(false);
  const [dtrIds, setDtrIds] = useState([]);

  const { listDtrByMultipleId } = useSelector(state => state.dtr);
  const { userById } = useSelector(state => state.users);
  const { deprtmentById } = useSelector(state => state.departments);
  const { _getEarningsByUserId, _getFullEarnings } = useSelector(state => state.earnings);

  const [totalHours, setTotalHours] = useState(0);

  const [dateRangeStatus, setDateRangeStatus] = useState({
    date_start: '',
    date_end: '',
    status: ''
  });


   const { dtrWithDateRange } = useSelector(state => state.dtr);

  useEffect(() => {
    const getEmployeeById = async () => {
      if(userId) {
        await dispatch(getUserById(userId));
        await dispatch(getEarningsByUserId(userId));
      }
    }

    getEmployeeById();
  }, []);

  useEffect(() => {
    
    const getDtrList = async() => {

      if(showForm && dtrIds > 0) {
       await dispatch(getDtrByMultipleIds(dtrIds))
      }

    }

    getDtrList();

  }, [dtrIds, showForm])

  useEffect(() => {

    if (listDtrByMultipleId.length > 0) {
      const totalHours = listDtrByMultipleId.reduce((sum, log) => sum + log.total_hours, 0);
      setTotalHours(totalHours);
    }

  }, [listDtrByMultipleId, userById, deprtmentById]);

  useEffect(() => {
    const fetchDepartment = async () => {
      if (userById && Array.isArray(userById) && userById[0]?.department) {
        await dispatch(getDepartmentById(userById[0].department));
      }
    };
  
    fetchDepartment();
  }, [userById]);
  
  


  return (
    <>

        <hr></hr>
 
        {/* list of all user payslip */}
        <EarningListByUser 
          _getEarningsByUserId={_getEarningsByUserId}
          _getFullEarnings={_getFullEarnings}
          _userById={userById}
        />
        <hr />

        {dtrWithDateRange.length > 0 && (
            <DtrByUserTable 
              setShowForm={setShowForm}
              setDtrIds={setDtrIds}
              userId={userId}
              setDateRangeStatus={setDateRangeStatus}
              dateRangeStatus={dateRangeStatus}
              dtrWithDateRange={dtrWithDateRange}
            />
        )}

          <PaySlipInputForm 
            employee={userById?.data} 
            deprtmentById={deprtmentById[0]}
            dateRangeStatus={dateRangeStatus}
            totalHours={totalHours}
            setDateRangeStatus={setDateRangeStatus}
            dtrWithDateRange={dtrWithDateRange}
            userId={userId}
          />

    </>
  )
}

export default DtrListByUser