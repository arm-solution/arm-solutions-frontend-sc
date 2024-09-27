import React, { useState } from 'react';
import './../customs/css/Table.css';

const DataTable = (props) => {
 
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const getIndex = () => {
      const startIndex = (currentPage - 1) * parseInt(props.perPage, 10);
      const endIndex = startIndex + parseInt(props.perPage, 10);

      return { start: startIndex, end: endIndex };
      
    }
    
    const handleSearchChange = (e) => {
      // console.log(props.data);
        setSearchTerm(e.target.value);
    };

  // if need to combine on one column
   const combinedData = props.data.map(d => ({
      ...d,
      fullname: d.firstname && d.lastname ? `${d.firstname} ${d.lastname}` : undefined
    }));
    
    const filteredData = combinedData.filter(d =>
      props.columns.some(column =>
        (d[column.accessor] && d[column.accessor].toString().toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );

    const totalPages = Math.ceil(filteredData.length / parseInt(props.perPage, 10));

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };
    
    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };


  return (
    <>
    <div className="row searc-container">
      <div className="col col-md-6">
      { props.showAddButtonAndSearchInput.searchInput ? (
        
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className='form-control mb-5 search-input'
        />

      ) : (
        <input type="date" className="form-control mb-5 search-date" />
      ) }

      </div>
      <div className="col col-md-6 text-end">
        {props.showAddButtonAndSearchInput.addButton && ( 
          // <button className="add-employee-btn mb-3">Add Data</button>

          <button type="button" className="add-employee-btn mb-3" onClick={props.addData}>
            Add
          </button>
        )}
      </div>
    </div>
    
 

    <div className="card" >
      <div className="card-header">
        <b>{ props.tableLabel ? props.tableLabel : 'Records'}</b>
      </div>
      <div className="card-body">


      <table className="table table-striped tbl-sm">
        <thead className={props.headerColor ?  props.headerColor : 'table-success'}>
          <tr>
            { props.columns.map((head, index ) => (<th key={index} >{head.header}</th>)) }
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

            { filteredData.slice(getIndex().start, getIndex().end).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {props.columns.map((column, colIndex) => (
                  <td key={colIndex}>{row[column.accessor]}</td>
                ))}
                <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button className="btn btn-info btn-sm text-white" onClick={() => props.actions.handleView(row)}>Details</button>
                  <button className="btn btn-danger btn-sm" onClick={() =>  props.actions.handleDelete(row.id)}>Delete</button>
                </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
        { filteredData.length === 0 && (<p className='text-center'><span className="badge bg-secondary">No Data Found</span></p>)}

      <div className="row">

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      </div>

      </div>
    </div>
    
    </>
  )
}

export default DataTable