import React, { useState } from 'react';
import { errorDialog } from '../../customs/global/alertDialog';
import './AdditionalItems.css';

const AdditionalItems = () => {
  const [additionalQ, setAdditionalQ] = useState([]);
  const [nextRowId, setNextRowId] = useState(1);

  const handleAddRow = () => {
    const newRow = {
      rowId: nextRowId,
      title: '',
      amount: 0,
      item_total: 0,
      isEditing: true,
    };
    setAdditionalQ([...additionalQ, newRow]);
    setNextRowId(nextRowId + 1);
  };

  const handleInputChange = (rowId, fieldName, value) => {
    setAdditionalQ((prevRows) =>
      prevRows.map((row) =>
        row.rowId === rowId
          ? {
              ...row,
              [fieldName]: value,
              item_total: fieldName === 'amount' ? parseFloat(value) || 0 : row.item_total,
            }
          : row
      )
    );
  };

  const calculateAllRowsTotal = (rows) => {
    return rows.reduce((sum, row) => sum + parseFloat(row.amount || 0), 0);
  };

  const handleSave = (rowId) => {
    const rowToSave = additionalQ.find((row) => row.rowId === rowId);
    const totalAmountAllRows = calculateAllRowsTotal(additionalQ);
    if (!rowToSave.title || parseFloat(rowToSave.amount) === 0) {
      errorDialog('All Fields Are Required');
      return;
    }

    console.log("total all rows", totalAmountAllRows);
    setAdditionalQ((prevRows) =>
      prevRows.map((row) =>
        row.rowId === rowId ? { ...row, isEditing: false } : row
      )
    );
  };

  const handleEdit = (rowId) => {
    setAdditionalQ((prevRows) =>
      prevRows.map((row) =>
        row.rowId === rowId ? { ...row, isEditing: true } : row
      )
    );
  };

  return (
    <div className="container mt-4 additonalItemsTable">
      <h5 className="text-muted">Additional Items</h5>
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
          {additionalQ.map((row) => (
            <tr key={row.rowId}>
              <td>
                <input
                  type="text"
                  name="title"
                  value={row.title}
                  onChange={(e) =>
                    handleInputChange(row.rowId, 'title', e.target.value)
                  }
                  className="form-control form-control-sm"
                  disabled={!row.isEditing}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="amount"
                  value={row.amount}
                  onChange={(e) =>
                    handleInputChange(row.rowId, 'amount', e.target.value)
                  }
                  className="form-control form-control-sm"
                  disabled={!row.isEditing}
                />
              </td>
              <td>{row.item_total}</td>
              <td>
                {row.isEditing ? (
                  <button
                    className="btn btn-success btn-sm m-2 mb-0 mt-0"
                    onClick={() => handleSave(row.rowId)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-sm m-2 mb-0 mt-0"
                    onClick={() => handleEdit(row.rowId)}
                  >
                    Edit
                  </button>
                )}
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-primary btn-sm" onClick={handleAddRow}>
        Add Row
      </button>
    </div>
  );
};

export default AdditionalItems;
