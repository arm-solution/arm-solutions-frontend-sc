import React, { useState, useEffect, useMemo } from 'react';
import './DtrListByUser.css';

import DtrByUserTable from '../../../components/dtr-by-user-table/DtrByUserTable';
import PaySlipInputForm from '../../../components/modals-forms/payslip-input-form/PaySlipInputForm';
import EarningListByUser from '../../../components/earning-list-by-user/EarningListByUser';
import OvertimeTablePerUser from '../../../components/overtime-table-per-user/OvertimeTablePerUser';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getDtrByMultipleIds, resetDaterangeDtr } from '../../../store/features/dtrSlice';
import { getUserById } from '../../../store/features/userSlice';
import { getDepartmentById } from '../../../store/features/departmentSlice';
import { getEarningsByUserId } from '../../../store/features/earningSlice';
import { resetOvertimeState } from '../../../store/features/overtime.Slice';

// =====================
// OT PAYABLE CALC
// =====================
const computePayableOt = (totalHours = 0) => {
  const blocks = totalHours / 0.5;
  return Math.floor(blocks) * 0.5;
};

const DtrListByUser = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const [showForm, setShowForm] = useState(false);
  const [dtrIds, setDtrIds] = useState([]);
  const [totalHours, setTotalHours] = useState(0);

  const [dateRangeStatus, setDateRangeStatus] = useState({
    date_start: '',
    date_end: '',
    status: ''
  });

  const { listDtrByMultipleId, dtrWithDateRange } = useSelector(state => state.dtr);
  const { userById } = useSelector(state => state.users);
  const { deprtmentById } = useSelector(state => state.departments);
  const { _getEarningsByUserId, _getFullEarnings } = useSelector(state => state.earnings);
  const { _getOtByUserId } = useSelector(state => state.overtime);

  // =====================
  // FETCH USER
  // =====================
  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId));
      dispatch(getEarningsByUserId(userId));
    }
  }, [userId, dispatch]);

  // =====================
  // FETCH DTR IDS
  // =====================
  useEffect(() => {
    if (showForm && dtrIds.length > 0) {
      dispatch(getDtrByMultipleIds(dtrIds));
    }
  }, [showForm, dtrIds, dispatch]);

  // =====================
  // TOTAL HOURS
  // =====================
  useEffect(() => {
    const total = listDtrByMultipleId.reduce(
      (sum, log) => sum + Number(log.total_hours || 0),
      0
    );
    setTotalHours(total);
  }, [listDtrByMultipleId]);

  // =====================
  // FETCH DEPARTMENT
  // =====================
  useEffect(() => {
    if (userById?.[0]?.department) {
      dispatch(getDepartmentById(userById[0].department));
    }
  }, [userById, dispatch]);

  // =====================
  // RESET ON USER CHANGE
  // =====================
  useEffect(() => {
    dispatch(resetDaterangeDtr());
    dispatch(resetOvertimeState());
  }, [userId, dispatch]);

  // =====================
  // RESHAPE OT DATA
  // =====================
const reshapedOtByUser = useMemo(() => {
  const otList = _getOtByUserId?.data || [];

  if (otList.length === 0) return [];

  return otList.map(ot => ({
    ...ot,
    hrs_payable: computePayableOt(ot.total_hours)
  }));
}, [_getOtByUserId]);

  return (
    <>
      <hr />

      <EarningListByUser
        _getEarningsByUserId={_getEarningsByUserId}
        _getFullEarnings={_getFullEarnings}
        _userById={userById}
      />

      <hr />

      <OvertimeTablePerUser
        setShowForm={setShowForm}
        setDtrIds={setDtrIds}
        userId={userId}
        setDateRangeStatus={setDateRangeStatus}
        dateRangeStatus={dateRangeStatus}
        _getOtByUserId={reshapedOtByUser}
      />

      <DtrByUserTable
        setShowForm={setShowForm}
        setDtrIds={setDtrIds}
        userId={userId}
        setDateRangeStatus={setDateRangeStatus}
        dateRangeStatus={dateRangeStatus}
        dtrWithDateRange={dtrWithDateRange}
      />

      <PaySlipInputForm
        employee={userById?.data}
        deprtmentById={deprtmentById?.[0]}
        dateRangeStatus={dateRangeStatus}
        totalHours={totalHours}
        setDateRangeStatus={setDateRangeStatus}
        dtrWithDateRange={dtrWithDateRange}
        _getOtByUserId={reshapedOtByUser}
        userId={userId}
      />
    </>
  );
};

export default DtrListByUser;
