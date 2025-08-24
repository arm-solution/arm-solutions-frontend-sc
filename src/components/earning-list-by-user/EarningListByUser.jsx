import React, { useState, useEffect, useRef } from 'react'
import DataTable from '../DataTable'
import { useParams } from 'react-router-dom';
import { formatDateReadable } from '../../customs/global/manageDates'
import FullEarningModal from '../modals-forms/full-earnings-details-modal/FullEarningModal'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import { getFullEarnings, resetFullEarnings } from '../../store/features/earningSlice';
import { useDispatch, useSelector } from 'react-redux';

const EarningListByUser = (props) => {
  
  const dispatch = useDispatch()  
  const modalRef = useRef(null);

  const { userId } = useParams();

  const { _getFullEarnings } = useSelector(state => state.earnings);

  const [myEarnings, setMyEarnings] = useState([])
  const columns = [
    { header: 'Date', accessor: 'date_from' },
  ];
  const [selectedEarnings, setSelectedEarnings] = useState({});

  useEffect(() => {
    if (props._getEarningsByUserId.length > 0) {
      const formattedEarnings = props._getEarningsByUserId.map(item => ({
        ...item,
        date_from: `Payslip Generated : ${formatDateReadable(item.date_from)}`
      }));
  
      setMyEarnings(formattedEarnings);
    }
  }, [props._getEarningsByUserId]);

  
 
    // HANDLE FOR OPEN MODAL
    const handleView = async (emp) => {
        const modalElement = modalRef.current;
        const modal = new Modal(modalElement);

        if(emp) {
            await dispatch(getFullEarnings(emp.id));
        }

        modal.show();
    };


  return (
    <>
        <DataTable
          data={Array.isArray(myEarnings) ? myEarnings : []}
          columns={columns}
          actions={{ handleView }}
          perPage={10}
          showAddButtonAndSearchInput={{ searchInput: false, addButton: false }}
          deleteAccess={false}
          headerColor='table-danger'
          tableLabel='PaySlip List'
        />
        
        {_getFullEarnings && (
            <FullEarningModal  earningModalsRef={modalRef} _getFullEarnings={_getFullEarnings}/>
        )}

    </>
  )
}

export default EarningListByUser