import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './TermsCondition.css'

const TermsCondition = (props) => {

  return (
    <>
        <div className="custom-editor-container">
            <ReactQuill
                theme="snow"
                value={props.termsCondition}
                onChange={props.setTermsCondition}
            />
        </div>
    </>
  )
}

export default TermsCondition