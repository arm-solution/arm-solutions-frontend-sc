import React, { useState, useRef, useEffect } from 'react'
import './AdditionalItems.css'
import { deleteAdditionalById } from '../../store/features/additional.Slice';
import { useDispatch } from 'react-redux';
import { deleteConfirmation } from '../../customs/global/alertDialog';

const AdditionalItemtable = (props) => {
  const [nextRowId, setNextRowId] = useState(1);
    const [initialized, setInitialized] = useState(false); // To prevent reinitializing rows on each render

  const [checkPreValue, setCheckPreValue] = useState([]);

  const [additionalTest, setAdditionalTest] = useState([])
  
  const prevAddidionalRef = useRef(additionalTest);

  const dispatch = useDispatch();
  
  
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
  
    setAdditionalTest([...additionalTest, newRow]);
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
  
        setAdditionalTest(updatedItems);
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
      // Convert all relevant fields to numbers
      const basePrice = parseFloat(row.price) || 0;
      const quantity = parseInt(row.quantity, 10) || 0; // Changed to `qty`
    
      return basePrice * quantity;
  };


  const handleChange = (rowId, e) => {
    const { name, value } = e.target;

    setAdditionalTest(prevDetails => {
        return prevDetails.map(row => {
            if (row.rowId !== rowId) return row;

            const updatedRow = { ...row, [name]: value };

            if (updatedRow.unit === "person") {
                return { ...updatedRow, item_total: parseInt(updatedRow.item_total, 10) || 0 };
            }

            return { ...updatedRow, item_total: calculateAmount({ ...row, [name]: value }) };
        });
    });
};
  
  
  const handleEdit = (rowId) => {
    setCheckPreValue(
      props.additionalState.addtionalItems.map((row) =>
        row.rowId === rowId ? { ...row, isEditing: true } : row
      )
    )

    // for testing
    setAdditionalTest(
      additionalTest.map((row) => 
        row.rowId === rowId ? { ...row, isEditing: true } : row
      )
    )
    // end
  };

  // const deepEqual = (obj1, obj2) => {
  //   return JSON.stringify(obj1, Object.keys(obj1).sort()) === JSON.stringify(obj2, Object.keys(obj2).sort());
  // }


  const handleSave = (rowId) => {

    // for testing
    const rowTest = additionalTest.find((row) => row.rowId === rowId);

    if (!rowTest) return;

    if(rowTest.title === "" || rowTest.quantity <= 0 || rowTest.unit === "" || rowTest.quantity <= 0) {
      alert("All fields are required");
      return; 
    }
    if(rowTest.title === "" || rowTest.quantity <= 0 || rowTest.unit === "" || rowTest.quantity <= 0) {
      alert("All fields are required");
      return; 
    }

    let prevTotal = prevAddidionalRef.current.reduce((sum, item) => sum + item.item_total, 0) || 0;
    let newTotal = additionalTest.reduce((sum, item) => sum + item.item_total, 0) || 0;

    const diff = newTotal - prevTotal;

    // props.totalAmountref.setTotalAmountref(pre => pre + diff);
    props.setTotalAmount(pre => pre + diff);

    // Update the row
    prevAddidionalRef.current = [...additionalTest];

    const updatedItemsTest = additionalTest.map((item) =>
      item.rowId === rowId
        ? { 
            ...item, 
            isEditing: false, 
            isSaved: true 
          }
        : item
    );

    setAdditionalTest(updatedItemsTest);
  
    if(JSON.stringify(props.additionalState.addtionalItems) !== JSON.stringify(additionalTest)) {  
      props.additionalState.setAddtionalItems(updatedItemsTest);
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
    
          // if row id exist it means the data is from the mysql database
          if(row.id) {
            const { payload } = await dispatch(deleteAdditionalById(row.id));

            if(payload.success) {
              updateData = additionalTest.filter(row => row.id !== rowId);
            }
          } else {
             updateData = additionalTest.filter(row => row.rowId !== rowId);
          }
      
          if(updateData) {
            setAdditionalTest(updateData);
            // const totalAmount = updateData.reduce((sum, item) => sum + item.item_total, 0)
            props.setTotalAmount(pre => parseFloat(pre) - parseFloat(row.item_total));
            // props.totalAmountref.setTotalAmountref(pre => parseFloat(pre) - parseFloat(row.item_total));

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
        {additionalTest.map((row, index) => (
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
  </div>
  )
}

export default AdditionalItemtable