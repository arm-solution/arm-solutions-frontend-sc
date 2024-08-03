import React from 'react';
import './Inquire.css'

const InquiryDetails = (props) => {
  return (
    <>
        <div className="modal fade" ref={props.modalRef} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

            <p className='m-2'>FROM: lance@gmail.com</p>

            <div className="body-container">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit delectus tenetur placeat!
                    Laborum nisi minima debitis veniam aspernatur maxime iusto dolores, deleniti doloribus iure
                    optio. Placeat est hic, nisi incidunt consequuntur rerum eius. Doloremque ex blanditiis
                    facilis asperiores odio? Minus ipsam omnis qui velit nobis. Nobis pariatur rerum autem dicta.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit delectus tenetur placeat!
                    Laborum nisi minima debitis veniam aspernatur maxime iusto dolores, deleniti doloribus iure
                    optio. Placeat est hic, nisi incidunt consequuntur rerum eius. Doloremque ex blanditiis
                    facilis asperiores odio? Minus ipsam omnis qui velit nobis. Nobis pariatur rerum autem dicta.
                </p>
                <div className="message-date">
                    <p className='mt-3'>~August 2, 2024</p>
                </div>
            </div>


            </div>
            <div className="modal-footer">
            </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default InquiryDetails