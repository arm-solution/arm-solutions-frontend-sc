import React, { useState } from 'react'
import './ProductsForm.css'
import productIcon from './../../../assets/images/product.png'

const ProductsForm = () => {

  const [image, setImage] = useState(null); 
  const [previewUrl, setPreviewUrl] = useState(''); 


  const handleFileInputChange = (e) => {
    const file = e.target.files[0]; // Access the file object
    console.log('file object', e.target.files )
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Generate a URL for the image preview
      setPreviewUrl(imageUrl); // Set the preview URL in state
      setImage(file); // Set the selected image file in state
    }
  };

  return (
    <>
   
    <h3>Products Form</h3>
            <div className="row text-center justify-content-center">
              <div className="col-12 d-flex flex-column align-items-center">
                {previewUrl ? (
                  <img src={previewUrl} className="product-img" alt="Product Preview" />
                ) : (
                  <img src={productIcon} className="product-img" alt="Default Product Icon" />
                )}
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/png, image/jpeg"
                  className="mt-2"
                  onChange={handleFileInputChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col col-md-6">
                <div className="form-group">
                  <label htmlFor="product_name">Product Name</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col col-md-6">
                <div className="form-group">
                  <label htmlFor="product_name">Product Name</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>

            <div className="row justify-content-end">
              <button className="btn btn-success save-product">Save</button>
              <button className="btn btn-secondary save-product">Cancel</button>
            </div>
    </>
  )
}

export default ProductsForm