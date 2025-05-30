import React from 'react';
import './PaySlipForm.css';
import { getLoggedInUser } from '../../../customs/global/manageLocalStorage';
import { capitalizeFirstLetter } from '../../../customs/global/manageObjects';

const PaySlipForm = (props) => {


  const showOnPdf = () => {
    if(props._getFullEarnings && getLoggedInUser()) {
        sessionStorage.setItem("paySlipSession", JSON.stringify(props._getFullEarnings));
        sessionStorage.setItem("userLoggedIn", JSON.stringify(getLoggedInUser()));
         // Open the new tab and navigate to the desired path
         window.open(`/pdf-viewer/payslip/id/3`, "_blank");
    }
  }


  return (
    <>
        <h1 className='mb-5'>PAYSLIP</h1>

            <div className="row mt-3">
            <p>Employee: {getLoggedInUser() ? `${capitalizeFirstLetter(getLoggedInUser().firstname)} ${capitalizeFirstLetter(getLoggedInUser().lastname)}` : '---'}</p> 
            <p>Employee Number: {getLoggedInUser() ? getLoggedInUser().employee_id : '---'}</p>
            <p>Date: July 24, 2024</p>
            </div>

            <div className="custom-line"></div>

            <div className="row">

            
        {/* { props._getFullEarnings.map(item => (

        ))}     */}
        <table className="payslip-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Amount (Php)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Gross Pay</td>
                    <td>Php {props._getFullEarnings.gross_pay || '---'}</td>
                </tr>
                <tr>
                    <td>Additional</td>
                    <td>Php {props._getFullEarnings.total_additional_pay || '---'}</td>
                </tr>
                <tr>
                    <td>Deduction</td>
                    <td>Php {props._getFullEarnings.total_deduction || '---'}</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>Php {props._getFullEarnings.final_pay || '---'}</td>
                </tr>

                <tr className="total-row">
                    <td><strong>Additional</strong></td>
                    <td><strong></strong></td>
                </tr>
                {Array.isArray(props._getFullEarnings?.additional) && props._getFullEarnings.additional.length > 0 ? props._getFullEarnings.additional.map(d => (
                    <tr>
                        <td>{d.title || '---'}</td>
                        <td>Php {d.amount || '---'}</td>
                    </tr>
                )):(
                    <tr>
                        <td className='text-center'>No Data Available</td>
                        <td>---</td>
                    </tr>
                )}
     
                <tr className="net-salary-row">
                    <td><strong>Deduction</strong></td>
                    <td><strong></strong></td>
                </tr>
                {Array.isArray(props._getFullEarnings?.deduction) && props._getFullEarnings.deduction.length > 0 ? props._getFullEarnings.deduction.map(d => (
                    <tr>
                        <td>{d.title || '---'}</td>
                        <td>Php {d.amount || '---'}</td>
                    </tr>
                )) : (
                    <tr>
                        <td className='text-center'>No Data Available</td>
                        <td>---</td>
                    </tr>
                )}


            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="2" className="note">
                        <strong>Note:</strong> Please contact HR for any discrepancies in your payslip.
                    </td>
                </tr>
            </tfoot>
        </table>


            </div>

            <div className="row">
                <button className="btn btn-danger btn-payslip" onClick={showOnPdf}>Document</button>
            </div>
                
    </>
  )
}

export default PaySlipForm