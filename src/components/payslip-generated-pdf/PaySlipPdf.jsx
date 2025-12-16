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

// Enhanced Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  // Header Section
  headerContainer: {
    backgroundColor: '#841a21',
    padding: 20,
    marginBottom: 25,
    borderRadius: 4,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 2,
  },
  headerSubtext: {
    fontSize: 9,
    color: '#f0f0f0',
    marginTop: 4,
  },
  
  // Employee Info Section
  employeeSection: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginBottom: 20,
    borderRadius: 4,
    borderLeft: '4 solid #841a21',
  },
  employeeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  employeeItem: {
    width: '50%',
    marginBottom: 8,
    flexDirection: 'row',
  },
  employeeLabel: {
    fontSize: 9,
    color: '#666666',
    fontWeight: 'bold',
    width: 110,
  },
  employeeValue: {
    fontSize: 10,
    color: '#333333',
    flex: 1,
  },
  
  divider: {
    borderBottom: '2 solid #e0e0e0',
    marginVertical: 15,
  },
  
  // Summary Section
  summaryContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#841a21',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: '2 solid #841a21',
  },
  
  // Table Styles
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 15,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1 solid #e0e0e0',
  },
  tableRowHeader: {
    flexDirection: 'row',
    backgroundColor: '#841a21',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tableRowTotal: {
    flexDirection: 'row',
    backgroundColor: '#f0e6e7',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  tableCol: {
    width: '50%',
    padding: 10,
  },
  tableColRight: {
    width: '50%',
    padding: 10,
    textAlign: 'right',
  },
  tableCellHeader: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  tableCell: {
    fontSize: 10,
    color: '#333333',
  },
  tableCellBold: {
    fontSize: 11,
    color: '#841a21',
    fontWeight: 'bold',
  },
  tableCellAmount: {
    fontSize: 10,
    color: '#333333',
    textAlign: 'right',
  },
  
  // Detail Sections
  detailSection: {
    marginBottom: 15,
  },
  detailHeader: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#841a21',
    marginBottom: 8,
    paddingLeft: 5,
    borderLeft: '3 solid #841a21',
    paddingVertical: 3,
  },
  detailTable: {
    backgroundColor: '#fafafa',
    borderRadius: 4,
    padding: 5,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottom: '1 solid #eeeeee',
  },
  detailLabel: {
    width: '70%',
    fontSize: 9,
    color: '#555555',
  },
  detailAmount: {
    width: '30%',
    fontSize: 9,
    color: '#333333',
    textAlign: 'right',
  },
  
  // Footer
  footer: {
    marginTop: 25,
    paddingTop: 15,
    borderTop: '1 solid #e0e0e0',
  },
  note: {
    fontSize: 8,
    color: '#666666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  confidential: {
    fontSize: 7,
    color: '#999999',
    textAlign: 'center',
    marginTop: 5,
  },
});

const PaySlipPdf = () => {

  const [earnings, setEarnings] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
        const pay = sessionStorage.getItem('paySlipSession');
        const userInfo = sessionStorage.getItem('userLoggedIn');
        const employeeInfo = sessionStorage.getItem('employeeData')

        if(pay && employeeInfo) {
          setEarnings(JSON.parse(pay));
          setUser(JSON.parse(employeeInfo));
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
 
        {/* Enhanced Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>PAYSLIP</Text>
          <Text style={styles.headerSubtext}>
            Period: {earnings?.data?.date_from ? formatDateReadable(earnings.data.date_from) : '---'} to {earnings?.data?.date_to ? formatDateReadable(earnings.data.date_to) : '---'}
          </Text>
        </View>

        {/* Employee Details Section */}
        <View style={styles.employeeSection}>
          <View style={styles.employeeGrid}>
            <View style={styles.employeeItem}>
              <Text style={styles.employeeLabel}>Employee Name:</Text>
              <Text style={styles.employeeValue}>
                {user?.firstname && user?.lastname
                  ? `${capitalizeFirstLetter(user.firstname)} ${capitalizeFirstLetter(user.lastname)}`
                  : '---'}
              </Text>
            </View>

            <View style={styles.employeeItem}>
              <Text style={styles.employeeLabel}>Employee ID:</Text>
              <Text style={styles.employeeValue}>{user?.employee_id || '---'}</Text>
            </View>

            <View style={styles.employeeItem}>
              <Text style={styles.employeeLabel}>Date From:</Text>
              <Text style={styles.employeeValue}>
                {earnings?.data?.date_from ? formatDateReadable(earnings.data.date_from) : '---'}
              </Text>
            </View>

            <View style={styles.employeeItem}>
              <Text style={styles.employeeLabel}>Date To:</Text>
              <Text style={styles.employeeValue}>
                {earnings?.data?.date_to ? formatDateReadable(earnings.data.date_to) : '---'}
              </Text>
            </View>
          </View>
        </View>

        {/* Summary Section */}
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>EARNINGS SUMMARY</Text>
          
          <View style={styles.table}>
            <View style={styles.tableRowHeader}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>Description</Text>
              </View>
              <View style={styles.tableColRight}>
                <Text style={styles.tableCellHeader}>Amount (PHP)</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Gross Pay</Text>
              </View>
              <View style={styles.tableColRight}>
                <Text style={styles.tableCellAmount}>
                  {earnings?.data?.gross_pay ? `Php ${parseFloat(earnings.data.gross_pay).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '---'}
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Additional Earnings</Text>
              </View>
              <View style={styles.tableColRight}>
                <Text style={styles.tableCellAmount}>
                  {earnings?.data?.total_additional_pay ? `Php ${parseFloat(earnings.data.total_additional_pay).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '---'}
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Total Deductions</Text>
              </View>
              <View style={styles.tableColRight}>
                <Text style={styles.tableCellAmount}>
                  {earnings?.data?.total_deduction ? `Php ${parseFloat(earnings.data.total_deduction).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '---'}
                </Text>
              </View>
            </View>

            <View style={styles.tableRowTotal}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellBold}>NET PAY</Text>
              </View>
              <View style={styles.tableColRight}>
                <Text style={styles.tableCellBold}>
                  {earnings?.data?.final_pay ? `Php ${parseFloat(earnings.data.final_pay).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '---'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Additional Earnings Detail */}
        {Array.isArray(earnings?.data?.additional) && earnings?.data?.additional.length > 0 && (
          <View style={styles.detailSection}>
            <Text style={styles.detailHeader}>Additional Earnings Breakdown</Text>
            <View style={styles.detailTable}>
              {earnings.data.additional.map((d, index) => (
                <View key={index} style={styles.detailRow}>
                  <Text style={styles.detailLabel}>{d.title}</Text>
                  <Text style={styles.detailAmount}>
                    Php {parseFloat(d.amount).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Deductions Detail */}
        {Array.isArray(earnings?.data?.deduction) && earnings?.data?.deduction.length > 0 && (
          <View style={styles.detailSection}>
            <Text style={styles.detailHeader}>Deductions Breakdown</Text>
            <View style={styles.detailTable}>
              {earnings.data.deduction.map((d, index) => (
                <View key={index} style={styles.detailRow}>
                  <Text style={styles.detailLabel}>{d.title}</Text>
                  <Text style={styles.detailAmount}>
                    Php {parseFloat(d.amount).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.note}>
            Note: Please contact the Human Resources Department for any discrepancies or questions regarding your payslip.
          </Text>
          <Text style={styles.confidential}>
            This document is confidential and intended solely for the addressee.
          </Text>
        </View>

      </Page>
    </Document>
  )
};

export default PaySlipPdf;