import React, { useState, useRef, useEffect } from 'react'
import './AdditionalItems.css'
import { deleteAdditionalById } from '../../store/features/additional.Slice';
import { useDispatch } from 'react-redux';
import { deleteConfirmation } from '../../customs/global/alertDialog';
import { useGlobalRefs } from '../../customs/global/useGlobalRef'; 

const AdditionalItemtable = (props) => {
  const [nextRowId, setNextRowId] = useState(1);
  const [initialized, setInitialized] = useState(false); // To prevent reinitializing rows on each render

  const [checkPreValue, setCheckPreValue] = useState([]);

  const dispatch = useDispatch();

  const { preAdditionalRef } = useGlobalRefs();
  
  const handleAddRow = () => {
    const newRow = {
      rowId: nextRowId, // Keep auto-incrementing for new rows
      title: "",
      quantity: 0,
      item_total: 0,
      unit: "",
      price: 0,
      proposal_id: 0,
      isEditing: true,
    };

    props.additionalState.setAddtionalItems([
      ...props.additionalState.addtionalItems,
      newRow
    ]);

    setNextRowId(nextRowId + 1);
  };
  
  useEffect(() => {
    const fetchFromSession = () => {
      const proposalDetails = sessionStorage.getItem("proposalDetails");

      if (proposalDetails && !initialized) {
        const { additionalItems } = JSON.parse(proposalDetails);

        // Ensure database items use their ID as rowId
        const updatedItems = additionalItems.map((item) => ({
          ...item,
          rowId: item.id, // Replace rowId with actual database ID
        }));

        props.additionalState.setAddtionalItems(updatedItems); 

        // Determine the next rowId based on the highest existing rowId
        const maxId = Math.max(...updatedItems.map((item) => item.rowId), 0);
        setNextRowId(maxId + 1);

        setInitialized(true);
      }
    };

    fetchFromSession();

    // Listen for session updates
    const handleSessionUpdate = () => {
      fetchFromSession();
    };
    window.addEventListener("sessionUpdated", handleSessionUpdate);

    return () => {
      window.removeEventListener("sessionUpdated", handleSessionUpdate);
    };
  }, []);

  // calculate the item total amount
  const calculateAmount = (row) => {
    const basePrice = parseFloat(row.price) || 0;
    const quantity = parseInt(row.quantity, 10) || 0;
    return basePrice * quantity;
  };

  const handleChange = (rowId, e) => {
    const { name, value } = e.target;

    const updatedItems = props.additionalState.addtionalItems.map(row => {
      if (row.rowId !== rowId) return row;

      const updatedRow = { ...row, [name]: value };

      if (updatedRow.unit === "person") {
        return { ...updatedRow, item_total: parseInt(updatedRow.item_total, 10) || 0 };
      }

      return { ...updatedRow, item_total: calculateAmount({ ...row, [name]: value }) };
    });

    props.additionalState.setAddtionalItems(updatedItems);
  };

  const handleEdit = (rowId) => {
    setCheckPreValue(
      props.additionalState.addtionalItems.map((row) =>
        row.rowId === rowId ? { ...row, isEditing: true } : row
      )
    );

    props.additionalState.setAddtionalItems(
      props.additionalState.addtionalItems.map((row) =>
        row.rowId === rowId ? { ...row, isEditing: true } : row
      )
    );
  };

  const handleSave = (rowId) => {
    const rowTest = props.additionalState.addtionalItems.find((row) => row.rowId === rowId);
    const proposalDetails = sessionStorage.getItem("proposalDetails");

    if (!rowTest) return;

    if (!rowTest.title || rowTest.quantity <= 0 || !rowTest.unit) {
      alert("All fields are required");
      return;
    }

    const prevTable1Total = preAdditionalRef.current.reduce((sum, item) => sum + item.item_total, 0) || 0;
    const newTable1Total = props.additionalState.addtionalItems.reduce((sum, item) => sum + item.item_total, 0) || 0;
    const table1Diff = newTable1Total - prevTable1Total;

    preAdditionalRef.current = [...props.additionalState.addtionalItems];

    const updatedItems = props.additionalState.addtionalItems.map((item) =>
      item.rowId === rowId ? { ...item, isEditing: false, isSaved: true } : item
    );

    props.additionalState.setAddtionalItems(updatedItems);

    if (table1Diff !== 0) {
      props.computeTotalProposal(updatedItems);
    }
  };

  const handleDelete = (rowId, row) => {
    deleteConfirmation({
      title: "",
      text: "",
      icon: "",
      confirmButtonText: "",
      cancelButtonText: "",
      deleteTitle: "",
      deleteText: "",
      successTitle: "", 
      successText: ""
    }, async () => {

      let updateData;

      if(row.id) {
        // const { payload } = await dispatch(deleteAdditionalById(row.id));

        props.setDataTotDelete(prev => ({
          ...prev,
          additionalItems: [...prev.additionalItems, row.id]
        }))

          updateData = props.additionalState.addtionalItems.filter(row => row.id !== rowId);
        
      } else {
        updateData = props.additionalState.addtionalItems.filter(row => row.rowId !== rowId);
      }

      if(updateData) {
        props.additionalState.setAddtionalItems(updateData);
        preAdditionalRef.current = [...updateData];
        props.computeTotalProposal(updateData);

        return true; 
      }
    });
  };

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
                  disabled={row.unit !== "person" || !row.isEditing}
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
    </div>
  );
}

export default AdditionalItemtable;
