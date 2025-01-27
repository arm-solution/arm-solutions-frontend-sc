import React, { useEffect, useState, useRef } from 'react'
import './CurrentShift.css';
import { dateFormatted } from '../../customs/global/manageDates';

const CurrentShift = (props) => {

  const { shift, setShift } = props.shiftState

  useEffect(() => {
    const shiftDetails = sessionStorage.getItem('currentShift');
    if (shiftDetails) {
      setShift(JSON.parse(shiftDetails));
    }
  
    const handleShiftUpdate = () => {
      const updatedShiftDetails = sessionStorage.getItem('currentShift');
      if (updatedShiftDetails) {
        setShift(JSON.parse(updatedShiftDetails));
      }
    };
  
    window.addEventListener('currentShift', handleShiftUpdate);
  
    return () => {
      window.removeEventListener('currentShift', handleShiftUpdate);
    };
  }, [setShift]);

  return (
    <>
    
      <div className="alert alert-success" role="alert">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Time in</th>
                <th scope="col">Break In</th>
                <th scope="col">Break Out</th>
                <th scope="col">Time Out</th>
                <th scope="col">OT Start</th>
                <th scope="col">OT End</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{shift?.shift_date ? dateFormatted(shift?.shift_date) : '--:--'}</td>
                <td>{shift?.time_in}</td>
                <td>{shift?.break_start ? shift?.break_start : '--:--'}</td>
                <td>{shift?.break_end ? shift?.break_end : '--:--'}</td>
                <td>{shift?.time_out ? shift?.time_out : '--:--'}</td>
                <td>
                  <input type="time" name='ot_start' className='form-control ot' value={shift?.ot_start || ''} onChange={(e) => props.handleOt(e)} />
                </td>
                <td>
                  <input type="time" name='ot_end' className='form-control ot' value={shift?.ot_end || ''} onChange={(e) => props.handleOt(e)}/>
                </td>
                <td>
                  <button className="btn btn-success btn-sm" onClick={(e) => props.submitMyDtr(e)}>Submit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
  
}

export default CurrentShift