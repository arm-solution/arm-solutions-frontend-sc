import React, { useState } from 'react';
import './OverTime.css';
import { getLoggedInID } from '../../../customs/global/manageLocalStorage';
import { useDispatch } from 'react-redux';
import { postOvertime } from '../../../store/features/overtime.Slice';
import { successDialog, errorDialog } from '../../../customs/global/alertDialog';
import { calculateFlexibleDecimalHours } from '../../../customs/global/manageDates';

const Overtime = () => {

  const dispatch = useDispatch();

  const [overtimeRows, setOvertimeRows] = useState([
    { id: 1, dateStart: '', timeIn: '', dateEnd: '', remarks: '', timeOut: '', status: '', user_id: 0 }
  ]);

  const handleInputChange = (id, field, value) => {
    setOvertimeRows(overtimeRows.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      dateStart: '',
      timeIn: '',
      dateEnd: '',
      timeOut: '',
      remarks: '',
      user_id: parseInt(getLoggedInID(postOvertime()))
    };
    setOvertimeRows([...overtimeRows, newRow]);
  };

  const handleDeleteRow = (id) => {
    if (overtimeRows.length > 1) {
      setOvertimeRows(overtimeRows.filter(row => row.id !== id));
    } else {
      alert('At least one row is required');
    }
  };

const handleSubmit = async () => {
  // Check if any field is empty in any row
  const hasEmptyFields = overtimeRows.some(row => {
    return (
      !row.dateStart.trim() ||
      !row.timeIn.trim() ||
      !row.dateEnd.trim() ||
      !row.timeOut.trim() ||
      !row.remarks.trim()
    );
  });

  if (hasEmptyFields) {
    errorDialog("All fields are required!");
    return;
  }


  const transformOvertimeData =  overtimeRows.map(item => ({
      ot_date_time_start: `${item.dateStart}T${item.timeIn}:00`,
      ot_date_time_end: `${item.dateEnd}T${item.timeOut}:00`,
      user_id: getLoggedInID(),
      status: 'for approval',
      total_hours: calculateFlexibleDecimalHours(item.dateStart, item.dateEnd, item.timeIn, item.timeOut),
      // dtr_id: dtr_id,
      remarks: item.remarks || ''
  }));


  console.log('transformOvertimeData', transformOvertimeData);

  const { payload } = await dispatch(postOvertime(transformOvertimeData))

  if(payload.success) {
    setOvertimeRows([{ id: 1, dateStart: '', timeIn: '', dateEnd: '', remarks: '', timeOut: '', status: '', user_id: 0 }])
    successDialog("Filed Overtime Success");
  } else {
    errorDialog("Error while file overtime please report to technical team")
  }

};

  return (
    <div className="container py-4 overtime-container">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">File an Overtime</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-success">
                <tr>
                  <th>OT Date Start</th>
                  <th>OT Time In</th>
                  <th>OT Date End</th>
                  <th>OT Time Out</th>
                  <th>Remarks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {overtimeRows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <input
                        type="date"
                        className="form-control"
                        value={row.dateStart}
                        onChange={(e) => handleInputChange(row.id, 'dateStart', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        className="form-control"
                        value={row.timeIn}
                        onChange={(e) => handleInputChange(row.id, 'timeIn', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        className="form-control"
                        value={row.dateEnd}
                        onChange={(e) => handleInputChange(row.id, 'dateEnd', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        className="form-control"
                        value={row.timeOut}
                        onChange={(e) => handleInputChange(row.id, 'timeOut', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={row.remarks}
                        onChange={(e) => handleInputChange(row.id, 'remarks', e.target.value)}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteRow(row.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="btn btn-primary mt-3" onClick={handleAddRow}>
            +
          </button>
        </div>
      </div>

      {/* Submit button outside the card */}
      <div className="overtime-submit-container">
        <button className="btn btn-success" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Overtime;
