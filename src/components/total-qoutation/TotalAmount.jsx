import React from 'react';
import './TotalAmount.css';

const TotalAmount = ({totalAmountref, totalAmount, taxDiscountTotal}) => {
  return (
    <>
        <div className="row total-amount mt-3 mr-auto">
            <p className='label-text'>Sub Total</p>
            <p className="total-amout-text mr-auto">Php <span>{totalAmountref || 0}</span></p>
            <p className='label-text'>Deduction</p>
            <p className="total-amout-text mr-auto">Php <span>{taxDiscountTotal?.additional}</span></p>
            <p className='label-text'>Additional</p>
            <p className="total-amout-text mr-auto">Php <span>{taxDiscountTotal?.discount}</span></p>
            <p className='label-text'>Grand Total</p>
            <p className="total-amout-text mr-auto">Php <span>{totalAmount || 0.0}</span></p>
        </div>
    </>
  )
}

export default TotalAmount