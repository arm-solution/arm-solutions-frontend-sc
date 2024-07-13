import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { errorDialog } from '../../customs/global/alertDialog';
import './QoutationTableEditable.css';
import { useScreenWidth } from '../../customs/global/forMobile';


const QoutationTableEditable = (props) => {
    const [products, setProducts] = useState([]);
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`);
                setProducts(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e, id, field) => {
        const value = e.target.value;
        setProductDetails(prevDetails => prevDetails.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    const addRow = () => {
        const newId = productDetails.length > 0 ? productDetails[productDetails.length - 1].id + 1 : 1;
        setProductDetails([...productDetails, { id: 0, name: '', category_name: '', qty: 0, unit: '', price: 0, amount: 0, isEditing: true }]);
    };

    const deleteRow = (id) => {
        setProductDetails(productDetails.filter(row => row.id !== id));
    };

    const toggleSaveAndEdit = (id) => {

       const checkProduct = productDetails.find(p => parseInt(p.qty) === 0 || p.name === '')

       console.log(productDetails);

       if(checkProduct) {
        errorDialog("All Fields Are Required")

        return;
       }

        setProductDetails(prevDetails => prevDetails.map(row =>
            row.id === id ? { ...row, isEditing: !row.isEditing } : row
        ));
    };

    const handleProduct = (e, rowId) => {
        const selectedProductId = parseInt(e.target.value);
        const selectedProduct = products.find(product => product.id === selectedProductId);

        const productExist = productDetails.find(p => p.id === selectedProductId);

        if (productExist) {
            alert('Product already exists in the table.');
            return;
        }

        setProductDetails(prevDetails => prevDetails.map(row =>
            row.id === rowId ? { ...row, ...selectedProduct, isEditing: true } : row
        ));
    };

    const anyRowEditing = productDetails.some(row => row.isEditing);

    const screenMobile = () => {
        if(window.innerWidth < 900){
            return true
        } else {
            return false
        }
    }

    return (
        <div className="table-editable-container">

          <div className="container mt-4">
            <table className="table table-bordered">
                <thead>
                    <tr>
                    { !screenMobile() && <th>Item#</th> }
                        <th>Product</th>
                        <th>Category</th>
                        <th>Qty</th>
                    { !screenMobile() && <th>Unit</th> }
                        <th>Price</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {productDetails.map((row, index) => (
                        <tr key={index}>
                            { !screenMobile() && <td>{index + 1}</td>}
                            <td>
                                {row.isEditing ? (
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        defaultValue='0'
                                        onChange={(e) => handleProduct(e, row.id)}
                                    >
                                        <option value='0' disabled>Products</option>
                                        {products.map(product => (
                                            <option key={product.id} value={product.id}>{product.name}</option>
                                        ))}
                                    </select>
                                ) : (
                                    row.name
                                )}
                            </td>
                            <td>{row.category_name}</td>
                            <td>
                                {row.isEditing ? (
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={row.qty}
                                        onChange={(e) => handleInputChange(e, row.id, 'qty')}
                                    />
                                ) : (
                                    row.qty
                                )}
                            </td>
                            { !screenMobile() && <td>{row.unit}</td> }
                            <td>{row.price}</td>
                            <td>{row.qty * row.price}</td>
                            <td>
                                {row.isEditing ? (
                                    <button className="btn btn-success btn-sm" onClick={() => toggleSaveAndEdit(row.id)}>Save</button>
                                ) : (
                                    <button className="btn btn-primary btn-sm" onClick={() => toggleSaveAndEdit(row.id)}>Edit</button>
                                )}
                                <button className="btn btn-danger ms-2 btn-sm" onClick={() => deleteRow(row.id)}>Delete</button>
                            </td>
                        </tr>

                        
                    ))}
                </tbody>
            </table>
            <button
                className="btn btn-primary"
                onClick={addRow}
                disabled={anyRowEditing}
            >
                Add Item
            </button>
        </div>
        </div>

    );
}

export default QoutationTableEditable;
