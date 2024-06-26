import React, { useState } from 'react';
import './CardProduct.css';
import ImageGdrive from '../handle-image-gdrive/ImageGdrive';
import brokenImage from './../../assets/images/brokenImage.png';

const Card = (props) => {


  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');


  const getIndex = () => {
    const startIndex = (currentPage - 1) * parseInt(props.perPage, 10);
    const endIndex = startIndex + parseInt(props.perPage, 10);

    return { start: startIndex, end: endIndex };
    
  }

  const filteredProducts = props.products.filter((product) =>
    Object.values(product).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredProducts.length / parseInt(props.perPage, 10));

    const handlePrevPage = () => {
      setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
      setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

  const handleDeleteProduct = (id, imageId) => {
    alert(id)
  }

 
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
        <div className="row">
          <div className="form-group">

            <input type="text" className="form-control search_products" 
            value={searchTerm} onChange={handleSearchChange}
            placeholder="Search ..."/>

          </div>
        </div>

        <div className="card-container" >
          { filteredProducts.slice(getIndex().start, getIndex().end).map((row, rowIndex) => (

            <div className="card bg-light-subtle mt-1" key={row.id}>

                <ImageGdrive 
                  src={`https://drive.google.com/thumbnail?id=${row.product_drive_id}&sz=w1000`} 
                  alt="Product Image" 
                  fallbackSrc={brokenImage} 
                />

                <div className="card-body">
                <div className="text-section">
                    <h5 className="card-title fw-bold">{row.product_name}</h5>
                    <p className="card-text">{row.product_description}</p>
                </div>
                <div className="cta-section">
                    <div>{row.product_price ? `₱ ${row.product_price}` : 'No Price Declared'}</div>
                    <button href="#" className="btn btn-dark">Edit</button>
                    <button className="btn delete-btn" onClick={() => handleDeleteProduct(row.id,   row.product_drive_id)}>Delete</button>
                </div>
                </div>

            </div>
          ))}

        <div className="row text-center">
          { filteredProducts.length === 0 && (<p className='text-center'><span className="badge bg-secondary">No Data Found</span></p>)}
        </div>
        </div>


        
        <div className="pagination-row">

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
    
    </>
  )
}

export default Card