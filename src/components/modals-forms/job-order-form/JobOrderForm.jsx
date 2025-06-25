import React from 'react';
import './JobOrderForm.css';

const JobOrderForm = () => {
  return (
    <>

        <div className="container mt-4 job-order-form border p-4 bg-white">
        <h5 className="text-center fw-bold">ARM SOLUTION ENTERPRISES</h5>
        <p className="text-center small mb-4">Today's answer for tomorrow's needs!</p>

        <div className="row mb-3">
            <div className="col-md-6">
            <label>Client Name:</label>
            <input type="text" className="form-control" />
            </div>
            <div className="col-md-6">
            <label>Reference No.:</label>
            <input type="text" className="form-control" defaultValue="0031" readOnly />
            </div>
            <div className="col-md-6 mt-2">
            <label>Name of Establishment:</label>
            <input type="text" className="form-control" />
            </div>
            <div className="col-md-6 mt-2">
            <label>Date:</label>
            <input type="date" className="form-control" />
            </div>
            <div className="col-md-6 mt-2">
            <label>Address:</label>
            <input type="text" className="form-control" />
            </div>
            <div className="col-md-6 mt-2">
            <label>Total Area:</label>
            <input type="text" className="form-control" />
            </div>
            <div className="col-md-6 mt-2">
            <label>Email Address:</label>
            <input type="email" className="form-control" />
            </div>
            <div className="col-md-6 mt-2">
            <label>Contact Number:</label>
            <input type="text" className="form-control" />
            </div>
            <div className="col-md-6 mt-2">
            <label>Contact Person:</label>
            <input type="text" className="form-control" />
            </div>
            <div className="col-md-6 mt-2">
            <label>Position:</label>
            <input type="text" className="form-control" />
            </div>
        </div>

        <h6 className="mt-4">Type of System</h6>
        <table className="table table-bordered small">
            <thead>
            <tr>
                <th>System</th>
                <th>Inspection</th>
                <th>Preventive Maintenance</th>
                <th>Design/Supply/Installation</th>
                <th>Testing & Commissioning</th>
            </tr>
            </thead>
            <tbody>
            {[
                "Fire Detection and Alarm System",
                "Fire Sprinkler and Wet Standpipe",
                "Kitchen Hood Fire Suppression System",
                "Fire Pump System",
                "CCTV",
                "GECKO ER-2G",
                "Gas Leak Detector",
                "Other (Specify)"
            ].map((system, index) => (
                <tr key={index}>
                <td>{system}</td>
                {[...Array(4)].map((_, i) => (
                    <td key={i}><input type="checkbox" /></td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>

        <div className="row mt-3">
            <div className="col-md-6">
            <label>List of Manpower:</label>
            <textarea className="form-control" rows="4" />
            </div>
            <div className="col-md-6">
            <label>Summary:</label>
            <textarea className="form-control" rows="4" />
            </div>
        </div>

        <div className="row mt-3">
            <div className="col-md-6">
            <label>Foreman In-Charge:</label>
            <input type="text" className="form-control" />
            </div>
            <div className="col-md-6">
            <label>Signature / Date:</label>
            <input type="text" className="form-control" />
            </div>
        </div>

        <h6 className="mt-4">Schedule</h6>
        <div className="row">
            <div className="col-md-4">
            <label>Work Duration:</label>
            <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
            <label>Date of Mobilization:</label>
            <input type="date" className="form-control" />
            </div>
            <div className="col-md-4">
            <label>Target Date of Turn-over:</label>
            <input type="date" className="form-control" />
            </div>
        </div>

        <h6 className="mt-4">Approvals</h6>
        <div className="row">
            {[
            { label: "Issued by", role: "Marketing Sales Specialist" },
            { label: "Requested by", role: "P.E./Supervisor" },
            { label: "Noted by", role: "Marketing Manager" },
            { label: "Approved by", role: "Operation/General Manager" }
            ].map((item, i) => (
            <div className="col-md-6 mt-2" key={i}>
                <label>{item.label} ({item.role}):</label>
                <input type="text" className="form-control" />
            </div>
            ))}
        </div>

        <div className="text-end mt-4 small">
            <p className="mb-0">Effectivity Date: March 21, 2025</p>
            <p className="mb-0">Document Code: F-02-8.2.3</p>
            <p className="mb-0">Revision No.: 1</p>
        </div>
        </div>
        
    </>
  )
}

export default JobOrderForm