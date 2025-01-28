import React, { useState } from 'react'
import './AdditionalItems.css'

const AdditionalItemtable = (props) => {
  const [nextRowId, setNextRowId] = useState(1);
  const [initialized, setInitialized] = useState(false); // To prevent reinitializing rows on each render
  const [getTotalTax, setGetTotalTax] = useState(0);
  const [totalEditable, setTotalEditable] = useState(true);

  const handleAddRow = () => {
    const newRow = {
      rowId: nextRowId,
      title: '',
      quantity: 0,
      item_total: 0,
      option_type: 'additional',
      unit: 0,
      price: 0,
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
    // Find the row corresponding to the rowId
    const row = props.additionalState.addtionalItems.find(row => row.rowId === rowId);
  
    // Debug: Log the row data
    console.log("Row Data:", row);
  
    // If the row is not found, log an error and exit
    if (!row) {
      console.error("Row not found");
      return;
    }
  
    // Validate quantity and price for the specific row
    const quantity = parseFloat(row.quantity);
    const price = parseFloat(row.price);
  
    if (quantity <= 0 || price <= 0) {
      console.error("Required: Quantity and Price must be valid");
      return;
    }
  
    // Compute totalItem, but skip computation if unit is 'person'
    const totalItem = row.unit === "person" ? 0 : quantity * price;
  
    // Debug: Log the computed totalItem
    console.log("Computed Total Item:", totalItem);
  
    // Update the additional items
    props.additionalState.setAddtionalItems(
      props.additionalState.addtionalItems.map(item =>
        item.rowId === rowId
          ? { ...item, item_total: totalItem, isEditing: false, isSaved: true }
          : item
      )
    );
  
    // Debug: Confirm the update
    console.log("Updated Additional Items:", props.additionalState.addtionalItems);
  };
  
  
  const checkUnit = (e) => {
    e.target.value === 'person' ? setTotalEditable(false) : setTotalEditable(true);
  }

  const checkData = () => {
    console.log("additional items", props.additionalState.addtionalItems)
  }

  return (
    <div className="container mt-4">
    <h4>Additional Items</h4>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Title</th>
          <th>Quantity</th>
          <th>Unit</th>
          <th>Price</th>
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
                type="text"
                name="quantity"
                value={row.quantity}
                onChange={(e) => handleChange(row.rowId, e)}
                disabled={!row.isEditing}
                className="form-control"
              />
            </td>
            <td>
               <select className="form-select form-select-sm" name='unit' aria-label=".form-select-sm example" onChange={(e) => checkUnit(e)}>
                  <option value='0' disabled>units</option>
                   <option value="kg">Kg</option>         
                   <option value="lb">lb</option>         
                   <option value="person">Person</option>         
                </select>
            </td>
            <td>
              <input
                type="number"
                name="price"
                value={row.price}
                onChange={(e) => handleChange(row.rowId, e)}
                disabled={!row.isEditing}
                className="form-control"
              />
            </td>
            <td>
            <input
                type="number"
                name="item_total"
                value={row.item_total}
                onChange={(e) => handleChange(row.rowId, e)}
                disabled={totalEditable}
                className="form-control"
              />
            </td>
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
    <button onClick={checkData}>CheckData</button>
  </div>
  )
}

export default AdditionalItemtable