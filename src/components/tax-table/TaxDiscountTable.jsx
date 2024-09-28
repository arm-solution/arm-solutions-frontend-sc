import React, { useState } from 'react';
import './TaxDiscountTable.css';

const TaxDiscountTable = (props) => {
  const [nextRowId, setNextRowId] = useState(1);

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
    props.taxDiscount.setTaxDiscount(props.taxDiscount.taxDiscount.map(row => row.rowId === rowId ? { ...row, [name]: value, item_total: props.actions.calculateTaxDiscount({...row, [name]: value}) } : row));
  };

  const handleEdit = (rowId) => {  
    props.taxDiscount.setTaxDiscount(props.taxDiscount.taxDiscount.map(row => row.rowId === rowId ? { ...row, isEditing: true } : row));
  };

  const handleDelete = (rowId, type) => {
    // Filter out the row to delete before updating the state
    const filteredRows = props.taxDiscount.taxDiscount.filter(row => row.rowId !== rowId);
  
    // Update the taxDiscount state with the filtered rows
    props.taxDiscount.setTaxDiscount(filteredRows);
  
    // Recalculate the total after the state has been updated
    const updatedMergedDiscountTax = [...props.mergeDiscountTax.filter(row => !(row.rowId === rowId && row.option_type === type))];
    const totalTaxDiscount = props.actions.getTotalTax(updatedMergedDiscountTax);
  
    // Update the totalAmount based on the new totalTaxDiscount
    props.setTotalAmount(parseFloat(props.totalAmountref) + parseFloat(totalTaxDiscount.additional) - parseFloat(totalTaxDiscount.discount));
  };
  
  const handleSave = (rowId) => {
    // Find the row being saved
    const row = props.taxDiscount.taxDiscount.find(row => row.rowId === rowId);
  
    // Calculate the new total for this row
    const itemTotal = props.actions.calculateTaxDiscount(row);
  
    // Update the row to reflect that it is no longer being edited and is now saved
    props.taxDiscount.setTaxDiscount(
      props.taxDiscount.taxDiscount.map(row =>
        row.rowId === rowId ? { ...row, item_total: itemTotal, isEditing: false, isSaved: true } : row
      )
    );
  
    // Recalculate the total after the save action
    const totalTaxDiscount = props.actions.getTotalTax(props.mergeDiscountTax);
  
    // Update the totalAmount after saving
    props.setTotalAmount(parseFloat(props.totalAmountref) + parseFloat(totalTaxDiscount.additional) - parseFloat(totalTaxDiscount.discount));
  };

  return (
    <div className="container mt-4">
      <h4>{ props.type === 'additional' ? 'Additional Items' : 'Discount'}</h4>
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
                    <option value="percentage">
                        Percentage
                    </option>
                    <option value="amount">
                        Amount
                    </option>

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
              <td>
                { row.item_total || 0}
              </td>
              <td>
                {row.isEditing ? (
                  <>
                    <button onClick={() => handleSave(row.rowId)} className="btn btn-success btn-sm me-2">Save</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(row.rowId)} className="btn btn-primary btn-sm me-2">Edit</button>
                  </>
                )}
                <button onClick={() => handleDelete(row.rowId, props.type)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddRow} className="btn btn-primary mb-3">Add Row</button>
      <button style={{ display: 'none'}} onClick={() => {
        console.log('this is data', props.taxDiscount.taxDiscount)
      }} className="btn btn-primary mb-3">Check Data</button>
           
    </div>
  );
}

export default TaxDiscountTable;
