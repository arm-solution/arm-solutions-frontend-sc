import React, { useState, useEffect } from 'react';
import './JobOrderForm.css';
import { addNewJobOrder, getAllJobOrderByFilter, updateJobOrder } from '../../../store/features/jobOrder.slice';
import { getProposalByFilter } from '../../../store/features/proposalSlice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProposal } from '../../../store/features/proposalSlice';
import { successDialog, errorDialog } from '../../../customs/global/alertDialog';
import { dateFormatted } from '../../../customs/global/manageDates';


const JobOrderForm = () => {

    const dispatch = useDispatch();
    const { proposalID } = useParams();   

    const { dataByFilter, isSuccess, loading } = useSelector(state => state.proposals);
    const { allJobOrderByFilter, filterJoLoading } = useSelector(state => state.jobOrders);

    const [message, setMessage] = useState('')

    const systemList = [
        "Fire Detection and Alarm System",
        "Fire Sprinkler and Wet Standpipe",
        "Kitchen Hood Fire Suppression System",
        "Fire Pump System",
        "CCTV",
        "GECKO ER-2G",
        "Gas Leak Detector",
        "Other (Specify)"
        ];

    const emptyRow = {
        inspection: false,
        preventive_maintenance: false,
        design_installation: false,
        testing_commissioning: false,
        other_specify: ""
    };

    const defaultJobOrder = {
        id: null,
        proposal_id: null,
        address: "",
        email_address: "",
        contact_person: "",
        position: "",
        reference_number: "",
        date_created: null,
        total_area: null,
        contact_number: "",
        manpower: "",
        summary: "",
        foreman: "",
        signature: "",
        date_signed: null,
        work_duration: "",
        mobilization_date: null,
        turnover_date: null,
        issued_by: null,
        requested_by: null,
        noted_by: null,
        approved_by: null,
        jo_status: null,
        job_order_items: [], // <- filled later with rows
        user: null
    };

    const [proposal, setProposal] = useState({});
    const [jobOrder, setJobOrder] = useState({});

    
    const [jobOrderItemsForm, setJobOrderItemsForm] = useState(
        systemList.map(name => ({ ...emptyRow, system_name: name }))
    );
    
    const jobOrderRows = jobOrder?.job_order_items || [];

    useEffect(() => {
       const getProposal = async () => {
            await dispatch(getProposalByFilter({ id: proposalID, page: 1, limit: 1 }));
            await dispatch(getAllJobOrderByFilter({
               filter: { proposal_id: proposalID },
               page: 1,
               limit: 10
            }))
        }

        getProposal();
    }, [dispatch, proposalID])



    useEffect(() => {
    const getData = () => {
        if (dataByFilter?.proposal) {
        setProposal(dataByFilter?.proposal[0]);
        }

        if (allJobOrderByFilter?.data?.length) {
            setJobOrder(allJobOrderByFilter.data[0]);
        } else {
        // No job order returned, set up blank form inside jobOrder
            setJobOrder({
                ...defaultJobOrder,
                job_order_items: [...jobOrderItemsForm], // optional sync
            });
        }
    };

    getData();
    }, [dataByFilter, isSuccess, dispatch, allJobOrderByFilter]);


    const handleProposalInputChange = (path, value) => {
        setProposal(prev => {
            // Deep clone to break immutability
            const updated = structuredClone(prev);
            const keys = path.split(".");
            let temp = updated;

            for (let i = 0; i < keys.length - 1; i++) {
            if (!temp[keys[i]]) temp[keys[i]] = {};
            temp = temp[keys[i]];
            }

            temp[keys[keys.length - 1]] = value;
            return updated;
        });
    };



    const handleDynamicJobOrderChange = (field, value, index = null) => {
        setJobOrder(prev => {
            const updated = structuredClone(prev);

            if (index !== null && Array.isArray(updated.job_order_items)) {
            if (!updated.job_order_items[index]) return prev;
                updated.job_order_items[index][field] =
                typeof value === 'boolean' ? (value ? 1 : 0) : value;
            } else {
                updated[field] = value;
            }

            return updated;
        });
    };


    const handleUpSertJO = async () => {

        const { user, job_order_items, turnover_date, mobilization_date, date_signed, ...restJO } = jobOrder;

        const finalJO = {
            ...restJO,
            mobilization_date: dateFormatted(mobilization_date) || '',
            turnover_date: dateFormatted(turnover_date) || '',
            date_signed: dateFormatted(date_signed) || '',
            proposal_id: proposalID,
            joborderitems: job_order_items
        };
        const finalProposal = {};

        // console.log("joborder", finalJO)
        // console.log("proposal", proposal)


        if(jobOrder.id) {

            const { payload } = await dispatch(updateJobOrder(finalJO));
            if(payload.success) {
                successDialog("Updated job order is now available")
            } else {
                errorDialog("Cannot update job order")
            }
        } else {
            const { payload } = await dispatch(addNewJobOrder(finalJO));
            if(payload.success) {
                successDialog("New job order is now available")
            } else {
                errorDialog("Cannot add new job order")
            }
        }


    }

    const handleDateSearch = (e) => {
        console.log("event", e.target.value)
        
    }

  return (
    <>
        <div className="container mt-4 job-order-form border p-4 bg-white">
        <h5 className="text-center fw-bold">ARM SOLUTION ENTERPRISES</h5>
        <p className="text-center small mb-4">Today's answer for tomorrow's needs!</p>

        {/* <h1>{ dataByFilter?.proposal[0].description || 'no des'}</h1> */}

        <div className="row mb-3">
            <div className="col-md-6">
                <label>Client Name:</label>
                <input
                    type="text"
                    name='name'
                    className="form-control"
                    value={ proposal ? proposal.client?.name : '' }
                    onChange={(e) => handleProposalInputChange("client.name", e.target.value)}
                />
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
                <input
                    type="text"
                    className="form-control"
                    name='address' value={ proposal ? proposal?.client?.address : '' }
                    onChange={(e) => handleProposalInputChange("client.address", e.target.value)}
                />
            </div>
            <div className="col-md-6 mt-2">
                <label>Total Area:</label>
                <input
                    type="number"
                    className="form-control"
                    name='total_area' value={ jobOrder ? jobOrder?.total_area : '' }
                    onChange={(e) => handleDynamicJobOrderChange('total_area', e.target.value)}
                />
            </div>
            <div className="col-md-6 mt-2">
                <label>Email Address:</label>
                <input
                    type="email"
                    className="form-control"
                    name='email_address' value={ proposal ? proposal?.client?.email : '' }
                    onChange={(e) => handleProposalInputChange("client.email", e.target.value)}
                />
            </div>
            <div className="col-md-6 mt-2">
                <label>Contact Number:</label>
                <input
                    type="text"
                    className="form-control"
                    name='contact_number' value={ jobOrder ? jobOrder?.contact_number : '' }
                    onChange={(e) => handleDynamicJobOrderChange('contact_number', e.target.value)}
                />
            </div>
            <div className="col-md-6 mt-2">
                <label>Contact Person:</label>
                <input 
                    type="text"
                    className="form-control"
                    name='contact_person' value={ jobOrder ? jobOrder?.contact_person : '' }
                    onChange={(e) => handleDynamicJobOrderChange('contact_person', e.target.value)}/>
            </div>
            <div className="col-md-6 mt-2">
                <label>Position:</label>
                <input
                    type="text"
                    className="form-control"
                    name="position"
                    value={jobOrder?.position || ""}
                    onChange={(e) => handleDynamicJobOrderChange('position', e.target.value)}
                />
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
                {jobOrderRows.map((row, rowIdx) =>
                row.system_name === "Other (Specify)" ? (
                    <tr key={row.system_name}>
                    <td colSpan={5}>
                        <strong>{row.system_name}</strong>
                        <textarea
                        className="form-control mt-2"
                        rows={2}
                        placeholder="Please specify..."
                        value={row.other_specify || ""}
                        onChange={(e) =>
                            handleDynamicJobOrderChange("other_specify", e.target.value, rowIdx)
                        }
                        />
                    </td>
                    </tr>
                ) : (
                    <tr key={row.system_name}>
                    <td>{row.system_name}</td>
                    <td>
                        <input
                        type="checkbox"
                        checked={!!row.inspection}
                        onChange={(e) =>
                            handleDynamicJobOrderChange("inspection", e.target.checked, rowIdx)
                        }
                        />
                    </td>
                    <td>
                        <input
                        type="checkbox"
                        checked={!!row.preventive_maintenance}
                        onChange={(e) =>
                            handleDynamicJobOrderChange("preventive_maintenance", e.target.checked, rowIdx)
                        }
                        />
                    </td>
                    <td>
                        <input
                        type="checkbox"
                        checked={!!row.design_installation}
                        onChange={(e) =>
                            handleDynamicJobOrderChange("design_installation", e.target.checked, rowIdx)
                        }
                        />
                    </td>
                    <td>
                        <input
                        type="checkbox"
                        checked={!!row.testing_commissioning}
                        onChange={(e) =>
                            handleDynamicJobOrderChange("testing_commissioning", e.target.checked, rowIdx)
                        }
                        />
                    </td>
                    </tr>
                )
                )}
            </tbody>
        </table>



        <div className="row mt-3">
            <div className="col-md-6">
                <label>List of Manpower:</label>
                <textarea
                    className="form-control"
                    rows="4"
                    name='manpower'
                    value={ jobOrder ? jobOrder?.manpower : '' }
                    onChange={(e) => handleDynamicJobOrderChange('manpower', e.target.value)}
                />
            </div>
            <div className="col-md-6">
                <label>Summary:</label>
                <textarea
                    className="form-control"
                    rows="4"
                    name='summary'
                    value={ jobOrder ? jobOrder?.summary : '' }
                    onChange={(e) => handleDynamicJobOrderChange('summary', e.target.value)}
                />
            </div>
        </div>

        <div className="row mt-3">
            <div className="col-md-6">
                <label>Foreman In-Charge:</label>
                <input
                    type="text"
                    className="form-control"
                    name='foreman'
                    value={ jobOrder ? jobOrder?.foreman : '' }
                    onChange={(e) => handleDynamicJobOrderChange('foreman', e.target.value)} 
                />
            </div>
            <div className="col-md-6">
                <label>Signature / Date:</label>
                <input
                    type="date"
                    className="form-control"
                    value={
                        jobOrder?.date_signed
                        ? new Date(jobOrder.date_signed).toISOString().split('T')[0]
                        : ''
                    }
                    onChange={(e) => handleDynamicJobOrderChange('date_signed', e.target.value)}
                />
            </div>
        </div>

        <h6 className="mt-4">Schedule</h6>
        <div className="row">
            <div className="col-md-4">
                <label>Work Duration:</label>
                <input
                    type="text"
                    className="form-control"
                    name='work_duration'
                    value={ jobOrder ? jobOrder?.work_duration : '' }
                    onChange={(e) => handleDynamicJobOrderChange('work_duration', e.target.value)}
                />
            </div>
            <div className="col-md-4">
                <label>Date of Mobilization:</label>
                <input
                    type="date"
                    className="form-control"
                    name='mobilization_date'
                     value={
                        jobOrder?.mobilization_date
                        ? new Date(jobOrder.mobilization_date).toISOString().split('T')[0]
                        : ''
                    }
                    onChange={(e) => handleDynamicJobOrderChange('mobilization_date', e.target.value)}
                />
            </div>
            <div className="col-md-4">
                <label>Target Date of Turn-over:</label>
                <input
                    type="date"
                    className="form-control"
                    name='turnover_date'
                     value={
                        jobOrder?.turnover_date
                        ? new Date(jobOrder.turnover_date).toISOString().split('T')[0]
                        : ''
                    }
                    onChange={(e) => handleDynamicJobOrderChange('turnover_date', e.target.value)}
                />
            </div>
        </div>

        <h6 className="mt-4">Approvals</h6>
            <div className="row">
            {[
                { label: "Issued by", role: "Marketing Sales Specialist", field: "issued_by" },
                { label: "Requested by", role: "P.E./Supervisor", field: "requested_by" },
                { label: "Noted by", role: "Marketing Manager", field: "noted_by" },
                { label: "Approved by", role: "Operation/General Manager", field: "approved_by" }
            ].map((item, i) => (
                <div className="col-md-6 mt-2" key={i}>
                <label>
                    {item.label} ({item.role}):
                </label>
                <input
                    type="text"
                    className="form-control"
                    value={jobOrder?.[item.field] || ""}
                    onChange={(e) =>
                         handleDynamicJobOrderChange(item.field, e.target.value)
                    }
                />
                </div>
            ))}
            </div>


        <div className="text-end mt-4 small">
            <p className="mb-0">Effectivity Date: March 21, 2025</p>
            <p className="mb-0">Document Code: F-02-8.2.3</p>
            <p className="mb-0">Revision No.: 1</p>
        </div>
            <div className="btn-container">
                 <button className="btn btn-primary btn-save" onClick={handleUpSertJO}>Save</button>
            </div> 
        </div>

        
    </>
  )
}

export default JobOrderForm