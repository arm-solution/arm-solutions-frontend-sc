import React, { useState, useEffect, useRef } from 'react'
import './AdditionalItems.css'

const AdditionalItemtable = (props) => {
  const [nextRowId, setNextRowId] = useState(1);

  const [checkPreValue, setCheckPreValue] = useState([]);

  const additionalItemRef = useRef(props.additionalState.addtionalItems);

  const handleAddRow = () => {
    const newRow = {
      rowId: nextRowId,
      title: "",
      quantity: 0,
      item_total: 0,
      option_type: "additional",
      unit: "",
      price: 0,
      proposal_id: 0,
      isEditing: true,
    };

    props.additionalState.setAddtionalItems([
      ...props.additionalState.addtionalItems,
      newRow,
    ]);
    setNextRowId(nextRowId + 1);
  };

  const handleChange = (rowId, e) => {
    const { name, value } = e.target;
  
    props.additionalState.setAddtionalItems(
      props.additionalState.addtionalItems.map((row) => {
        if (row.rowId !== rowId) return row;
  
        const updatedRow = { ...row, [name]: value };
  
        // ✅ If the field being changed is "unit" and it's "person", retain the current item_total
        if (name === "unit" && value === "person") {
          return updatedRow; // Keep existing item_total
        }
  
        // ✅ If unit is "person", do not overwrite item_total (allow manual input)
        if (updatedRow.unit === "person") {
          return updatedRow;
        }
  
        // ✅ Otherwise, compute item_total automatically
        return {
          ...updatedRow,
          item_total: props.actions.calculateTaxDiscount(updatedRow),
        };
      })
    );
  };
  
  const handleEdit = (rowId) => {
    setCheckPreValue(
      props.additionalState.addtionalItems.map((row) =>
        row.rowId === rowId ? { ...row, isEditing: true } : row
      )
    )

    props.additionalState.setAddtionalItems(
      props.additionalState.addtionalItems.map((row) =>
        row.rowId === rowId ? { ...row, isEditing: true } : row
      )
    );
  };


  const handleSave = (rowId) => {
    const row = props.additionalState.addtionalItems.find((row) => row.rowId === rowId);
    if (!row) return;

    if(row.title === "" || row.quantity <= 0 || row.unit === "" || row.quantity <= 0) {
      alert("All fields are required");
      return;
    }

  
    // Ensure values are valid numbers
    const quantity = parseFloat(row.quantity) || 0;
    const price = parseFloat(row.price) || 0;
  
    // Compute the new total
    const newTotalItem = row.unit === "person" ? row.item_total : quantity * price;
  
    // Update the row
    const updatedItems = props.additionalState.addtionalItems.map((item) =>
      item.rowId === rowId
        ? { 
            ...item, 
            item_total: newTotalItem, // Ensure item_total is updated
            isEditing: false, 
            isSaved: true 
          }
        : item
    );
  
    // Update the state
    props.additionalState.setAddtionalItems(updatedItems);
  
    if(JSON.stringify(checkPreValue) !== JSON.stringify(props.additionalState.addtionalItems)) {  
      // Use the computed value instead of row.item_total
      props.setTotalAmount((prev) => parseFloat(prev) + newTotalItem);
      props.totalAmountref.setTotalAmountref((prev) => parseFloat(prev) + newTotalItem);
    } 

  };
  

const handleDelete = (rowId, row) => {
    
    let updateData;
    
    // if row id exist it means the data is from the mysql database
    if(row.id) {
      // execute delete dispatch
    } else {
      updateData = props.additionalState.addtionalItems.filter(row => row.rowId !== rowId);
    }

    if(updateData) {
      props.additionalState.setAddtionalItems(updateData);
      // const totalAmount = updateData.reduce((sum, item) => sum + item.item_total, 0)
      props.setTotalAmount(pre => parseFloat(pre) - parseFloat(row.item_total));
      props.totalAmountref.setTotalAmountref(pre => parseFloat(pre) - parseFloat(row.item_total));
    }

  };


  const checkData = () => {
    const additionalFinel = props.additionalState.addtionalItems.map(({ isEditing, isSaved, item_total, rowId, ...rest }) => ({
      ...rest,
      total: item_total,
      proposal_id: parseInt(0), 
    }));

    console.log("data", additionalFinel)
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
              <select
                className="form-select form-select-sm"
                name="unit"
                value={row.unit}
                onChange={(e) => handleChange(row.rowId, e)}
                disabled={!row.isEditing}
              >
                <option value="" disabled>Units</option>
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
              disabled={row.unit !== "person" || !row.isEditing} // ✅ Only disable if NOT "person"
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
              <button onClick={() => handleDelete(row.rowId, row)} className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <button onClick={handleAddRow} className="btn btn-primary btn-sm mb-3">Add Row</button>
    <button onClick={checkData}>CheckData</button>
  </div>
  )
}

export default AdditionalItemtable