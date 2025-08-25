import React, { useEffect, useState, useCallback } from 'react';
import './CurrentShift.css';
import { dateFormatted } from '../../customs/global/manageDates';
import { getCurrentDtr } from '../../store/features/dtrSlice';
import { useDispatch, useSelector } from 'react-redux';

const CurrentShift = (props) => {
  const { shift, setShift } = props.shiftState;
  const dispatch = useDispatch();
  const { currentDtr } = useSelector(state => state.dtr);

  // Initialize shift data
  useEffect(() => {
    const getCurrentUserDtr = async () => {
      if (props.position === 'onsite') {
        await dispatch(getCurrentDtr({ user_id: props.user_id, status: 'pending' }));
      } else {
        // Load from sessionStorage
        const shiftDetails = sessionStorage.getItem('currentShift');
        if (shiftDetails) {
          setShift(JSON.parse(shiftDetails));
        }

        // Listen for shift updates
        const handleShiftUpdate = () => {
          const updatedShiftDetails = sessionStorage.getItem('currentShift');
          if (updatedShiftDetails) {
            setShift(JSON.parse(updatedShiftDetails));
          } else {
            setShift(null);
          }
        };

        window.addEventListener('currentShift', handleShiftUpdate);
        return () => window.removeEventListener('currentShift', handleShiftUpdate);
      }
    };

    getCurrentUserDtr();
  }, [setShift, props.position, props.user_id, dispatch]);

  // Update shift from Redux state
  useEffect(() => {
    if (currentDtr && currentDtr[0]) {
      setShift(currentDtr[0]);
    }
  }, [currentDtr, setShift]);

  // Format time display (12-hour format)
  const formatTime = useCallback((time) => {
    if (!time || time === '00:00:00' || time === '') return '--:--';

    const [hourStr, minuteStr] = time.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr;

    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    if (hour === 0) hour = 12; // Midnight or Noon case

    return `${hour}:${minute} ${ampm}`;
  }, []);


  // Get status display
  const getStatusInfo = useCallback((shift) => {
    if (!shift) return { text: 'No Active Shift', class: 'status-pending' };
    
    if (shift.status === 'completed') return { text: 'Completed', class: 'status-completed' };
    if (shift.status === 'for approval') return { text: 'For Approval', class: 'status-approval' };
    return { text: 'Active', class: 'status-pending' };
  }, []);

  // Render shift data
  const renderShiftData = () => {
    if (!shift || Object.keys(shift).length === 0) {
      return (
        <div className="no-shift">
          <div className="no-shift-icon">
            <i className="fas fa-clock" aria-hidden="true"></i>
          </div>
          <p className="no-shift-text">No active shift</p>
        </div>
      );
    }

    const shiftData = [
      { label: 'Date', value: shift.shift_date ? dateFormatted(shift.shift_date) : '--' },
      { label: 'Time In', value: formatTime(shift.time_in) },
      { label: 'Break In', value: formatTime(shift.break_start) },
      { label: 'Break Out', value: formatTime(shift.break_end) },
      { label: 'Time Out', value: formatTime(shift.time_out) },
    ];

    return (
      <>
        <div className="shift-grid">
          {shiftData.map((item, index) => (
            <div key={index} className="shift-item">
              <div className="shift-label">{item.label}</div>
              <div className={`shift-value ${item.value === '--:--' || item.value === '--' ? 'empty' : ''}`}>
                {item.value}
              </div>
            </div>
          ))}

          {/* OT Start */}
          <div className="shift-item">
            <div className="shift-label">OT Start</div>
            <input
              type="time"
              name="ot_start"
              className="ot-input"
              value={shift.ot_start || ''}
              onChange={props.handleOt}
              aria-label="Overtime start time"
            />
          </div>

          {/* OT End */}
          <div className="shift-item">
            <div className="shift-label">OT End</div>
            <input
              type="time"
              name="ot_end"
              className="ot-input"
              value={shift.ot_end || ''}
              onChange={props.handleOt}
              aria-label="Overtime end time"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="submit-section">
          <button
            className="submit-btn"
            onClick={props.submitMyDtr}
            // disabled={shift.status === 'pending' || shift.status === 'for approval'}
            aria-label="Submit DTR for approval"
          >
            <i className="fas fa-paper-plane" style={{ marginRight: '0.5rem' }} aria-hidden="true"></i>
            Submit DTR
          </button>
        </div>
      </>
    );
  };

  const statusInfo = getStatusInfo(shift);

  return (
    <div className="current-shift-container">
      <div className="shift-header">
        <h2 className="shift-title">
          <i className="fas fa-business-time" aria-hidden="true"></i>
          Current Shift
        </h2>
        <span className={`shift-status ${statusInfo.class}`}>
          {statusInfo.text}
        </span>
      </div>

      {renderShiftData()}
    </div>
  );
};

export default CurrentShift;