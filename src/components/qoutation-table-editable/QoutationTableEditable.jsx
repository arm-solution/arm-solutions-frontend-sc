import React, {useState } from 'react';
import './QoutationTableEditable.css';

const QoutationTableEditable = () => {
    const [data, setData] = useState([
        { id: 1, name: 'John Doe', age: 28, qty: 0, unit: 1, price: 1, amount: 2, isEditing: false },

    ]);

    const handleInputChange = (e, id, field) => {
        const value = e.target.value;
        setData(prevData => prevData.map(row => 
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    const addRow = () => {
        const newRow = { id: Date.now(), name: '', age: '', isEditing: true };
        setData([...data, newRow]);
    };

    const deleteRow = (id) => {
        setData(data.filter(row => row.id !== id));
    };

    const toggleEdit = (id) => {
        setData(prevData => prevData.map(row =>
            row.id === id ? { ...row, isEditing: !row.isEditing } : row
        ));
    };

    return (
        <div className="container mt-4">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Item#</th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Qty</th>
                        <th>Unit</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(row => (
                        <tr key={row.id}>
                            <td>
                                {row.isEditing ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={row.name}
                                        onChange={(e) => handleInputChange(e, row.id, 'name')}
                                    />
                                ) : (
                                    row.name
                                )}
                            </td>
                            <td>
                                {row.isEditing ? (
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={row.age}
                                        onChange={(e) => handleInputChange(e, row.id, 'age')}
                                    />
                                ) : (
                                    row.age
                                )}
                            </td>
                            <td>
                                {row.isEditing ? (
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={row.age}
                                        onChange={(e) => handleInputChange(e, row.id, 'age')}
                                    />
                                ) : (
                                    row.age
                                )}
                            </td>
                            <td>
                                {row.isEditing ? (
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={row.age}
                                        onChange={(e) => handleInputChange(e, row.id, 'age')}
                                    />
                                ) : (
                                    row.age
                                )}
                            </td>
                            <td>
                                {row.isEditing ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={row.age}
                                        onChange={(e) => handleInputChange(e, row.id, 'age')}
                                    />
                                ) : (
                                    row.age
                                )}
                            </td>
                            <td>
                                {row.isEditing ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={row.age}
                                        onChange={(e) => handleInputChange(e, row.id, 'age')}
                                    />
                                ) : (
                                    row.age
                                )}
                            </td>
                            <td>
                                {row.isEditing ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={row.age}
                                        onChange={(e) => handleInputChange(e, row.id, 'age')}
                                    />
                                ) : (
                                    row.age
                                )}
                            </td>
                            <td>
                                {row.isEditing ? (
                                    <button className="btn btn-success btn-sm" onClick={() => toggleEdit(row.id)}>Save</button>
                                ) : (
                                    <button className="btn btn-primary btn-sm" onClick={() => toggleEdit(row.id)}>Edit</button>
                                )}
                                <button className="btn btn-danger ms-2 btn-sm" onClick={() => deleteRow(row.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-primary" onClick={addRow}>Add Row</button>
        </div>
    );
}

export default QoutationTableEditable