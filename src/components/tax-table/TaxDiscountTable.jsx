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

  // calculating tax and discount percentage
  const calculateTaxDiscount = (row) =>{
    if(props.totalAmount > 0) {
      return row.amount_type === 'percentage' ? 
      (parseInt(props.totalAmount * parseInt(row.percentage))) / 100 : row.percentage;
    } else {
      return 0;
    }
  }

  const handleChange = (rowId, e) => {
    const { name, value } = e.target;
    props.taxDiscount.setTaxDiscount(props.taxDiscount.taxDiscount.map(row => row.rowId === rowId ? { ...row, [name]: value, item_total: calculateTaxDiscount({...row, [name]: value}) } : row));
  };

  const handleEdit = (rowId) => {
    props.taxDiscount.setTaxDiscount(props.taxDiscount.taxDiscount.map(row => row.rowId === rowId ? { ...row, isEditing: true } : row));
  };

  const handleSave = (rowId) => {
    props.taxDiscount.setTaxDiscount(props.taxDiscount.taxDiscount.map(row => row.rowId === rowId ? { ...row,  isEditing: false } : row));
  };

  const handleDelete = (rowId) => {
    props.taxDiscount.setTaxDiscount(props.taxDiscount.taxDiscount.filter(row => row.rowId !== rowId));
  };

  return (
    <div className="container mt-4">

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
          {props.taxDiscount.taxDiscount.map(row => (
            <tr key={row.rowId}>
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
                <button onClick={() => handleDelete(row.rowId)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddRow} className="btn btn-primary mb-3">Add Row</button>
      <button onClick={() => {
        console.log('this is data', props.taxDiscount.taxDiscount)
      }} className="btn btn-primary mb-3">Check Data</button>
           
    </div>
  );
}

export default TaxDiscountTable;
