import React, { useEffect, useState } from 'react';
import './PdfViewer.css';
import { PDFViewer } from '@react-pdf/renderer';
import { useParams, useLocation } from 'react-router-dom';
import QuotationPdf from '../../components/quotation-generate-pdf/QuotationPdf';
import PaySlipPdf from '../../components/payslip-generated-pdf/PaySlipPdf';

const PdfViewPage = () => {

  const { name, id } = useParams();
  const location = useLocation();

  const { state } = location;

  return (
    <div style={{ height: '100vh', display: 'flex' }}>
    <PDFViewer style={{ width: '100%', height: '100%' }}>

      {name === 'payslip' && <PaySlipPdf state={state} id={id} />}
      {name === 'quotation' && <QuotationPdf state={state} id={id} />}
        
    </PDFViewer>
    </div>
  )
}

export default PdfViewPage