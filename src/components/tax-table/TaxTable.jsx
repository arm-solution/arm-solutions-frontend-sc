import React, { useState } from 'react';
import './TaxTable.css';

const TaxTable = ({ columns }) => {
    const [rows, setRows] = useState([]);
    const [nextRowId, setNextRowId] = useState(1);
  
    const handleAddRow = () => {
      const newRow = columns.reduce((acc, column) => {
        acc[column.accessor] = '';
        return acc;
      }, { rowId: nextRowId, isEditing: true });
  
      setRows([...rows, newRow]);
      setNextRowId(nextRowId + 1);
    };
  
    const handleChange = (rowId, e) => {
      const { name, value } = e.target;
      setRows(rows.map(row => row.rowId === rowId ? { ...row, [name]: value } : row));
    };
  
    const handleEdit = (rowId) => {
      setRows(rows.map(row => row.rowId === rowId ? { ...row, isEditing: true } : row));
    };
  
    const handleSave = (rowId) => {
      setRows(rows.map(row => row.rowId === rowId ? { ...row, isEditing: false } : row));
    };
  
    const handleDelete = (rowId) => {
      setRows(rows.filter(row => row.rowId !== rowId));
    };
  
    return (
      <div className="container mt-4">
        
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.header}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.rowId}>
                {columns.map((column, index) => (
                  <td key={index}>
                    <input
                      type="text"
                      name={column.accessor}
                      value={row[column.accessor]}
                      onChange={(e) => handleChange(row.rowId, e)}
                      disabled={!row.isEditing}
                      className="form-control"
                    />
                  </td>
                ))}
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
      </div>
    );
}

export default TaxTable