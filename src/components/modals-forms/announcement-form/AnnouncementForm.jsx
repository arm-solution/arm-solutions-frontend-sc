import React, { useState, useRef } from 'react';
import './AnnouncementForm.css';
import productIcon from './../../../assets/images/product.png';
import imageBroken from './../../../assets/images/brokenImage.png';

const AnnouncementForm = (props) => {
    const fileInputRef = useRef(null);
    const [image, setImage] = useState(null); 
    const [previewUrl, setPreviewUrl] = useState('');
    
    const [imageSrc, setImageSrc] = useState(productIcon);


    const handleFileInputChange = (e) => {
        const file = e.target.files[0]; // Access the file object 
        if (file) {
          const imageUrl = URL.createObjectURL(file); // Generate a URL for the image preview
          setPreviewUrl(imageUrl);
          setImage(file);
        }
    };

    const handleImageError = () => {
        setImageSrc(imageBroken);
    };
  

  return (
    <>
        <div className="container">
        <div className="card">
            <h5 className="card-header bg-secondary text-white">Announcement Form</h5>
            <div className="card-body" style={{background: "#d5dbdb"}}> 

            <div className="row text-center justify-content-center">
                <div className="col-12 d-flex flex-column align-items-center">
                  {previewUrl ? (
                    <img src={previewUrl} className="announcement-img" alt="Preview" />
                  ) : (
                    <img src={props.product?.product_drive_id
                      ? `https://drive.google.com/thumbnail?id=${props.product.product_drive_id}&sz=w1000`
                      : imageSrc } 
                      className="announcement-img" alt="Default Product Icon" onError={handleImageError} />
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

              <div className="row m-5 mb-0 ">
                <div className="form-group">
                    <label htmlFor="title"><b>Title</b></label>
                    <input type="text" className="form-control" />
                </div>
              </div>

              
              <div className="row m-5 mb-0 mt-0">
                  <div className="form-group">
                    {/* <label htmlFor="description"><b>Description</b></label> */}
                    <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Enter your description..."
                    ></textarea>
                  </div>
              </div>

             <div className="row justify-content-end m-5 mt-0 mb-0">
                 <button type="button" className="btn btn-success text-white publish-btn m-3">Publish now</button>
             </div>
                
            </div>
        </div>
        </div>
    </>
  )
}

export default AnnouncementForm