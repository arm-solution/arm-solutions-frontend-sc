import React, {useState, useEffect} from 'react';
import './PaySlipInputForm.css';
import { useSelector, useDispatch } from 'react-redux';
import { postAdditionalEarnings } from '../../../store/features/additionalEarningsSlice';
import { postEarning } from '../../../store/features/earningSlice';
import { getLoggedInID } from '../../../customs/global/manageLocalStorage';
import FloatNotification from '../../float-notification/FloatNotification';

const PaySlipInputForm = (props) => {

  const dispatch = useDispatch();

  const [grossPay, setGrossPay] = useState("");
  const [additionalPays, setAdditionalPays] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const [cutoffDates, setCutoffDates] = useState({
    from: '',
    to: ''
  });

  const [notification, setNotification] = useState({
    message: 'Generating Cutoff Success',
    type: 'success'
  });

  const { postAdditionalEarningBool } = useSelector(state => state.additionalEarnings);

  useEffect(() => {
    if (props.dateRangeStatus?.date_start && props.dateRangeStatus?.date_end) {
      setCutoffDates({
        from: props.dateRangeStatus.date_start,
        to: props.dateRangeStatus.date_end
      });
    }
  }, [props.dateRangeStatus]);


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
    setCutoffDates({
        from: '',
        to: ''
    })
  }



  const handlePostEarnings = async (e) => {
    e.preventDefault();

    if (props.employee?.length > 0 && props.employee[0]?.id  && cutoffDates.from && cutoffDates.to) {

        const addTotal = additionalPays.reduce((sum, row) => sum + parseFloat(row.amount || 0), 0);
        const dedTotal = deductions.reduce((sum, row) => sum + parseFloat(row.amount || 0), 0);
        
        const finalEarnings = {
            employee_id : props.employee[0]?.id,
            date_from : cutoffDates.from,
            date_to : cutoffDates.to,
            generated_by : getLoggedInID() ? getLoggedInID() : 0,
            gross_pay : grossPay,
            total_additional_pay : addTotal,
            total_deduction : dedTotal,
            final_pay : calculateFinalPay(),
        }

        const { payload } = await dispatch(postEarning(finalEarnings));

        if(payload.success && payload?.lastid > 0) {
          
          const finalAdditionalEarnings = [
            ...additionalPays.map(({label, ...item}) => ({ ...item, earnings_id: payload?.lastid, title: label })),
            ...deductions.map(({label, ...item}) => ({ ...item, earnings_id: payload?.lastid, title: label })),
          ];

          await dispatch(postAdditionalEarnings(finalAdditionalEarnings)); 
          resetForms();
        }

      }
  }

  return (
    <>
    
    <div className="container my-4 p-4 bg-white border rounded shadow-sm">

        <div className="row">

            <div className="col-md-5">
                <div className="border rounded p-3 bg-light h-100">
                <h5>Employee Info</h5>
                {props.employee ? props.employee.map(emp => (
                    <>
                        <p><strong>Name: </strong> {`${emp?.firstname} ${emp?.lastname}` || '---'}</p>
                        <p><strong>Employee ID: </strong>{emp?.employee_id || '---'}</p>
                        <p><strong>Department: </strong> { props.deprtmentById?.department || '---'}</p>
                        <p><strong>Total hours: </strong>{ props.totalHours ? props.totalHours : '---' }</p>
                    
                    </>
                )) : (
                    <p>No Information Found</p>
                )}
                {/* Add more info if needed */}
                </div>
            </div>
            <div className="col-md-7">

            <form>
                <div className="mb-3 row align-items-center">
                    <label className="col-sm-2 col-form-label text-end">Cut-off From:</label>
                    <div className="col-sm-4">
                        <input
                        type="date"
                        className="form-control long-date-input"
                        value={cutoffDates.from}
                        onChange={(e) => setCutoffDates({ ...cutoffDates, from: e.target.value })}
                        disabled={!!props.dateRangeStatus?.date_start}
                        />
                    </div>

                    <label className="col-sm-2 col-form-label text-end">To:</label>
                    <div className="col-sm-4">
                        <input
                        type="date"
                        className="form-control long-date-input"
                        value={cutoffDates.to}
                        onChange={(e) => setCutoffDates({ ...cutoffDates, to: e.target.value })}
                        disabled={!!props.dateRangeStatus?.date_end}
                        />
                    </div>
                </div>



                {/* GROSS PAY */}
                <div className="mb-3 row align-items-center">
                    <label className="col-sm-3 col-form-label text-end">Gross Pay:</label>
                    <div className="col-sm-3">
                    <input
                        type="number"
                        className="form-control"
                        value={grossPay}
                        onChange={(e) => setGrossPay(e.target.value)}
                    />
                    </div>
                </div>

                {/* ADDITIONAL PAY */}
                <div className="mb-2 row align-items-center">
                    <label className="col-sm-3 col-form-label text-end">Additional Pay:</label>
                    <div className="col-sm-3">
                    <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={() => handleAddRow("additional")}
                    >
                        Add additional
                    </button>
                    </div>
                </div>

                {additionalPays.map((item, idx) => (
                    <div className="mb-2 row" key={`add-${idx}`}>
                    <div className="col-sm-3 offset-sm-3 mb-1 mb-sm-0">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Label"
                        value={item.label}
                        onChange={(e) => handleChange(idx, "label", e.target.value, "additional")}
                        />
                    </div>
                    <div className="col-sm-3 mb-1 mb-sm-0">
                        <input
                        type="number"
                        className="form-control"
                        placeholder="Amount"
                        value={item.amount}
                        onChange={(e) => handleChange(idx, "amount", e.target.value, "additional")}
                        />
                    </div>
                    <div className="col-sm-2">
                        <button
                        type="button"
                        className="btn btn-outline-danger btn-sm w-100"
                        onClick={() => removeRow(idx, "additional")}
                        >
                        Remove
                        </button>
                    </div>
                    </div>
                ))}

                {/* DEDUCTIONS */}
                <div className="mb-2 row align-items-center">
                    <label className="col-sm-3 col-form-label text-end">Deductions:</label>
                    <div className="col-sm-3">
                    <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={() => handleAddRow("deduction")}
                    >
                        Add deduction
                    </button>
                    </div>
                </div>

                {deductions.map((item, idx) => (
                    <div className="mb-2 row" key={`ded-${idx}`}>
                    <div className="col-sm-3 offset-sm-3 mb-1 mb-sm-0">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Label"
                        value={item.label}
                        onChange={(e) => handleChange(idx, "label", e.target.value, "deduction")}
                        />
                    </div>
                    <div className="col-sm-3 mb-1 mb-sm-0">
                        <input
                        type="number"
                        className="form-control"
                        placeholder="Amount"
                        value={item.amount}
                        onChange={(e) => handleChange(idx, "amount", e.target.value, "deduction")}
                        />
                    </div>
                    <div className="col-sm-2">
                        <button
                        type="button"
                        className="btn btn-outline-danger btn-sm w-100"
                        onClick={() => removeRow(idx, "deduction")}
                        >
                        Remove
                        </button>
                    </div>
                    </div>
                ))}

                {/* FINAL PAY */}
                <div className="mb-3 row align-items-center">
                    <label className="col-sm-3 col-form-label text-end">Final Pay:</label>
                    <div className="col-sm-6">
                    <input type="text" className="form-control" value={calculateFinalPay()} readOnly />
                    </div>
                </div>

                <div className="text-end mt-3">
                    <button type="button" className="btn btn-outline-primary" onClick={(e) => handlePostEarnings(e)}>Submit</button>
                </div>

                  { postAdditionalEarningBool && (
                    <FloatNotification message={ notification.message } type={notification.type} onClose={closeNotification}/>
                  )}
            </form>



            </div>
          </div>
        </div>
                
    
    </>
  )
}

export default PaySlipInputForm