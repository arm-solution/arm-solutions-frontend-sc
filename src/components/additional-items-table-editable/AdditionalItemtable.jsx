import React, { useState } from 'react'
import './AdditionalItems.css'

const AdditionalItemtable = (props) => {
  const [nextRowId, setNextRowId] = useState(1);
  const [initialized, setInitialized] = useState(false); // To prevent reinitializing rows on each render
 
  const handleAddRow = () => {
    const newRow = {
      rowId: nextRowId,
      title: '',
    //   amount_type: '',
    //   percentage: '',
      item_total: 0,
      option_type: 'additional',
      isEditing: true,
    };

    props.additionalState.setAddtionalItems([...props.additionalState.addtionalItems, newRow]);
    setNextRowId(nextRowId + 1);
  };

  const handleChange = (rowId, e) => {
    const { name, value } = e.target;
    props.additionalState.setAddtionalItems(props.additionalState.addtionalItems.map(row =>
      row.rowId === rowId ? { ...row, [name]: value, item_total: props.actions.calculateTaxDiscount({...row, [name]: value}) } : row
    ));
  };

  const handleEdit = (rowId, row) => {
    props.additionalState.setAddtionalItems(
        props.additionalState.addtionalItems.map(row => row.rowId === rowId ? { ...row, isEditing: true } : row)
    );
  };

  const handleDelete = (rowId, type) => {
    const filteredRows = props.taxDiscount.taxDiscount.filter(row => row.rowId !== rowId);
    props.taxDiscount.setTaxDiscount(filteredRows);

    // const updatedMergedDiscountTax = [...props.mergeDiscountTax.filter(row => !(row.rowId === rowId && row.option_type === type))];
    // const totalTaxDiscount = props.actions.getTotalTax(updatedMergedDiscountTax);

    // props.setTotalAmount(parseFloat(props.totalAmountref) + parseFloat(totalTaxDiscount.tax) - parseFloat(totalTaxDiscount.discount));
  };

  const handleSave = (rowId) => {
    const row = props.additionalState.addtionalItems.find(row => row.rowId === rowId);
    const itemTotal = props.actions.calculateTaxDiscount(row);

    props.additionalState.setAddtionalItems(
        props.additionalState.addtionalItems.map(row =>
        row.rowId === rowId ? { ...row, item_total: itemTotal, isEditing: false, isSaved: true } : row
      )
    );

    // const totalTaxDiscount = props.actions.getTotalTax(props.mergeDiscountTax);

    // props.setTotalAmount(parseFloat(props.totalAmountref) + parseFloat(totalTaxDiscount.additional) - parseFloat(totalTaxDiscount.discount));
  };

  return (
    <div className="container mt-4">
    <h4>Additional Items</h4>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.additionalState.addtionalItems.map((row, index) => (
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
              <button onClick={() => handleDelete(row.rowId, props.type)} className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <button onClick={handleAddRow} className="btn btn-primary mb-3">Add Row</button>
  </div>
  )
}

export default AdditionalItemtable