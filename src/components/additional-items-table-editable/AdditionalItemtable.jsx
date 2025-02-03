import React, { useState, useEffect, useRef } from 'react'
import './AdditionalItems.css'

const AdditionalItemtable = (props) => {
  const [nextRowId, setNextRowId] = useState(1);
  const [initialized, setInitialized] = useState(false); // To prevent reinitializing rows on each render
  const [getTotalTax, setGetTotalTax] = useState(0);
  const [totalEditable, setTotalEditable] = useState(true);

  const prevItemsRef = useRef(props.additionalState.addtionalItems);

  const handleAddRow = () => {
    const newRow = {
      rowId: nextRowId,
      title: "",
      quantity: 0,
      item_total: 0,
      option_type: "additional",
      unit: 0,
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
      props.additionalState.addtionalItems.map((row) =>
        row.rowId === rowId
          ? {
              ...row,
              [name]: value,
              item_total: props.actions.calculateTaxDiscount({
                ...row,
                [name]: value,
              }),
            }
          : row
      )
    );
  };

  const handleEdit = (rowId) => {
    props.additionalState.setAddtionalItems(
      props.additionalState.addtionalItems.map((row) =>
        row.rowId === rowId ? { ...row, isEditing: true } : row
      )
    );
  };

  useEffect(() => {
    if (JSON.stringify(prevItemsRef.current) === JSON.stringify(props.additionalState.addtionalItems)) {
      return;
    }

    prevItemsRef.current = props.additionalState.addtionalItems;

    const totalItemAmount = props.additionalState.addtionalItems.reduce((sum, item) => sum + item.item_total, 0);

    props.totalAmountref.setTotalAmountref((pre) => pre + totalItemAmount);
  }, [props.additionalState.addtionalItems]);

  const handleSave = (rowId) => {
    const row = props.additionalState.addtionalItems.find((row) => row.rowId === rowId);

    if (!row) return;

    const quantity = parseFloat(row.quantity);
    const price = parseFloat(row.price);

    if (quantity <= 0 || price <= 0) {
      console.error("Required: Quantity and Price must be valid");
      return;
    }

    const totalItem = row.unit === "person" ? 0 : quantity * price;

    if (row.item_total === totalItem && row.isEditing === false) {
      return;
    }

    props.additionalState.setAddtionalItems(
      props.additionalState.addtionalItems.map((item) =>
        item.rowId === rowId
          ? { ...item, item_total: totalItem, isEditing: false, isSaved: true }
          : item
      )
    );
  };


  const handleDelete = (rowId, row) => {
    
    let updateData;
    
    // if row id exist it means the data is from the mysql database
    if(row.id) {

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