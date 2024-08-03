import React from 'react';
import './PaySlipForm.css';

const PaySlipForm = () => {
  return (
    <>
        <h1 className='mb-5'>PAYSLIP</h1>

            <div className="row mt-3">
            <p>Employee: Lance jared Cabiscuelas</p> 
            <p>Employee Number: S20183527</p>
            <p>Date: July 24, 2024</p>
            </div>

            <div className="custom-line"></div>

            <div className="row">
            
            <table className="payslip-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Amount (USD)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Basic Salary</td>
                    <td>$2,500.00</td>
                </tr>
                <tr>
                    <td>Housing Allowance</td>
                    <td>$500.00</td>
                </tr>
                <tr>
                    <td>Transport Allowance</td>
                    <td>$200.00</td>
                </tr>
                <tr>
                    <td>Health Insurance</td>
                    <td>$150.00</td>
                </tr>
                <tr>
                    <td>Other Benefits</td>
                    <td>$150.00</td>
                </tr>
                <tr className="total-row">
                    <td><strong>Total Earnings</strong></td>
                    <td><strong>$3,500.00</strong></td>
                </tr>
                <tr>
                    <td>Tax Deductions</td>
                    <td>$350.00</td>
                </tr>
                <tr>
                    <td>Social Security Contribution</td>
                    <td>$175.00</td>
                </tr>
                <tr>
                    <td>Health Insurance Contribution</td>
                    <td>$100.00</td>
                </tr>
                <tr>
                    <td>Other Deductions</td>
                    <td>$25.00</td>
                </tr>
                <tr className="net-salary-row">
                    <td><strong>Net Salary</strong></td>
                    <td><strong>$2,850.00</strong></td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2" className="note">
                        <strong>Note:</strong> Please contact HR for any discrepancies in your payslip.
                    </td>
                </tr>
            </tfoot>
            </table>


            </div>

            <div className="row">
            <button className="btn btn-danger btn-payslip">Print</button>
            </div>
                
    </>
  )
}

export default PaySlipForm