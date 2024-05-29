import React, { useEffect, useRef, useState } from 'react';
import { useScreenWidth } from '../customs/global/forMobile' 

const DataTable = (props) => {
    const isWidth768 = useScreenWidth();


    const [currentPage, setCurrentPage] = useState(1);
    
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    
    const fileteredData = props.data.filter( d =>
         d.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(fileteredData.length / parseInt(props.perPage, 10));

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
      };
    
      const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
      };

    const renderTableRows = () => {
        const startIndex = (currentPage - 1) * parseInt(props.perPage, 10);
        const endIndex = startIndex + parseInt(props.perPage, 10);
        return fileteredData.slice(startIndex, endIndex).map((user, index) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
          </tr>
        ));
      };

   


  return (
    <>
     <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className='form-control mb-5 search-input'
      />
    {console.log('per page', props.perPage)}

      <table className="table table-striped tbl-sm">
        <thead className="table-dark">
          <tr>
            {props.thead.map((head, index )=> (<th key={index} >{head}</th>))}
          </tr>
        </thead>
        <tbody>
            { renderTableRows() }
        </tbody>
      </table>
        { fileteredData.length === 0 && (<p className='text-center'><span className="badge bg-secondary">No Data Found</span></p>)}

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

    
    </>
  )
}

export default DataTable