import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import RobotoBold from './../../assets/fonts/Roboto-Black.ttf'; 
import RobotoItalic from './../../assets/fonts/Roboto-Italic.ttf'; 
import Logo from './../../assets/images/logo.png';
import backgroundImage from './../../assets/images/arm_circle_logo-nbg.png'
import { dateFormatted, formatDateToStringv2 } from '../../customs/global/manageDates';

// Register fonts
Font.register({
  family: 'RobotoBold',
  src: RobotoBold,
});

Font.register({
  family: 'RobotoItalics',
  src: RobotoItalic,
});

// Stylesheet
const styles = StyleSheet.create({
  page: {
    padding: 5,
  },
  logo: {
    width: 150,
    height: 80,
    marginBottom: 10,
    left: 60,
  },
  textTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  textTitle: {
    left: 60,
    top: 25,
    fontSize: 21,
    fontFamily: 'Helvetica-Bold',
  },
  textSubTitle: {
    left: 60,
    top: 30,
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  textSize: {
    fontSize: 10
  },
  horizontalLine: {
    display: 'flex',
    justifyContent: 'center',
    marginVertical: 7,
    borderBottomWidth: 4,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    width: '90%',
    left: 30
  },
  bold: {
    fontFamily: 'RobotoBold',
    fontWeight: 'bold',
  },
  italic: {
    fontFamily: 'RobotoItalics',
  },

  backgroundImage: {
    position: 'absolute',
    top: 320,
    left: '13%',
    width: '80%',
    height: '55%',
    zIndex: -1, 
    opacity: 0.3
  },

  table: {
    marginTop: 45,
    width: '90%',
    display: "table",
    left: 35  ,
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row"
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: '#d3d3d3'
  },
  tableCol: {
    width: "15%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 'bold'
  },
  tableCell: {
    margin: 5,
    fontSize: 10
  },
  descriptionRow: {
    width: "40%", // Wider width for the "Name" column
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  fullRow: {
    width: "100%", // Wider width for the "Name" column
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  }
  
});

// PDF Document component
const PDFDocument = ({ id, state}) => {

  const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    // Ensure sessionStorage is available and not null
    if (typeof window !== "undefined" && window.sessionStorage) {
      const storedState = sessionStorage.getItem("pdfViewerState");

      if (storedState) {
        setPdfData(JSON.parse(storedState));
      } else {
        window.location.href = '/not-found';
      }
    } else {
        window.location.href = '/not-found';
    }
  }, []);
  
 return (
  <>
  <Document>
      <Page size="A4" style={styles.page}>
      <Image source={backgroundImage} style={styles.backgroundImage}></Image>
        <View style={styles.imageContainer}>
          <Image style={styles.logo} source={Logo} />
          <View>
            <Text style={[styles.textTitle, styles.bold]}>ARM SOLUTION ENTERPRISES</Text>
            <Text style={[styles.textSubTitle, styles.italic]}>Today's answer for tomorrow's needs!</Text>
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ left: 60}}>

            <View style={ [styles.textSize,{ display: 'flex', flexDirection: 'row'}] }>
              <Text style={styles.bold}>Address: </Text>
              <Text>Bilucao, Malvar Batangas</Text>
            </View>
            <View style={[styles.textSize,{ display: 'flex', flexDirection: 'row'}]}>
              <Text style={[styles.bold]}>Email: </Text>
              <Text>armsolution@yahoo.com</Text>
            </View>

          </View>

          <View style={{ right: 40 }}> 
            <View style={{ display: 'flex', flexDirection: 'row'}}>
              <Text style={[styles.bold, styles.textSize]}>Contact Number: </Text>
              <View style={styles.textSize}>
                <Text>0929-178-8958</Text>
                <Text>(043-341-8429)</Text>
              </View>
            </View>
              <View style={[styles.textSize, { display: 'flex', flexDirection: 'row'}]}>
                <Text style={styles.bold}>TIN: </Text>
                <Text>174-047-297-000</Text>

              </View>
          </View>
        </View>

        <View style={[styles.textSize,{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', color: 'red', right: 40,  marginTop: 20}]}>
          <Text>REF NO.</Text>
          <Text>ADD SAMI3Y83997</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', left: 40}}>
          
            <Text style={styles.textSize}>TO:</Text>
            <View style={[styles.textSize, { left: 45 }]}>
              <Text>{ pdfData?.clientDetails[0].name }</Text>
              <Text>{ pdfData?.clientDetails[0].address }</Text>
            </View>
          
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', left: 40, top: 15}}>
          
          <Text style={styles.textSize}>ATTN:</Text>
          <View style={[styles.textSize, { left: 35}]}>
            <Text>MR ERWIN BLAZA</Text>
            <Text>Safety Officer</Text>
          </View>
        
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', left: 40, top: 30}}>
          
          <Text style={styles.textSize}>FROM:</Text>
          <View style={[styles.textSize, { left: 29}]}>
            <Text>MR ADRED DEL MUNDO</Text>
            <Text>Marketing Specialist</Text>
          </View>
        
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', left: 40, top: 45 }}>
          
          <Text style={styles.textSize}>SUBJECT:</Text>
          {/* <Text style={[styles.textSize, { left: 13}]}>{ quotation?.description }</Text> */}
        
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', left: 40, top: 60}}>
          
          <Text style={styles.textSize}>DATE:</Text>
          <Text style={[styles.textSize, { left: 35}]}>{ formatDateToStringv2(pdfData?.quotation.date_created) }</Text>
        
        </View>

        <View style={[styles.horizontalLine, {top: 55 }]} />

        <View>
          <Text style={{ fontSize: 10, top: 50, padding: 60, paddingRight: 30 , paddingTop: 0, paddingBottom: 0 }}>
              In line with the government requirements. I Fire Code of the Philippines and in compliance with your request,
          </Text>
          <Text style={{ fontSize: 10, top: 50, padding: 30, paddingTop: 0}}>
          We are very pleased to submit in your good office this formal proposal for the above mentioned project. We shall
          supply necessary labor, equipment technical supervision and management staff in accordance to the plans furnished
          to us for the above-mentioned project.
          </Text>
        </View>

        <View style={ [styles.bold, { display: 'flex', flexDirection: 'row', justifyContent: 'center', fontSize: 12, top: 25}] }>
          <Text>PERFORMA INVOICE</Text>
        </View>

      {/* table */}

      <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeaderRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>QTY</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>UNIT</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={styles.tableCellHeader}>DESCRIPTION</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>UNIT PRICE</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>AMOUNT</Text>
            </View>
          </View>
          {/* Table Content */}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>John Doe</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>John Doe</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={styles.tableCell}>
              Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph. A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, 
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>1234 Main St</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>555-1234</Text>
            </View>
          </View>
          {/* row 100% */}
          <View>
            <View style={styles.fullRow}>
              <Text style={styles.tableCell}>555-1234</Text>
            </View>
          </View>


          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>John Doe</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>John Doe</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={styles.tableCell}>
              Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph. A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, 
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>1234 Main St</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>555-1234</Text>
            </View>
          </View>

          {/* row 100% */}
          <View>
            <View style={styles.fullRow}>
              <Text style={styles.tableCell}>555-1234</Text>
            </View>
          </View>

          {/* Add more rows as needed */}
        </View>



      </Page>


  </Document>
  </>



 )
}

export default PDFDocument;
