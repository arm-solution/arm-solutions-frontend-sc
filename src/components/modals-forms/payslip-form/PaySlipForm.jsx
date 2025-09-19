import React, {useEffect, useState} from 'react';
import './PaySlipForm.css';
import { getLoggedInUser } from '../../../customs/global/manageLocalStorage';
import { getCurrentDateFormatted } from '../../../customs/global/manageDates';

const PaySlipForm = (props) => {

  const [showDocs, setShowDocs] = useState(false);

  const showOnPdf = () => {
    if(props._getFullEarnings && getLoggedInUser()) {
        sessionStorage.setItem("paySlipSession", JSON.stringify(props._getFullEarnings));
        // sessionStorage.setItem("userLoggedIn", JSON.stringify(getLoggedInUser()));
        if(props._userById.data) {
            sessionStorage.setItem("employeeData", JSON.stringify(props._userById.data));
        }
         // Open the new tab and navigate to the desired path
        window.open(`/pdf-viewer/payslip/id/3`, "_blank");
    }
  }

  useEffect(() => {

    const earnings = props._getFullEarnings;

    // console.log("earnings", earnings.data)

    const isNonEmptyArray = Array.isArray(earnings) && earnings.length > 0;
    const isNonEmptyObject =
      earnings &&
      typeof earnings === "object" &&
      !Array.isArray(earnings) &&
      Object.keys(earnings).length > 0;

      setShowDocs(isNonEmptyArray || isNonEmptyObject);

  }, [props._getFullEarnings, props._userById])



  


  return (
    <>
        <h1 className='mb-5'>PAYSLIP</h1>

            <div className="row mt-3">
            <p>Employee: {props._userById.data ? `${props._userById.data.firstname} ${props._userById.data.lastname}` : '---'}</p> 
            <p>Employee Number: {props._userById.data ? props._userById.data.employee_id : '---'}</p>
            <p>Date: { getCurrentDateFormatted() }</p>
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
                    <td>Php {props._getFullEarnings.data.gross_pay || '---'}</td>
                </tr>
                <tr>
                    <td>Additional</td>
                    <td>Php {props._getFullEarnings.data.total_additional_pay || '---'}</td>
                </tr>
                <tr>
                    <td>Deduction</td>
                    <td>Php {props._getFullEarnings.data.total_deduction || '---'}</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>Php {props._getFullEarnings.data.final_pay || '---'}</td>
                </tr>

                <tr className="total-row">
                    <td><strong>Additional</strong></td>
                    <td><strong></strong></td>
                </tr>
                {Array.isArray(props._getFullEarnings?.data.additional) && props._getFullEarnings.data.additional.length > 0 ? props._getFullEarnings.data.additional.map(d => (
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
                {Array.isArray(props._getFullEarnings?.data.deduction) && props._getFullEarnings.data.deduction.length > 0 ? props._getFullEarnings.data.deduction.map(d => (
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
            { showDocs && (
                <button className="btn btn-danger btn-payslip" onClick={showOnPdf}>Document</button>
            )}
            </div>
                
    </>
  )
}

export default PaySlipForm