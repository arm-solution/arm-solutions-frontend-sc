import React from 'react';
import './PdfViewer.css';
import { PDFViewer } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';
import QoutationPdf from './../../components/qoutation-generate-pdf/QoutationPdf';
import PaySlipPdf from '../../components/payslip-generated-pdf/PaySlipPdf';

const PdfViewPage = () => {

  const { name } = useParams();
  return (
    <div style={{ height: '100vh', display: 'flex' }}>
    <PDFViewer style={{ width: '100%', height: '100%' }}>

      {name === 'payslip' && <PaySlipPdf />}
      {name === 'quotation' && <QoutationPdf />}
        
    </PDFViewer>
    </div>
  )
}

export default PdfViewPage