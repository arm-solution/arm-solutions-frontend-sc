import React from 'react';
import './EditProduct.css';
import ProductsForm from '../products-form/ProductsForm';

const EditProduct = (props) => {
  return (
    <>
        <div className="modal fade  modal-lg" ref={props.modalRef} id="editProductModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Product</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <ProductsForm product={props.product} />
            </div>
            </div>
        </div>
        </div>
    
    </>
  )
}

export default EditProduct