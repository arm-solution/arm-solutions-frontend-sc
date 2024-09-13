import React from 'react';
import './TotalAmount.css';

const TotalAmount = ({totalAmountref, totalAmount}) => {
  return (
    <>
        <div className="row total-amount mt-3 mr-auto">
            <p className='label-text'>Sub Total</p>
            <p className="total-amout-text mr-auto">Php <span>{totalAmountref}</span></p>
            <p className='label-text'>Deduction</p>
            <p className="total-amout-text mr-auto">Php <span></span></p>
            <p className='label-text'>Discount</p>
            <p className="total-amout-text mr-auto">Php <span></span></p>
            <p className='label-text'>Grand Total</p>
            <p className="total-amout-text mr-auto">Php <span>{totalAmount || 0.0}</span></p>
        </div>
    </>
  )
}

export default TotalAmount