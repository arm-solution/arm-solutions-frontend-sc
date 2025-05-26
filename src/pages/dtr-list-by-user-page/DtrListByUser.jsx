import React, { useState, useEffect } from 'react';
import './DtrListByUser.css';
import DtrByUserTable from '../../components/dtr-by-user-table/DtrByUserTable';
import PaySlipInputForm from '../../components/modals-forms/payslip-input-form/PaySlipInputForm'

const DtrListByUser = () => {

  const [listDtr, setListDtr] = useState([]);
  const [showForm, setShowForm] = useState(false)


  useEffect(() => {
    
    const getDtrList = async() => {

      if(showForm && listDtr > 0) {
        //call the api here
      }

    }

    getDtrList();

  }, [listDtr, showForm])
  


  return (
    <>
        <DtrByUserTable setShowForm={setShowForm} setListDtr={setListDtr} />

        <hr></hr>

        {showForm && listDtr.length > 0 && <PaySlipInputForm /> }
        

    </>
  )
}

export default DtrListByUser