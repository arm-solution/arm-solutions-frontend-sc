import React, { useState, useEffect, useRef } from 'react';
import './Quotations.css';
import QoutationForm from '../../../components/modals-forms/qoutation-form/QoutationForm';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../../components/DataTable';
import { getAllProposal } from '../../../store/features/proposalSlice';
import { getProposalItemsByProposalId } from '../../../store/features/proposalItemSlice';

const Quotations = () => {

    const [selectedTab, setSelectedTab] = useState('tab-one');
    
    const dispatch = useDispatch();
    
    const { data: proposalData, isSuccess: proposalStatus, loading: loadingProposal } = useSelector(state => state.proposals);
    const { data: proposalItemData, loading: proposalItemLoading} = useSelector(state => state.proposalItems);

    // propsal data for editing
    const [proposalEdit, setProposalEdit] = useState()
    // proposal items getting by id
    const [proposalItemEdit, setProposalItemEdit] = useState(proposalItemData);
    
    const handleTabChange = (event) => {
        setSelectedTab(event.target.id);
    };



    const columns = [
      {header: 'Created by', accessor: 'fullname'},
      {header: 'Estemate', accessor: 'total_estemate'},
      {header: 'Date', accessor: 'date_created'},
      {header: 'Status', accessor: 'status'},
    ]

    useEffect(() => {
      dispatch(getAllProposal());
      // dispatch(resetState());
    }, [dispatch, ]);
    
    useEffect(() => {
      setProposalItemEdit(proposalItemData)
    }, [proposalItemData])
    

    // handle view details and edit
    const handleView = async(row) => {
      setSelectedTab('tab-one')
      setProposalEdit(row);
      await dispatch(getProposalItemsByProposalId(row.id));
    }
  
    const handleDelete = (id) => {
      alert('deleted'+ id);
    }
    
    
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
   

        <div className="tabs flex-tabs">
          <label htmlFor="tab-one" id="tab-one-label" className="tab">Create Qoutations</label>
          <label htmlFor="tab-two" id="tab-two-label" className="tab">Qoutation Lists</label>

          <div id="tab-one-panel" className={`panel ${selectedTab === 'tab-one' ? 'active' : ''}`}>
            
                <QoutationForm 
                proposalStatus={proposalStatus}
                loadingProposal={loadingProposal}
                proposalItemEdit={proposalItemEdit}
                proposalEdit={proposalEdit}
                proposalItemData={proposalItemData}
                /> 

          </div>

          <div id="tab-two-panel" className={`panel ${selectedTab === 'tab-two' ? 'active' : ''}`}>

                <DataTable 
                data={proposalData}
                columns={columns}
                actions={{ handleView, handleDelete }}
                perPage={10}
                showAddButtonAndSearchInput={{ searchInput: true, addButton: false }}
                tableLabel = 'Proposal Lists'
                // targetForm= '#employeeForm'
                />

          </div>
        </div>
      </div>



    </>
  )
}

export default Quotations