import React, { useState, useEffect } from 'react';
import './Quotations.css';
import QuotationForm from '../../../components/modals-forms/quotation-form/QuotationForm';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../../components/DataTable';
import { getAllProposal } from '../../../store/features/proposalSlice';
import { getProposalItemsByProposalId } from '../../../store/features/proposalItemSlice';
import { formatDateTime } from '../../../customs/global/manageDates';
import { getDiscountAndTaxByproposalId } from '../../../store/features/taxDiscountSlice';

const Quotations = () => {

    const [selectedTab, setSelectedTab] = useState('tab-one');
    
    const dispatch = useDispatch();
    
    const { data: proposalData, isSuccess: proposalStatus, loading: loadingProposal } = useSelector(state => state.proposals);
    const { data: proposalItemData, isSuccess: proposalItemSuccess, loading: proposalItemLoading} = useSelector(state => state.proposalItems);
    const { data: taxDiscountData } = useSelector(state => state.taxDiscounts);
    // propsal data for editing
    const [proposalEdit, setProposalEdit] = useState()
    
    const handleTabChange = (event) => {
        setSelectedTab(event.target.id);
    };

    const clientDataWithFormattedDate = proposalData.map(d => ({
      ...d,
      date_created: formatDateTime(d.date_created)
    }))

    const columns = [
      {header: 'Created by', accessor: 'fullname'},
      {header: 'Estemate', accessor: 'sub_total'},
      {header: 'Date', accessor: 'date_created'},
      {header: 'Status', accessor: 'status'},
    ]

    useEffect(() => {
      dispatch(getAllProposal());
    }, [dispatch]);
    

    // handle view details and edit on table proposal
    const handleView = async(row) => {
      try {
        setSelectedTab('tab-one')
        setProposalEdit(row);
        await dispatch(getDiscountAndTaxByproposalId(row.id));
        await dispatch(getProposalItemsByProposalId(row.id));
        
      } catch (error) {
        console.log("Error: ", error)
      }
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
            
              <QuotationForm 
                proposalStatus={proposalStatus}
                loadingProposal={loadingProposal}
                proposalEdit={proposalEdit}
                proposalItemData={proposalItemData}
                proposalItemLoading={proposalItemLoading}
                proposalItemSuccess={proposalItemSuccess}
                taxDiscountData={taxDiscountData}
              /> 

          </div>

          <div id="tab-two-panel" className={`panel ${selectedTab === 'tab-two' ? 'active' : ''}`}>

                <DataTable 
                  data={clientDataWithFormattedDate}
                  columns={columns}
                  actions={{ handleView, handleDelete }}
                  perPage={10}
                  showAddButtonAndSearchInput={{ searchInput: true, addButton: false }}
                  tableLabel = 'Proposal Lists'
                />

          </div>
        </div>
      </div>



    </>
  )
}

export default Quotations