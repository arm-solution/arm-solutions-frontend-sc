import React, { useState } from 'react';
import { useScreenWidth } from '../customs/global/forMobile';
import './../customs/css/Table.css';

const DataTable = (props) => {
    // for mobile condition
    const isWidth768 = useScreenWidth();
 

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const getIndex = () => {
      const startIndex = (currentPage - 1) * parseInt(props.perPage, 10);
      const endIndex = startIndex + parseInt(props.perPage, 10);

      return { start: startIndex, end: endIndex };
      
    }
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    
    const fileteredData = props.data.filter( d =>
      props.columns.some((column) =>
        d[column.accessor].toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    const totalPages = Math.ceil(fileteredData.length / parseInt(props.perPage, 10));

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
      };
    
      const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
      };


  return (
    <>

    <div className="row">
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

          <button type="button" className="add-employee-btn mb-3" data-bs-toggle="modal" data-bs-target={props.targetForm}>
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
        <thead className="table-dark">
          <tr>
            { props.columns.map((head, index ) => (<th key={index} >{head.header}</th>)) }
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

            {/* { props.renderTableRows(fileteredData, getIndex().start, getIndex().end) } */}
            { fileteredData.slice(getIndex().start, getIndex().end).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {props.columns.map((column, colIndex) => (
                  <td key={colIndex}>{row[column.accessor]}</td>
                ))}
                <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button className="btn btn-info btn-sm text-white" onClick={() => props.actions.handleViewEmployee(row.id)}>Details</button>
                  <button className="btn btn-danger btn-sm" onClick={() =>  props.actions.handleDeleteEmployee(row.id)}>Delete</button>
                </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
        { fileteredData.length === 0 && (<p className='text-center'><span className="badge bg-secondary">No Data Found</span></p>)}

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