import React, { useState, useEffect } from 'react';
import './DtrLogs.css'
import { useSelector, useDispatch } from 'react-redux'
import DataTable from '../DataTable';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading-spinner/Loading';

const DtrRequest = () => {

 const columns = [
    { header: 'DATE', accessor: 'shift_date' },
    { header: 'TIME IN', accessor: 'time_in' },
    { header: 'TIME OUT', accessor: 'time_out' },
    { header: 'REMARKS', accessor: 'remarks' }
  ];
const [selectedTab, setSelectedTab] = useState('tab-one');
const handleTabChange = (event) => {
    setSelectedTab(event.target.id);
};

  return (
    <>

        <div className="worko-tabs">

            <input
                className="state"
                type="radio"
                title="tab-one"
                name="tabs-state"
                id="tab-one"
                checked={selectedTab === 'tab-one'}
                onChange={handleTabChange}
            />
            <input
                className="state"
                type="radio"
                title="tab-two"
                name="tabs-state"
                id="tab-two"
                checked={selectedTab === 'tab-two'}
                onChange={handleTabChange}
            />
            <input
                className="state"
                type="radio"
                title="tab-three"
                name="tabs-state"
                id="tab-three"
                checked={selectedTab === 'tab-three'}
                onChange={handleTabChange}
            />

            <div className="tabs flex-tabs">
                <label htmlFor="tab-one" id="tab-one-label" className="tab">Pending</label>
                <label htmlFor="tab-two" id="tab-two-label" className="tab">Approved</label>
                <label htmlFor="tab-three" id="tab-three-label" className="tab">Rejected</label>

                <div id="tab-one-panel" className={`panel ${selectedTab === 'tab-one' ? 'active' : ''}`}>
                    <div className="mt-5">

                        {(
                            <DataTable
                            //   data={Array.isArray(getPendingUserDtr) ? getPendingUserDtr : []} // Ensure data is an array
                            data={[]} // Ensure data is an array
                            columns={columns}
                            actions={{}}
                            perPage={10}
                            showAddButtonAndSearchInput={{ searchInput: false, addButton: false }}
                            deleteAccess={false}
                            tableLabel='DTR LOGS'
                            />
                        )}
                    </div>
                </div>

                <div id="tab-two-panel" className={`panel ${selectedTab === 'tab-two' ? 'active' : ''}`}>
                    2
                </div>

                <div id="tab-three-panel" className={`panel ${selectedTab === 'tab-three' ? 'active' : ''}`}>
                    3
                </div>
                
            </div>
        </div>
    </>
  )
}

export default DtrRequest