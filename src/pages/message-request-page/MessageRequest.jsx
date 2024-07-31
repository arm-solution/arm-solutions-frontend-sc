import React from 'react';
import './MessageRequest.css';
import DataTable from '../../components/DataTable';

const MessageRequest = () => {


    const columns = [
        { header: 'Email', accessor: 'email' },
        { header: 'Date', accessor: 'date_sent' },
      ];


    const handleView = (id) => {}

    const handleDelete = (id) => {}

    const resetModalFormAdd = () => {}
    

  return (
    <>
    <div className="table-message">
        <DataTable
          data={[]}
          columns={columns}
          actions={{ handleView, handleDelete }}
          perPage={10}
          showAddButtonAndSearchInput={{ searchInput: true, addButton: false }}
          tableLabel='Message request list'
          addData={resetModalFormAdd}
          headerColor='table-primary'
        />
    </div>
    </>
  )
}

export default MessageRequest