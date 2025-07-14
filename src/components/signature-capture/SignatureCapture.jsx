import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignatureCapture = ({ onPreview }) => {
  const sigPadRef = useRef(null);

  const handlePreview = () => {
    const signature = sigPadRef.current?.getTrimmedCanvas().toDataURL('image/png');
    if (onPreview) {
      onPreview(signature); // Optional callback to handle base64 output
    } else {
      console.log('Preview Signature:', signature); // Fallback for demo/testing
    }
  };

  const handleClear = () => {
    sigPadRef.current?.clear();
  };

  return (
    <div>
      <SignatureCanvas
        ref={sigPadRef}
        penColor="black"
        canvasProps={{
          width: 400,
          height: 150,
          className: 'sigCanvas border',
        }}
      />
      <div className="mt-2">
        <button onClick={handlePreview}>Preview Signature</button>
        <button onClick={handleClear} className="ms-2">Clear</button>
      </div>
    </div>
  );
};

export default SignatureCapture;
