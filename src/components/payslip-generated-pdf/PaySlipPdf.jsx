import React, { useEffect, useState } from 'react'
import { capitalizeFirstLetter } from '../../customs/global/manageObjects';
import { formatDateReadable } from '../../customs/global/manageDates';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet
} from '@react-pdf/renderer';

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    marginBottom: 10,
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
  divider: {
    borderBottom: '1 solid #000',
    marginVertical: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#007bff',
  },
  tableCol: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  tableCell: {
    margin: 5,
  },
  groupHeader: {
    marginTop: 10,
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: '#e6f2f7',
    padding: 4,
  },
  note: {
    fontStyle: 'italic',
    marginTop: 10,
  },
  labelRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  labelKey: {
    width: '40%',
    textAlign: 'right',
    paddingRight: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  labelValue: {
    width: '60%',
    textAlign: 'left',
    fontSize: 12,
  },


  subHeaderTable: {
    display: 'table',
    width: 'auto',
    marginBottom: 10,
  },
  subHeaderRow: {
    flexDirection: 'row',
  },
  subHeaderCellLabel: {
    width: 130, // fixed width for labels
    fontSize: 12,
    fontWeight: 'bold',
  },
  subHeaderCellValue: {
    fontSize: 12,
  },

  tableRowHighlight: {
    flexDirection: 'row',
    backgroundColor: '#dff0d8', // light green for highlight
  },
  tableCellBold: {
    margin: 5,
    fontWeight: 'bold',
  },
});

const PaySlipPdf = () => {

  const [earnings, setEarnings] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
        const pay = sessionStorage.getItem('paySlipSession');
        const userInfo = sessionStorage.getItem('userLoggedIn');

        if(pay && userInfo) {
          setEarnings(JSON.parse(pay));
          setUser(JSON.parse(userInfo));
        } else {
          window.location.href = '/not-found';
        }

    } else {
      window.location.href = '/not-found';
    }
  }, [])
  



  return (
    <Document>
      <Page size="A4" style={styles.page}>
 
        {/* Title */}
        <Text style={styles.header}>PAYSLIP</Text>

        {/* Employee Details */}
        <View style={styles.subHeaderTable}>
          <View style={styles.subHeaderRow}>
            <Text style={styles.subHeaderCellLabel}>Employee:</Text>
            <Text style={styles.subHeaderCellValue}>
              {user?.firstname && user?.lastname
                ? `${capitalizeFirstLetter(user.firstname)} ${capitalizeFirstLetter(user.lastname)}`
                : '---'}
            </Text>
          </View>

          <View style={styles.subHeaderRow}>
            <Text style={styles.subHeaderCellLabel}>Employee Number:</Text>
            <Text style={styles.subHeaderCellValue}>{user?.employee_id || '---'}</Text>
          </View>

          <View style={styles.subHeaderRow}>
            <Text style={styles.subHeaderCellLabel}>Date From:</Text>
            <Text style={styles.subHeaderCellValue}>
              {earnings?.date_from ? formatDateReadable(earnings.date_from) : '---'}
            </Text>
          </View>

          <View style={styles.subHeaderRow}>
            <Text style={styles.subHeaderCellLabel}>Date To:</Text>
            <Text style={styles.subHeaderCellValue}>
              {earnings?.date_to ? formatDateReadable(earnings.date_to) : '---'}
            </Text>
          </View>
        </View>

        <View style={styles.divider}></View>

        {/* Summary Table */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Description</Text></View>
            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Amount (Php)</Text></View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Gross Pay</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Php { earnings ? earnings.gross_pay : '---' } </Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Additional</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Php { earnings ? earnings.total_additional_pay : '---' }</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Deduction</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Php { earnings ? earnings.total_deduction : '---' }</Text></View>
          </View>

          <View style={styles.tableRowHighlight}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellBold}>Total</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellBold}>Php {earnings ? earnings.final_pay : '---'}</Text>
            </View>
          </View>

        </View>

        {/* Additional Section */}
        <Text style={styles.groupHeader}>Additional</Text>
        <View style={styles.table}>
          {Array.isArray(earnings.additional) && earnings.additional.length > 0 && earnings.additional.map(d => (
            <View style={styles.tableRow}>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{d.title}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Php {d.amount}</Text></View>
            </View>
          ))}
        </View>

        {/* Deduction Section */}
        <Text style={styles.groupHeader}>Deduction</Text>
        <View style={styles.table}>
          {Array.isArray(earnings.deduction) && earnings.deduction.length > 0 && earnings.deduction.map(d => (
            <View style={styles.tableRow}>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{d.title}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Php {d.amount}</Text></View>
            </View>
          ))}
        </View>

        {/* Footer Note */}
        <Text style={styles.note}>
          Note: Please contact HR for any discrepancies in your payslip.
        </Text>

      </Page>
    </Document>
  )
};

export default PaySlipPdf;
