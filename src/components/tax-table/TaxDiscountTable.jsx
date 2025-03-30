 import React, { useState, useEffect } from 'react';
import './TaxDiscountTable.css';

const TaxDiscountTable = (props) => {
  const [nextRowId, setNextRowId] = useState(1);
  const [initialized, setInitialized] = useState(false); // To prevent reinitializing rows on each render



  useEffect(() => {
    if (!initialized) {
      // Initialize rowId for existing data from props only once
      const updatedRows = props.taxDiscount.taxDiscount.map((row, index) => ({
        ...row,
        rowId: row.id || nextRowId + index, // Use existing 'id' or assign a unique rowId for new rows
      }));

      props.taxDiscount.setTaxDiscount(updatedRows);
      setNextRowId(nextRowId + updatedRows.length); // Update the nextRowId
      setInitialized(true); // Set initialized to true to avoid further updates
    }
  }, [initialized, props.taxDiscount.taxDiscount]); 

  const handleAddRow = () => {
    const newRow = {
      rowId: nextRowId,
      title: '',
      amount_type: '',
      percentage: '',
      item_total: 0,
      option_type: props.type,
      isEditing: true,
    };

    props.taxDiscount.setTaxDiscount([...props.taxDiscount.taxDiscount, newRow]);
    setNextRowId(nextRowId + 1);
  };

  const handleChange = (rowId, e) => {
    const { name, value } = e.target;
    props.taxDiscount.setTaxDiscount(props.taxDiscount.taxDiscount.map(row =>
      row.rowId === rowId ? { ...row, [name]: value, item_total: props.actions.calculateTaxDiscount({...row, [name]: value}) } : row
    ));
  };

  const handleEdit = (rowId, row) => {
    props.taxDiscount.setTaxDiscount(
      props.taxDiscount.taxDiscount.map(row => row.rowId === rowId ? { ...row, isEditing: true } : row)
    );
  };


  const handleDelete = (rowId, type, row) => {
    // 🔄 Remove the row from the taxDiscount state
    const filteredRows = props.taxDiscount.taxDiscount.filter(row => row.rowId !== rowId);
    props.taxDiscount.setTaxDiscount(filteredRows);

    // 🔄 Remove the row from merged discount/tax state
    const updatedMergedDiscountTax = props.mergeDiscountTax.filter(row => !(row.rowId === rowId && row.option_type === type));

    // ✅ Initialize ref if undefined
    if (!props.preTaxDiscountRef.current) {
        props.preTaxDiscountRef.current = { tax: 0, discount: 0 };
    }

    // ✅ Get previous total tax & discount
    const prevTax = props.preTaxDiscountRef.current.tax || 0;
    const prevDiscount = props.preTaxDiscountRef.current.discount || 0;

    // ✅ Get updated total tax & discount after deletion
    const totalTaxDiscount = props.actions.getTotalTax(updatedMergedDiscountTax);
    const newTax = totalTaxDiscount.tax || 0;
    const newDiscount = totalTaxDiscount.discount || 0;

    // ✅ Compute the difference
    const taxDiff = newTax - prevTax;
    const discountDiff = newDiscount - prevDiscount;
    const taxDiscountDiff = taxDiff - discountDiff;

    console.log("Prev Tax:", prevTax, "Prev Discount:", prevDiscount);
    console.log("New Tax:", newTax, "New Discount:", newDiscount);
    console.log("Tax Difference:", taxDiff, "Discount Difference:", discountDiff);
    console.log("Final Calculation:", parseFloat(props.totalAmountref) + taxDiscountDiff);

    // ✅ Update totalAmount correctly
    props.setTotalAmount(prev => parseFloat(prev) + taxDiscountDiff);

    // ✅ Update ref AFTER calculations
    props.preTaxDiscountRef.current = { tax: newTax, discount: newDiscount };
};


  const handleSave = (rowId) => {
    const row = props.taxDiscount.taxDiscount.find(row => row.rowId === rowId);
    if (!row) return;

    const itemTotal = props.actions.calculateTaxDiscount(row);

    props.taxDiscount.setTaxDiscount(
        props.taxDiscount.taxDiscount.map(row =>
            row.rowId === rowId
                ? { ...row, item_total: itemTotal, isEditing: false, isSaved: true }
                : row
        )
    );

    // ✅ Initialize `prevMergeDiscountTaxRef` if undefined
    if (!props.preTaxDiscountRef.current) {
        props.preTaxDiscountRef.current = { tax: 0, discount: 0 };
    }

    // ✅ Calculate previous and new total for tax & discount
    const prevTax = props.preTaxDiscountRef.current.tax || 0;
    const prevDiscount = props.preTaxDiscountRef.current.discount || 0;

    const totalTaxDiscount = props.actions.getTotalTax(props.mergeDiscountTax);
    const newTax = totalTaxDiscount.tax || 0;
    const newDiscount = totalTaxDiscount.discount || 0;

    // ✅ Compute the difference
    const taxDiff = newTax - prevTax;
    const discountDiff = newDiscount - prevDiscount;
    const taxDiscountDiff = taxDiff - discountDiff;

    console.log("Prev Tax:", prevTax, "Prev Discount:", prevDiscount);
    console.log("New Tax:", newTax, "New Discount:", newDiscount);
    console.log("Tax Difference:", taxDiff, "Discount Difference:", discountDiff);
    console.log("Final Calculation:", parseFloat(props.totalAmountref) + taxDiscountDiff);

    // ✅ Update totalAmount using previous values
    props.setTotalAmount(prev => parseFloat(prev) + taxDiscountDiff);

    // ✅ Update ref AFTER calculations
    props.preTaxDiscountRef.current = { tax: newTax, discount: newDiscount };
};


  return (
    <div className="container mt-4">
      <h4>{ props.type === 'tax' ? 'Tax' : 'Discount' }</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Percentage / Amount (%/₱)</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.taxDiscount.taxDiscount.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  name="title"
                  value={row.title}
                  onChange={(e) => handleChange(row.rowId, e)}
                  disabled={!row.isEditing}
                  className="form-control"
                />
              </td>
              <td>
                <select
                  name="amount_type"
                  value={row.amount_type}
                  onChange={(e) => handleChange(row.rowId, e)}
                  disabled={!row.isEditing}
                  className="form-select"
                >
                  <option value="" disabled>Select</option>
                  <option value="percentage">Percentage</option>
                  <option value="amount">Amount</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  name="percentage"
                  value={row.percentage}
                  onChange={(e) => handleChange(row.rowId, e)}
                  disabled={!row.isEditing}
                  className="form-control"
                />
              </td>
              <td>{ row.item_total || 0 }</td>
              <td>
                {row.isEditing ? (
                  <>
                    <button onClick={() => handleSave(row.rowId)} className="btn btn-success btn-sm me-2">Save</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(row.rowId, row)} className="btn btn-primary btn-sm me-2">Edit</button>
                  </>
                )}
                <button onClick={() => handleDelete(row.rowId, props.type, row)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddRow} className="btn btn-primary btn-sm mb-3">Add Row</button>
    </div>
  );
};

export default TaxDiscountTable;
