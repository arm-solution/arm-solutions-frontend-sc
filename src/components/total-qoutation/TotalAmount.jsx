import React from 'react';
import './TotalAmount.css';

const TotalAmount = ({totalAmountref, totalAmount, taxDiscountTotal}) => {

  function formatNumber(number) {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  }

  return (
    <>
        <div className="row total-amount mt-3 mr-auto">
            <p className='label-text'>Sub Total</p>
            <p className="total-amout-text mr-auto">Php <span>{formatNumber(totalAmountref || 0)}</span></p>
            <p className='label-text'>Tax</p>
            <p className="total-amout-text mr-auto">Php <span>{formatNumber(taxDiscountTotal?.tax || 0)}</span></p>
            <p className='label-text'>Discount</p>
            <p className="total-amout-text mr-auto">Php <span>{formatNumber(taxDiscountTotal?.discount || 0)}</span></p>
            <p className='label-text'>Grand Total</p>
            <p className="total-amout-text mr-auto">Php <span>{formatNumber(totalAmount || 0)}</span></p>
        </div>
    </>
  )
}

export default TotalAmount