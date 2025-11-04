import { useState } from 'react';
import './OvertimeRecords.css';
import OvertimeTableStatus from '../../../components/table-overtime-status/OvertimeTableStatus';
import { useParams } from 'react-router-dom';
import { isDepartmentAllowed } from '../../../customs/global/manageLocalStorage';

const OvertimeRecords = () => {
  const [activeTab, setActiveTab] = useState('for-approval');
  const { userId } = useParams();

  // Define allowed departments for each tab
  const departmentAccess = {
    'for-approval': [1, 2], // Admin + HR
    'engineering-review': [6], // Engineering Dept
    'rejected': [], // everyone can view
    'approved': [], // everyone can view
  };

  return (
    <div className="overtime-container">
      <div className="card shadow-sm overtime-card">
        <div className="card-header bg-primary text-white d-flex align-items-center overtime-header">
          <h5 className="mb-0">Overtime Request Records</h5>
        </div>

        <div className="card-body p-0">
          {/* 🔘 Modern Tabs */}
          <div className="overtime-tabs-wrapper">
            <ul className="nav nav-tabs overtime-tabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === 'for-approval' ? 'active' : ''}`}
                  onClick={() => setActiveTab('for-approval')}
                >
                  <i className="bi bi-hourglass-split me-2"></i> For Approval
                </button>
              </li>

              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === 'engineering-review' ? 'active' : ''}`}
                  onClick={() => setActiveTab('engineering-review')}
                >
                  <i className="bi bi-gear-wide-connected me-2"></i> For Engineering Review
                </button>
              </li>

              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === 'rejected' ? 'active' : ''}`}
                  onClick={() => setActiveTab('rejected')}
                >
                  <i className="bi bi-x-circle me-2"></i> Rejected
                </button>
              </li>

              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === 'approved' ? 'active' : ''}`}
                  onClick={() => setActiveTab('approved')}
                >
                  <i className="bi bi-check-circle me-2"></i> Approved
                </button>
              </li>
            </ul>
          </div>

          {/* 🧾 Reusable Table Component */}
          <div className="tab-content p-3">
            {activeTab === 'for-approval' && (
              <OvertimeTableStatus
                status="for approval"
                userId={userId}
                canApprove={isDepartmentAllowed(departmentAccess['for-approval'])}
              />
            )}

            {activeTab === 'engineering-review' && (
              <OvertimeTableStatus
                status="for engineering review"
                userId={userId}
                canApprove={isDepartmentAllowed(departmentAccess['engineering-review'])}
              />
            )}

            {activeTab === 'rejected' && (
              <OvertimeTableStatus
                status="rejected"
                userId={userId}
                canApprove={false}
              />
            )}

            {activeTab === 'approved' && (
              <OvertimeTableStatus
                status="approved"
                userId={userId}
                canApprove={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OvertimeRecords;
