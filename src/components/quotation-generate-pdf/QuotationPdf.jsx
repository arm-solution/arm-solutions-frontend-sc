import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import RobotoBold from './../../assets/fonts/Roboto-Black.ttf'; 
import RobotoItalic from './../../assets/fonts/Roboto-Italic.ttf'; 
import Logo from './../../assets/images/logo.png';
import backgroundImage from './../../assets/images/arm_circle_logo-nbg.png'
import { formatDateReadable, formatDateToStringv2 } from '../../customs/global/manageDates';

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
    fontSize: 10,
  },
  horizontalLine: {
    display: 'flex',
    justifyContent: 'center',
    marginVertical: 7,
    borderBottomWidth: 4,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    width: '90%',
    left: 30,
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
    opacity: 0.3,
  },

  // ✅ TABLE (updated to avoid double borders)
  tableContainer: {
    marginTop: 20,
  },
  table: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#000', // outer border of the table
    borderStyle: 'solid',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableRowTotal: {
    flexDirection: 'row',
    backgroundColor: '#FAFAD2'
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#d3d3d3',
  },
  tableCol: {
    flex: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    justifyContent: 'center',
  },
  descriptionCol: {
    flex: 2,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    justifyContent: 'center',
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
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

  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


 return (
  <>
  <Document>
      <Page size="A4" style={styles.page}>
      <Image source={backgroundImage} style={styles.backgroundImage} fixed></Image>
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
              <Text>{ pdfData?.clientDetails[0]?.name }</Text>
              <Text>{ pdfData?.clientDetails[0]?.address }</Text>
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
            <Text>Mr./Ms. { capitalizeFirstLetter(pdfData?.creator?.fullname) }</Text>
            <Text>{ capitalizeFirstLetter(pdfData?.creator?.position) }</Text>
          </View>
        
        </View>

        <View style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            left: 40, 
            top: 45
        }}>
            <Text style={styles.textSize}>SUBJECT:</Text>
            <Text 
                style={[
                    styles.textSize, 
                    { marginLeft: 13, flexShrink: 1, maxWidth: 450 } // set maxWidth here too
                ]}
            >
                {pdfData?.quotation?.description}
            </Text>
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


      <View style={{ height: 20 }} />

        {/* table additional */}
        <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeaderRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>TITLE</Text>
              </View>
                  
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>QTY</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>UNIT</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>PRICE</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>TOTAL</Text>
              </View>
            </View>
            {/* Table Content */}
            {pdfData?.additional.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.title}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.quantity}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.unit}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.price}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.item_total}</Text>
                </View>
              </View>
            ))}

        </View>
        {/* end of table additional */}

        {/* table products */}

        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeaderRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>TITLE</Text>
            </View>
                
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>QTY</Text>
            </View>
            <View style={styles.descriptionCol}>
              <Text style={styles.tableCellHeader}>DESCRIPTION</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>PRICE</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>TOTAL</Text>
            </View>
          </View>
          {/* Table Content */}
          {pdfData?.quotationItem.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.product_name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.qty}</Text>
              </View>
              <View style={styles.descriptionCol}>
                <Text style={styles.tableCell}>{item.description}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.base_price}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.item_total}</Text>
              </View>
            </View>
          ))}
        </View>
        {/* end of table products */}


        {/* table tax */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeaderRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>TITLE</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>TOTAL</Text>
            </View>
          </View>
          {/* Table Content */}
          {pdfData?.tax.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.title}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.item_total}</Text>
              </View>
            </View>
          ))}
        </View>
        {/* end of table tax */}

        {/* table discount */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeaderRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>TITLE</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>TOTAL</Text>
            </View>
          </View>
          {/* Table Content */}
          {pdfData?.discount.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.title}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.item_total}</Text>
              </View>
            </View>
          ))}
        </View>
        {/* end of table discount */}


        {/* table discount */}
        <View style={styles.table}>
          <View style={styles.tableRowTotal}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>TOTAL AMOUNT</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{pdfData?.quotation.grand_total}</Text>
            </View>
          </View>
        </View>
        {/* end of table discount */}


      {/* Bottom Space */}
      <View style={{ height: 100 }} />
      </Page>


  </Document>
  </>
 )
}

export default PDFDocument;
