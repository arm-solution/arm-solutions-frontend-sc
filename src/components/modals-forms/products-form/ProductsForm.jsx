  import React, { useState, useRef } from 'react'
  import './ProductsForm.css'
  import productIcon from './../../../assets/images/product.png'
  import { useSelector, useDispatch } from 'react-redux';

  import imageBroken from './../../../assets/images/brokenImage.png';

  import { addNewProduct } from '../../../store/features/productSlice';

  const ProductsForm = (props) => {

    const fileInputRef = useRef(null);
    const [image, setImage] = useState(null); 
    const [previewUrl, setPreviewUrl] = useState('');

    const dispatch = useDispatch();

    const [imageSrc, setImageSrc] = useState(productIcon);

    const {data, isSuccess, loading, message} = useSelector((state) => state.products);

    
    const [prductData, setPrductData] = useState({
      product_name: '',
      product_description:  '',
      product_price:  0,
    })


    const handleFileInputChange = (e) => {
      const file = e.target.files[0]; // Access the file object 
      if (file) {
        const imageUrl = URL.createObjectURL(file); // Generate a URL for the image preview
        setPreviewUrl(imageUrl);
        setImage(file);
      }
    };

    const handleProductInput = (e) => {
      e.preventDefault();
      const { name, value } = e.target;

      setPrductData({
        ...prductData,
        [name]: value
      })

    }

    const saveProduct = async (e) => {
      e.preventDefault();
      const formData = new FormData();

      for (const key in prductData) {
        formData.append(key, prductData[key]);
      }

      // Append file data to FormData
      if (image) {
        formData.append('file', image);
      }

      if(props.product) {
        //  update here
      } else {
        dispatch(addNewProduct(formData))
      }


      if(!loading) {
        setPreviewUrl('')
        setImage(null);
        setPrductData({
          product_name: '',
          product_description: '',
          product_price: 0,
        });

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

      }

    }

    const handleImageError = () => {
      setImageSrc(imageBroken);
    };

    return (
      <>

      {/* {console.log( 'file ref', props.product )} */}
      <h3>Products Form</h3>
              <div className="row text-center justify-content-center">
                <div className="col-12 d-flex flex-column align-items-center">
                  {previewUrl ? (
                    <img src={previewUrl} className="product-img" alt="Product Preview" />
                  ) : (
                    <img src={props.product?.product_drive_id
                      ? `https://drive.google.com/thumbnail?id=${props.product.product_drive_id}&sz=w1000`
                      : imageSrc } 
                      className="product-img" alt="Default Product Icon" onError={handleImageError} />
                  )}
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    className="mt-2"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col col-md-6">
                  <div className="form-group">

                    <label htmlFor="product_name">Product Name</label>

                    <input type="text" name='product_name'
                    className="form-control"
                    value={ props.product?.product_name ?? prductData.product_name } 
                    onChange={handleProductInput} />
                
                  </div>
                </div>
                <div className="col col-md-6">
                  <div className="form-group">
                    
                    <label htmlFor="product_description">Product Description</label>

                    <input type="text" name='product_description'
                    className="form-control"
                    value={ props.product?.product_description ?? prductData.product_description}
                    onChange={handleProductInput}/>
                  
                  </div>
                </div>
              </div>

              <div className="row">
              <div className="col col-md-6">
                  <div className="form-group">

                    <label htmlFor="product_price">Product Price</label>

                    <input type="number" name='product_price'
                    className="form-control"
                    value={ props.product?.product_price ?? prductData.product_price}
                    onChange={handleProductInput}/>
                  
                  </div>
                </div>
                <div className="col col-md-6">
                  {/* <div className="form-group">
                    <label htmlFor="product_name">Product Name</label>
                    <input type="text" className="form-control" />
                  </div> */}
                </div>
              </div>

              <div className="row justify-content-end">
                <button className={`btn btn-primary save-product ${loading ? 'loading' : ''}`} onClick={saveProduct} disabled={loading}>
                    <span className="btn-text">Save Product</span>
                    {loading && <span className="btn-loading"></span>}
                </button>
                <button className="btn btn-secondary save-product">Cancel</button>
              </div>
      </>
    )
  }

  export default ProductsForm