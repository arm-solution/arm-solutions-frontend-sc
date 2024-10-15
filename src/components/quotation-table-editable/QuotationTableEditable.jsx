import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { errorDialog } from '../../customs/global/alertDialog';
import { useDispatch } from 'react-redux';
import { deleteProposalItem, deleteProposalItems } from '../../store/features/proposalItemSlice';
import { deleteConfirmation } from '../../customs/global/alertDialog'; 
import './QoutationTableEditable.css';


const QoutationTableEditable = (props) => {

    const [inputAccessNumDays, setInputAccessNumDays] = useState(false);
    const [products, setProducts] = useState([]);
    const [productItemDetails, setProductItemDetails] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);

    const dispatch = useDispatch();

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
    

    // activating getting sessionStorage and set to product details state
    useEffect(() => {
        const fetchFromSession = () => {
          const proposalDetails = sessionStorage.getItem('proposalDetails');
      
          if (proposalDetails) {
            const { quotationItem: quotationItemData } = JSON.parse(proposalDetails);
            const setAmount = quotationItemData.map(d => ({
                ...d,
                amount: parseInt(d.qty) * parseInt(d.base_price)
            }))
           
            setProductItemDetails(setAmount)
            const totalItemAmount = setAmount.reduce((sum, item) => sum + item.amount, 0)
            props.setTotalAmountref(parseInt(totalItemAmount))
          }
        };
      
        // Fetch the session storage data on component mount
        fetchFromSession();
      
        // Add event listener for 'sessionUpdated' (if needed to listen to updates)
        const handleSessionUpdate = () => {
          fetchFromSession();
        };
        window.addEventListener('sessionUpdated', handleSessionUpdate);
      
        // Clean up event listener when the component unmounts
        return () => {
          window.removeEventListener('sessionUpdated', handleSessionUpdate);
        };
    }, []);  // Empty dependency array ensures it runs once on mount



    // calculate the total amount
    const calculateAmount = (row) => {
        // Convert all relevant fields to numbers
        const basePrice = parseFloat(row.base_price) || 0;
        const quantity = parseInt(row.qty, 10) || 0; // Changed to `qty`
        const numberOfDays = parseInt(row.number_of_days, 10) || 0;
    
        return row.name === 'Man Power'
            ? basePrice * quantity * numberOfDays
            : basePrice * quantity;
    };
    
    const handleInputChange = (e, id) => {
        const { value, name } = e.target;
    
        // Update the field first
        setProductItemDetails(prevDetails => {
            const updatedDetails = prevDetails.map(row =>
                row.id === id
                    ? {
                        ...row,
                        [name]: value, // Update the field first
                        amount: calculateAmount({ ...row, [name]: value }) // Recalculate amount
                    }
                    : row
            );
    
            return updatedDetails;
        });
    };
    
    
    // adding row template in the table
    const addRow = () => {
        setProductItemDetails([...productItemDetails, { id: 0, proposal_id: 0,  name: '', category_name: '', qty: 0, unit: '', number_of_days: 0, price: 0, amount: 0, isEditing: true }]);
    };

    // delete row in the table 
    const deleteRow = (id, item_id) => {
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
    
            let updatedDetails;
    
            // checking if id from the database is exist
            if(item_id) {
                const { payload } = await dispatch(deleteProposalItem(item_id));
                const result = payload.affectedRows > 0 ? true : false;
                if (result) {
                    updatedDetails = productItemDetails.filter(row => row.id !== id);
                }

            } else {
                updatedDetails = productItemDetails.filter(row => row.id !== id);
            }
    
            // Updating state and then calculating total amount
            if (updatedDetails) {
                setProductItemDetails(updatedDetails);
                const totalItemAmount = updatedDetails.reduce((sum, item) => sum + item.amount, 0)
                props.totalAmount.setTotalAmount(totalItemAmount);
                props.setTotalAmountref(totalItemAmount)
                return true;
            }
        });
    };

    // save and edit row
    const toggleSaveAndEdit = (id) => {

       const checkProduct = productItemDetails.find(p => parseInt(p.qty) === 0 || p.name === '');
       const totalItemAmount = productItemDetails.reduce((sum, item) => sum + item.amount, 0)
       props.totalAmount.setTotalAmount(totalItemAmount)
       props.setTotalAmountref(totalItemAmount)
       const getproductItemDetails = productItemDetails.find(d => d.id === id);

       if(getproductItemDetails.name !== 'Man Power') {
        setInputAccessNumDays(true);
       }
       
       if(checkProduct) {
           errorDialog("All Fields Are Required")
           return;
        }
        
        // reshaping data
        const updatedQoutationItems = productItemDetails.map(data => ({
            proposal_id: 0,
            product_id: data.id,
            quantity: parseInt(data.qty),
            price: parseInt(data.base_price),
            proposal_item_id: data.proposal_item_id | 0,
            sku: data.sku
        }));

    // this is the state  that going to save to database 
    // on QoutationForm jsx
     props.setQoutationItem(updatedQoutationItems);
        
    // saving another row on the table
        setProductItemDetails(prevDetails => prevDetails.map(row =>
            row.id === id ? { ...row, isEditing: !row.isEditing } : row
        ));

    };

    // handle product onchange select dropdown
    const handleProduct = (e, rowId) => {
        const selectedProductId = parseInt(e.target.value);
        const selectedProduct = products.find(product => product.id === selectedProductId);

        const productExist = productItemDetails.find(p => p.id === selectedProductId);

        if(selectedProduct.name === 'Man Power') {
            setInputAccessNumDays(false)
        } else {
            setInputAccessNumDays(true)
        }

        if (productExist) {
            props.setNotification({
                    message: 'Product Already Exist on the Table',
                    type: 'error'
            })
            return;
        }

        setProductItemDetails(prevDetails => prevDetails.map(row => 
            row.id === rowId ? { ...row, ...selectedProduct, isEditing: true } : row
        
        ));

    };

    const anyRowEditing = productItemDetails.some(row => row.isEditing);

    const screenMobile = () => {
        if(window.innerWidth < 900){
            return true
        } else {
            return false
        }
    }
    
    const handleCheckbox = (rowId, item_id, e) => {

        if(e.target.checked) {
            if(rowId > 0) {
                setSelectedRow(pre => [...pre, rowId]);
            }
            if(item_id) {
                setSelectedIds(pre => [...pre, item_id])
            }
        } else {
            setSelectedIds(prev => prev.filter(itemId => itemId !== item_id));
            setSelectedRow(prev => prev.filter(rowID => rowID !== rowId));
        }
    }

    const deleteCheckedItems = () => {

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
            const response = await dispatch(deleteProposalItems(selectedIds))
            
            if(response.payload.success) {
                setProductItemDetails(productItemDetails.filter(row => !selectedRow.includes(row.id)));
                return true;
            } else {
                return false;
            }
           
        })

    }


    return (
        <div className="table-editable-container">

          <div className="container mt-4">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Item#</th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Qty</th>
                       { !screenMobile() && <th>Unit</th> }
                        <th>No. Days</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {productItemDetails.map((row, index) => (
                        <tr key={index}>
                            
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>

                            <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" onChange={(e) => handleCheckbox(row.id, row.proposal_item_id, e)} style={{ border: '1px solid black'}} />
         
                            </td>
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
                                        onChange={(e) => handleInputChange(e, row.id)}
                                    />
                                ) : (
                                    row.qty
                                )}
                            </td>
                            { !screenMobile() && <td>{row.unit}</td> }

                                <td>
                                 {row.isEditing ? (
                                     <input
                                         type="number"
                                         className="form-control"
                                         value={row.number_of_days || ''}
                                         name='number_of_days'
                                         onChange={(e) => handleInputChange(e, row.id)}
                                         disabled={inputAccessNumDays}
                                     />
                                 ) : (
                                     row.number_of_days
                                 )}

                                </td>

                            {/* <td>{row.base_price | 0}</td> */}
                            <td>
                                <input type="text"
                                value={ row.base_price | 0 }
                                name='base_price' 
                                onChange={(e) => handleInputChange(e, row.id)}
                                className="form-control" 
                                />
                            </td>
                            <td>{row.amount | 0}</td>
                            <td>
                                {row.isEditing ? (
                                    <button className="btn btn-success btn-sm" onClick={() => toggleSaveAndEdit(row.id)}>Save</button>
                                ) : (
                                    <button className="btn btn-primary btn-sm" onClick={() => toggleSaveAndEdit(row.id)}>Edit</button>
                                )}
                                <button className="btn btn-danger ms-2 btn-sm" onClick={() => deleteRow(row.id, row.proposal_item_id)} disabled={selectedIds.length}>Delete</button>
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
            { selectedIds.length ? (
                <button className="btn btn-danger m-2" onClick={deleteCheckedItems}>Delete</button>
            ): ''}
        </div>
        </div>

    );
}

export default QoutationTableEditable;
