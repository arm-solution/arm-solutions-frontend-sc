import React from 'react';
import './PdfViewer.css';
import { PDFViewer } from '@react-pdf/renderer';
import QoutationPdf from './../../components/qoutation-generate-pdf/QoutationPdf';

const PdfViewPage = () => {
  return (
    <div style={{ height: '100vh', display: 'flex' }}>
    <PDFViewer style={{ width: '100%', height: '100%' }}>
        <QoutationPdf />
    </PDFViewer>
    </div>
  )
}

export default PdfViewPage