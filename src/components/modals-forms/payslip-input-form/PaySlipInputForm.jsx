import React, {useState, useEffect} from 'react';
import './PaySlipInputForm.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postAdditionalEarnings } from '../../../store/features/additionalEarningsSlice';
import { postEarning } from '../../../store/features/earningSlice';
import { getLoggedInID } from '../../../customs/global/manageLocalStorage';
import FloatNotification from '../../float-notification/FloatNotification';
import { getAllDtrWithDateRange, updateMultipleDtrStatus } from '../../../store/features/dtrSlice';
import { getEarningsByUserId } from '../../../store/features/earningSlice';
import { getOvertimeByUserId } from '../../../store/features/overtime.Slice';

const PaySlipInputForm = (props) => {

  const dispatch = useDispatch();

  const _getOtByUserIdVar = props._getOtByUserId?.data || [];

  const [grossPay, setGrossPay] = useState(0);
  const [additionalPays, setAdditionalPays] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const [cutOffTotalHours, setCutOffTotalHours] = useState(0);
  const [totalOvertime, setTotalOvertime] = useState(0)
  const [grossOtPay, setGrossOtPay] = useState(0)

  // const { userId } = useParams();

  const [ids, setIds] = useState([]);
  const [imageLinks, setImageLinks] = useState([]);

  const [notification, setNotification] = useState({
    message: 'Generating Cutoff Success',
    type: 'success'
  });

  const { postAdditionalEarningBool } = useSelector(state => state.additionalEarnings);


  const handleAddRow = (type) => {
    const newRow = { label: "", amount: "", earning_type: type };
  
    if (type === "additional") {
      if (additionalPays.length === 0) {
        setAdditionalPays([newRow]);
        return;
      }
  
      const lastRow = additionalPays[additionalPays.length - 1];
      if (!lastRow.label || !lastRow.amount) {
        alert("Please fill in the current additional pay row before adding a new one.");
        return;
      }
  
      setAdditionalPays([...additionalPays, newRow]);
  
    } else if (type === "deduction") {
      if (deductions.length === 0) {
        setDeductions([newRow]);
        return;
      }
  
      const lastRow = deductions[deductions.length - 1];
      if (!lastRow.label || !lastRow.amount) {
        alert("Please fill in the current deduction row before adding a new one.");
        return;
      }
  
      setDeductions([...deductions, newRow]);
    }
  };

  useEffect(() => {
    if(props.employee && props.employee?.salary > 0) {
      setGrossPay(props.employee?.salary || 0);
    }
  }, [props.employee])
  
  const handleChange = (index, field, value, type) => {
    const updater = type === "additional" ? [...additionalPays] : [...deductions];
    updater[index][field] = value;
    type === "additional" ? setAdditionalPays(updater) : setDeductions(updater);
  };

  const calculateFinalPay = () => {
    const addTotal = additionalPays.reduce((sum, row) => sum + parseFloat(row.amount || 0), 0);
    const dedTotal = deductions.reduce((sum, row) => sum + parseFloat(row.amount || 0), 0);
    return (parseFloat(grossPay || 0) + addTotal - dedTotal).toFixed(2);
  };

  const removeRow = (index, type) => {
    const updated = type === "additional" ? [...additionalPays] : [...deductions];
    updated.splice(index, 1);
    type === "additional" ? setAdditionalPays(updated) : setDeductions(updated);
  };

  const closeNotification = () => {
    setNotification({
      message: '',
      type: ''
    });
  };

  const resetForms = () => {
    setGrossPay("");
    setAdditionalPays([]);
    setDeductions([]);

  }

  const handlePostEarnings = async (e) => {
    e.preventDefault();

    if (props.employee && props.dateRangeStatus.date_start && props.dateRangeStatus.date_end && ids.length > 0) {

        const addTotal = additionalPays.reduce((sum, row) => sum + parseFloat(row.amount || 0), 0);
        const dedTotal = deductions.reduce((sum, row) => sum + parseFloat(row.amount || 0), 0);
        
        const finalEarnings = {
            employee_id : props.employee?.id,
            date_from : props.dateRangeStatus.date_start,
            date_to : props.dateRangeStatus.date_end,
            generated_by : getLoggedInID() ? getLoggedInID() : 0,
            gross_pay : grossPay,
            total_additional_pay : addTotal,
            total_deduction : dedTotal,
            final_pay : calculateFinalPay(),
            date_created: new Date().toISOString().split('T')[0],
            total_overtime_hours: totalOvertime,
            total_gross_overtime: grossOtPay,
            overtime_rate: getOvertimeRate()
        }

        if(finalEarnings.final_pay > 0) {

          const { payload } = await dispatch(postEarning(finalEarnings));
  
          if(payload.success && payload?.lastid > 0) {
  
            // const { payload: updateDtrStatusRes } = await dispatch(updateMultipleDtrStatus({ status: 'approved', ids, imageLinks: imageLinks }))
            await dispatch(getEarningsByUserId(props.employee.id));
            
            // if(updateDtrStatusRes.success) {
            //   await dispatch(getEarningsByUserId(props.employee.id));
            //   if(props.employee) {
            //   }
            //   setIds([]);
            //   setImageLinks([]);
            // }
            
            const finalAdditionalEarnings = [
              ...additionalPays.map(({label, ...item}) => ({ ...item, earnings_id: payload?.lastid, title: label })),
              ...deductions.map(({label, ...item}) => ({ ...item, earnings_id: payload?.lastid, title: label })),
            ];
  
            await dispatch(postAdditionalEarnings(finalAdditionalEarnings)); 
            resetForms();
          }
        } else {
          setNotification({
            message: 'Cannot generate with negative final pay',
            type: 'error'
          })
        }

    }
  }

  const updateDateRangeStatus = ({ target: { name, value } }) => {
    props.setDateRangeStatus(prev => ({ ...prev, [name]: value }));
  };

const searchDtr = async () => {
  const newStatus = {
    ...props.dateRangeStatus,
    status: ['for approval', 'rejected', 'reject by engineering', 'approved'],
  };

  const overtimeparams = {
    id: props.userId,
    status: 'approved',
    form: props.dateRangeStatus.date_start,
    to: props.dateRangeStatus.date_start
  }

  props.setDateRangeStatus(newStatus);

  await dispatch(getAllDtrWithDateRange({ 
    userId: props.userId, 
    dtrParams: newStatus 
  }));

  await dispatch(getOvertimeByUserId(overtimeparams))
};

useEffect(() => {

}, [props.userId])


useEffect(() => {
  if (props.dtrWithDateRange.length > 0) {
    setIds(props.dtrWithDateRange.map(d => d.id));
    setImageLinks(props.dtrWithDateRange.map(d => d.image_link));

    const baseGross = props.employee?.salary * props.dtrWithDateRange.length;
    setGrossPay(baseGross);

    const sum = props.dtrWithDateRange.reduce((acc, curr) => acc + (curr.total_hours || 0), 0);
    setCutOffTotalHours(sum);
  }

  // getting total hours for overtime
  if (_getOtByUserIdVar.length > 0) {
    const otSum = _getOtByUserIdVar.reduce((acc, curr) => acc + (curr.total_hours || 0), 0);
    setTotalOvertime(otSum);

    if (otSum > 0 && getOvertimeRate() > 0) {
      const otPay = getOvertimeRate() * otSum;
      setGrossOtPay(otPay);

      // ✅ Add OT pay to Gross Pay
      setGrossPay(prev => (prev || 0) + otPay);
    }
  }
}, [props.dtrWithDateRange, props.employee, _getOtByUserIdVar]);


  // getting total overtime hrs
  const getOvertimeRate = () => {
    if (props.employee?.salary && props.employee?.salary > 0) {
      return (props.employee.salary / 8) * 1.25
    }
    return 0
  }
    

  return (
    <>
      <div className="container my-4">

          {/* Header */}
          <div className="payslip-header">
            <h4 className="payslip-title">Payslip Generation Form</h4>
          </div>

          <div className="row g-0">
            
            {/* Employee Info Panel */}
            <div className="col-lg-4 col-md-5">
              <div className="form-section employee-info-section">
                <div className="employee-info-card">
                  <h5 className="mb-3" style={{color: '#495057', fontWeight: '600'}}>Employee Information</h5>
                  
                  <div className="info-value">
                    <span className="info-label">Name:</span>
                    <div>{`${props.employee?.firstname || ''} ${props.employee?.lastname || ''}` || '---'}</div>
                  </div>
                  
                  <div className="info-value">
                    <span className="info-label">Employee ID:</span>
                    <div>{props.employee?.employee_id || '---'}</div>
                  </div>
                  
                  <div className="info-value">
                    <span className="info-label">Department:</span>
                    <div>{props.employee?.department_details?.name || '---'}</div>
                  </div>

                  <div className="info-value">
                    <span className="info-label">Daily Salary:</span>
                    <div>{ props.employee?.salary || '---' }</div>
                  </div>
                  
                  <div className="info-value mb-0">
                    <span className="info-label">Total Overtime Hours:</span>
                    <div>{ totalOvertime || '---' }</div>
                  </div>

                  <div className="info-value mb-0">
                    <span className="info-label">Overtime Rate:</span>
                    <div>{ getOvertimeRate() }</div>
                  </div>

                  <div className="info-value mb-0">
                    <span className="info-label">Total Hours:</span>
                    <div>{ cutOffTotalHours || '---' }</div>
                  </div>

                </div>
              </div>
            </div>

            {/* Form Panel */}
            <div className="col-lg-8 col-md-7">
              <div className="form-section">
                <form>
                  
                  {/* Cut-off Dates */}
                  <div className="date-range-container">
                    <h6 className="mb-3" style={{color: '#495057', fontWeight: '600'}}>Pay Period</h6>
                    <div className="row g-3">

                      <div className="col-sm-4">
                        <label className="form-label">From Date</label>
                        <input
                          type="date"
                          className="form-control long-date-input"
                          value={props.dateRangeStatus.date_start}
                          name='date_start'
                          onChange={updateDateRangeStatus}
                          // disabled={!!props.dateRangeStatus?.date_start}
                        />
                      </div>
                      <div className="col-sm-4">
                        <label className="form-label">To Date</label>
                        <input
                          type="date"
                          className="form-control long-date-input"
                          value={props.dateRangeStatus.date_end}
                          name='date_end'
                          onChange={updateDateRangeStatus}
                          // disabled={!!props.dateRangeStatus?.date_end}
                        />
                      </div>

                      <div className="col-sm-4 d-flex align-items-end mt-5">
                        <button
                          type="button"
                          className="btn btn-add btn-sm w-100"
                          onClick={searchDtr}
                        >
                          Search
                        </button>
                      </div>

                    </div>
                  </div>

                  <div className="gross-pay-section">

                  {/* OT Gross Pay */}
                    <div className="row align-items-center">
                      <div className="col-sm-6">
                        <label className="form-label mb-0">Overtime</label>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-group">
                          <span className="input-group-text">₱</span>
                          <input
                            type="number"
                            className="form-control"
                            value={grossOtPay}
                            onChange={(e) => setGrossOtPay(e.target.value)}
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>
                    </div>
                    <br />

                    {/* Gross Pay */}
                    <div className="row align-items-center">
                      <div className="col-sm-6">
                        <label className="form-label mb-0">Base Gross Pay</label>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-group">
                          <span className="input-group-text">₱</span>
                          <input
                            type="number"
                            className="form-control"
                            value={grossPay}
                            onChange={(e) => setGrossPay(e.target.value)}
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="section-divider" />

                  {/* Additional Pay Section */}
                  <div className="mb-4">
                    <div className="section-header">
                      <h6 className="section-title">Additional Earnings</h6>
                      <button
                        type="button"
                        className="btn btn-add btn-sm"
                        onClick={() => handleAddRow("additional")}
                      >
                        + Add Earning
                      </button>
                    </div>

                    {additionalPays.map((item, idx) => (
                      <div className="dynamic-row" key={`add-${idx}`}>
                        <div className="row g-2 align-items-center">
                          <div className="col-sm-6">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="e.g., Overtime, Bonus"
                              value={item.label}
                              onChange={(e) => handleChange(idx, "label", e.target.value, "additional")}
                            />
                          </div>
                          <div className="col-sm-4">
                            <div className="input-group">
                              <span className="input-group-text">₱</span>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="0.00"
                                value={item.amount}
                                onChange={(e) => handleChange(idx, "amount", e.target.value, "additional")}
                                min="0"
                                step="0.01"
                              />
                            </div>
                          </div>
                          <div className="col-sm-2">
                            <button
                              type="button"
                              className="btn btn-remove btn-sm w-100"
                              onClick={() => removeRow(idx, "additional")}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Deductions Section */}
                  <div className="mb-4">
                    <div className="section-header">
                      <h6 className="section-title">Deductions</h6>
                      <button
                        type="button"
                        className="btn btn-add btn-sm"
                        onClick={() => handleAddRow("deduction")}
                      >
                        + Add Deduction
                      </button>
                    </div>

                    {deductions.map((item, idx) => (
                      <div className="dynamic-row" key={`ded-${idx}`}>
                        <div className="row g-2 align-items-center">
                          <div className="col-sm-6">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="e.g., Tax, Insurance"
                              value={item.label}
                              onChange={(e) => handleChange(idx, "label", e.target.value, "deduction")}
                            />
                          </div>
                          <div className="col-sm-4">
                            <div className="input-group">
                              <span className="input-group-text">₱</span>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="0.00"
                                value={item.amount}
                                onChange={(e) => handleChange(idx, "amount", e.target.value, "deduction")}
                                min="0"
                                step="0.01"
                              />
                            </div>
                          </div>
                          <div className="col-sm-2">
                            <button
                              type="button"
                              className="btn btn-remove btn-sm w-100"
                              onClick={() => removeRow(idx, "deduction")}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Final Pay */}
                  <div className="final-pay-section">
                    <div className="row align-items-center">
                      <div className="col-sm-6">
                        <label className="final-pay-label mb-0">Net Pay</label>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-group">
                          <span className="input-group-text">₱</span>
                          <input 
                            type="text" 
                            className="form-control final-pay-input" 
                            value={calculateFinalPay()} 
                            readOnly 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="submit-section">
            <button 
              type="button" 
              className="btn btn-submit"
              onClick={(e) => handlePostEarnings(e)}
            >
              Generate Payslip
            </button>
          </div>

          {postAdditionalEarningBool && (
            <FloatNotification 
              message={notification.message} 
              type={notification.type} 
              onClose={closeNotification}
            />
          )}
        </div>
    </>
  )
}

export default PaySlipInputForm