import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { errorDialog } from '../../customs/global/alertDialog';
import './QoutationTableEditable.css';


const QoutationTableEditable = (props) => {
    const [products, setProducts] = useState([]);
    const [productDetails, setProductDetails] = useState([]);

    // calling product api for select options
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


    //  useeffect for edit items
    useEffect(() => {
      setProductDetails(props.proposalItemEdit)
    }, [props.proposalItemEdit])
    

    const handleInputChange = (e, id, field) => {
        const value = e.target.value;

        setProductDetails(prevDetails => prevDetails.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        ));
    };


    // adding row in the table
    const addRow = () => {
        setProductDetails([...productDetails, { id: 0, proposal_id: 0,  name: '', category_name: '', qty: 0, unit: '', price: 0, amount: 0, isEditing: true }]);
    };

    // delete row in the table 
    const deleteRow = (id) => {
        setProductDetails(productDetails.filter(row => row.id !== id));
    };

    // save and edit row
    const toggleSaveAndEdit = (id) => {

       const checkProduct = productDetails.find(p => parseInt(p.qty) === 0 || p.name === '')

       if(checkProduct) {
        errorDialog("All Fields Are Required")

        return;
       }

    // reshaping data
     const updatedQoutationItems = productDetails.map(data => ({
        proposal_id: 0,
        product_id: data.id,
        quantity: parseInt(data.qty),
        price: parseInt(data.base_price),
        proposal_item_id: data.proposal_item_id | 0,
        sku: data.sku
      }));

    
     props.setQoutationItem(updatedQoutationItems);

        setProductDetails(prevDetails => prevDetails.map(row =>
            row.id === id ? { ...row, isEditing: !row.isEditing } : row
        ));
    };

    // handle product onchange select dropdown
    const handleProduct = (e, rowId) => {
        const selectedProductId = parseInt(e.target.value);
        const selectedProduct = products.find(product => product.id === selectedProductId);

        const productExist = productDetails.find(p => p.id === selectedProductId);

        if (productExist) {
            props.setNotification({
                    message: 'Product Already Exist on the Table',
                    type: 'error'
            })
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
                                        name="product_id"
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
                                        name='qty'
                                        onChange={(e) => handleInputChange(e, row.id, 'qty')}
                                    />
                                ) : (
                                    row.qty
                                )}
                            </td>
                            { !screenMobile() && <td>{row.unit}</td> }
                            <td>{row.base_price | 0}</td>
                            <td>{row.qty * row.base_price || 0}</td>
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
