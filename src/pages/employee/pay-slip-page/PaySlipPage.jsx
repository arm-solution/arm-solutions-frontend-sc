import React from 'react';
import PaySlipForm from '../../../components/modals-forms/payslip-form/PaySlipForm';
import DataTable from '../../../components/DataTable';
import './PaySlip.css'

const PaySlipPage = () => {

  const columns = [
    { header: 'Date', accessor: 'fullname' },
    // { header: 'Department', accessor: 'department' }
  ];


  const handleView = (id) => {
    
  }

  const handleDelete = (id) => {

  }

  return (
    <>
    <div className="card-container">
    <div className="card">
      <div className="card-body">

       <div className="row">
        <div className="col col-md-6">
            <PaySlipForm />
        </div>


        <div className="col col-md-6">
          <h1 className='mb-5'>PAYSLIP HISTORY</h1>


          <DataTable 
          data={[]} // Ensure data is an array
          columns={columns}
          actions={{ handleView, handleDelete }}
          perPage={10}
          showAddButtonAndSearchInput={{ searchInput: false, addButton: false }}
          tableLabel=''
          // addData={resetModalFormAdd}

        />


        </div>
       </div>


      </div>
    </div>
    </div>
    
    </>
  )
}

export default PaySlipPage