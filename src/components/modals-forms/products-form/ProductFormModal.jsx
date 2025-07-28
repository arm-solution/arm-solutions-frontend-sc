import React, { useState, useRef, useEffect } from 'react'
import './ProductsForm.css'
import productIcon from './../../../assets/images/product.png'
import { useSelector, useDispatch } from 'react-redux';
import imageBroken from './../../../assets/images/brokenImage.png';
import { addNewProduct, updateProduct, getAllProducts } from '../../../store/features/productSlice';
import { errorDialog, successDialog } from '../../../customs/global/alertDialog';
import { unwrapResult } from '@reduxjs/toolkit';
import { getAllCategory } from '../../../store/features/categorySlice';

const ProductsFormModal = ({modalRef, selectedProduct, setSelectedProduct }) => {
  const dispatch = useDispatch();

  const { _getAllcategory } = useSelector(state => state.categories);

  const handleInputChange = (e) => {
    setSelectedProduct({
      ...selectedProduct,
      [e.target.name]: e.target.value,
    });
  };


  useEffect(() => {
    dispatch(getAllCategory());
  }, [])
  

  const saveUpdateProduct = async () => {
    if (
        selectedProduct.name === '' ||
        selectedProduct.description === '' ||
        selectedProduct.sku === '' ||
        selectedProduct.stock_quantity === '' ||
        selectedProduct.base_price === ''
    ) {
        errorDialog('All fields are required');
        return;
    }

    try {
        let actionResult;

        
        if (selectedProduct.id) {
          const { category_name, ...dataToUpdate } = selectedProduct
            actionResult = await dispatch(updateProduct([dataToUpdate]));
        } else {
            actionResult = await dispatch(addNewProduct(selectedProduct));
        }

        const result = unwrapResult(actionResult);
        console.log("result", result)
        if (result.success) {
            successDialog(selectedProduct.id ? 'Updated Successfully' : 'New Product Added');
            dispatch(getAllProducts());
        } else {
            errorDialog(selectedProduct.id ? 'Failed to Update Product' : 'Failed to Add Product');
        }
    } catch (error) {
        errorDialog('An unexpected error occurred');
    }
};


  return (
    <>

<div className="modal fade modal-lg" ref={modalRef} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Product Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={selectedProduct?.name || ''}
                  className="form-control"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="form-group">  
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  value={selectedProduct?.description || ''}
                  className="form-control"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="sku">SKU</label>
                <input
                  type="text"
                  name="sku"
                  value={selectedProduct?.sku || ''}
                  className="form-control"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="stock_quantity">Quantity</label>
                <input
                  type="number"
                  name="stock_quantity"
                  value={selectedProduct?.stock_quantity || ''}
                  className="form-control"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="base_price">Base Price</label>
                <input
                  type="number"
                  name="base_price"
                  value={selectedProduct?.base_price || ''}
                  className="form-control"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                name="category_id"
                value={selectedProduct?.category_id || ''}
                className="form-control"
                onChange={(e) => handleInputChange(e)}
                >
                <option value="" disabled>Select Category</option>
                {_getAllcategory.map(data => (
                   <option value={data.id} key={data.id}>{data.name}</option>
                ))}


                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={saveUpdateProduct}>
              {/* <button type="button" className="btn btn-primary"> */}
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
              
      </>
    )
  }

  export default ProductsFormModal