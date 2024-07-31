import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink
} from '@react-pdf/renderer';

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "table",
    width: "auto",
    marginVertical: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f2f2f2",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
});

// Sample data
const data = [
  { id: 1, name: "John Doe", age: 28, email: "john@example.com" },
  { id: 2, name: "Jane Doe", age: 34, email: "jane@example.com" },
  { id: 3, name: "Mike Smith", age: 41, email: "mike@example.com" },
  { id: 4, name: "Sara Wilson", age: 25, email: "sara@example.com" },
];

const PaySlipPdf = () => {
  return (
    <>
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>ID</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Name</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Age</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Email</Text>
          </View>
        </View>
        {/* Table Data */}
        {data.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.id}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.age}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.email}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
    </>
  )
}

export default PaySlipPdf