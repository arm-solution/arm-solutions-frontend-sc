import React, { useEffect, useState } from "react";
import "./PaySlipForm.css";
import { getLoggedInUser } from "../../../customs/global/manageLocalStorage";
import { getCurrentDateFormatted } from "../../../customs/global/manageDates";

const PaySlipForm = (props) => {
  const [showDocs, setShowDocs] = useState(false);

  const showOnPdf = () => {
    if (!props._getFullEarnings || !getLoggedInUser()) return;

    sessionStorage.setItem("paySlipSession", JSON.stringify(props._getFullEarnings));
    if (props._userById?.data) {
      sessionStorage.setItem("employeeData", JSON.stringify(props._userById.data));
    }
    window.open(`/pdf-viewer/payslip/id/3`, "_blank");
  };

  useEffect(() => {
    const earnings = props._getFullEarnings;
    const hasArray = Array.isArray(earnings) && earnings.length > 0;
    const hasObject =
      earnings &&
      typeof earnings === "object" &&
      !Array.isArray(earnings) &&
      Object.keys(earnings).length > 0;

    setShowDocs(hasArray || hasObject);
  }, [props._getFullEarnings, props._userById]);

  const formatAmount = (val) => (val ? `Php ${val}` : "Php ---");

  const renderList = (list) => {
    if (!Array.isArray(list) || list.length === 0) {
      return (
        <tr>
          <td className="text-center">No Data Available</td>
          <td>---</td>
        </tr>
      );
    }

    return list.map((d, i) => (
      <tr key={i}>
        <td>{d?.title ?? "---"}</td>
        <td>{formatAmount(d?.amount)}</td>
      </tr>
    ));
  };

  return (
    <>
      <h1 className="mb-5">PAYSLIP</h1>

      <div className="row mt-3">
        <p>
          Employee:{" "}
          {props._userById?.data
            ? `${props._userById.data.firstname} ${props._userById.data.lastname}`
            : "---"}
        </p>
        <p>Employee Number: {props._userById?.data?.employee_id ?? "---"}</p>
        <p>Date: {getCurrentDateFormatted()}</p>
      </div>

      <div className="custom-line"></div>

      <div className="row">
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
              <td>{formatAmount(props._getFullEarnings?.data?.gross_pay)}</td>
            </tr>
            <tr>
              <td>Additional</td>
              <td>{formatAmount(props._getFullEarnings?.data?.total_additional_pay)}</td>
            </tr>
            <tr>
              <td>Deduction</td>
              <td>{formatAmount(props._getFullEarnings?.data?.total_deduction)}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{formatAmount(props._getFullEarnings?.data?.final_pay)}</td>
            </tr>

            <tr className="total-row">
              <td>
                <strong>Additional</strong>
              </td>
              <td></td>
            </tr>
            {renderList(props._getFullEarnings?.data?.additional)}

            <tr className="net-salary-row">
              <td>
                <strong>Deduction</strong>
              </td>
              <td></td>
            </tr>
            {renderList(props._getFullEarnings?.data?.deduction)}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2" className="note">
                <strong>Note:</strong> Please contact HR for any discrepancies in
                your payslip.
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="row">
        {showDocs && (
          <button className="btn btn-danger btn-payslip" onClick={showOnPdf}>
            Document
          </button>
        )}
      </div>
    </>
  );
};

export default PaySlipForm;
