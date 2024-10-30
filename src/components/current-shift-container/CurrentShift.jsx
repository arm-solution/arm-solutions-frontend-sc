import React, { useEffect, useState } from 'react'
import './CurrentShift.css';

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
           <div className='currentShift'>
              <div className="dateShift">
                <p style={{ fontWeight: "bolder"}}>Date</p>
                <p>{ shift?.shift_date }</p>
              </div>
              <div className="timeinout">
                <p style={{ fontWeight: "bolder"}}>Time in</p>
                <p>{ shift?.time_in }</p>
              </div>
              <div className="break">
                <p style={{ fontWeight: "bolder"}}>Break In</p>
                <p>{ shift?.break_start ? shift?.break_start : '---'}</p>
              </div>
              <div className="break">
                <p style={{ fontWeight: "bolder"}}>Break out</p>
                <p>{ shift?.break_end ? shift?.break_end : '---'}</p>
              </div>
              <div className="timeinout">
                <p style={{ fontWeight: "bolder"}}>Status</p>
                <p>{ shift?.status }</p>
              </div>      
           </div>
        </div>
    </>
  )
}

export default CurrentShift