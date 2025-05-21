import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { errorDialog } from '../../customs/global/alertDialog';
import { useDispatch } from 'react-redux';
import { deleteProposalItem, deleteMultipleProposalItems } from '../../store/features/proposalItemSlice';
import { deleteConfirmation } from '../../customs/global/alertDialog'; 
import './QoutationTableEditable.css';
import { useGlobalRefs } from '../../customs/global/useGlobalRef';
// import FloatNotification from '../../float-notification/FloatNotification';


const QoutationTableEditable = (props) => {

    const [products, setProducts] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [validateNegativeQty, setValidateNegativeQty] = useState(false);

    // for global reference
    const { preProductItemsRef } = useGlobalRefs();
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
    // useEffect(() => {
    //     const fetchFromSession = () => { 
    //       const proposalDetails = sessionStorage.getItem('proposalDetails');
      
    //       if (proposalDetails) {
    //         const { quotationItem: quotationItemData } = JSON.parse(proposalDetails);
    //         const itemsWithComputationAmount = quotationItemData.map(d => ({
    //             ...d,
    //             markup_price: d.base_price,
    //             amount: parseInt(d.qty) * parseInt(d.base_price)
    //         }))
           
    //         props.pid.setProductItemDetails(itemsWithComputationAmount);
    //         // const totalItemAmount = itemsWithComputationAmount.reduce((sum, item) => sum + item.amount, 0)
    //         // props.setTotalAmountref(parseInt(totalItemAmount))
    //       }
    //     };
      
    //     // Fetch the session storage data on component mount
    //     fetchFromSession();
      
    //     // Add event listener for 'sessionUpdated' (if needed to listen to updates)
    //     const handleSessionUpdate = () => {
    //       fetchFromSession();
    //     };
    //     window.addEventListener('sessionUpdated', handleSessionUpdate);
      
    //     // Clean up event listener when the component unmounts
    //     return () => {
    //       window.removeEventListener('sessionUpdated', handleSessionUpdate);
    //     };
    // }, []); 



    // calculate the total amount
    const calculateAmount = (row) => {
        // Convert all relevant fields to numbers
        const basePrice = parseFloat(row.base_price) || 0;
        const quantity = parseInt(row.qty, 10) || 0; // Changed to `qty`
    
        return basePrice * quantity;
    };
    
    const handleInputChange = (e, id) => {
        const { value, name } = e.target;

        if((value <= 0 || value === '' || value == null) && name === 'qty') {
            setValidateNegativeQty(true);
        } else {
            setValidateNegativeQty(false);
        }
        // Update the field first
        props.pid.setProductItemDetails(prevDetails => {
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
        props.pid.setProductItemDetails([...props.pid.productItemDetails, { id: 0, proposal_id: 0,  name: '', category_name: '', qty: 0, unit: '', number_of_days: 0, price: 0, amount: 0, isEditing: true }]);
    };

    // delete row in the table 
    const  deleteRow = (rowId, mysqlId, row) => {

        let updatedDetails;

        if(mysqlId) {
            // collecting data that need to delete
            props.setDataTotDelete(prev => ({
                ...prev,
                quotationItems: [...prev.quotationItems, mysqlId]
            }))

            updatedDetails = props.pid.productItemDetails.filter(row => row.id !== rowId);
        } else {
            updatedDetails = props.pid.productItemDetails.filter(row => row.id !== rowId);
        }

        if (updatedDetails) {
            props.pid.setProductItemDetails(updatedDetails);
            preProductItemsRef.current = [...updatedDetails];
            // const totalItemAmount = updatedDetails.reduce((sum, item) => sum + item.amount, 0)
            props.setTotalAmount(pre => parseFloat(pre) - parseFloat(row.amount));
            props.setTotalAmountref(pre => parseFloat(pre) - parseFloat(row.amount))
        }
        



        // deleteConfirmation({
        //     title: "",
        //     text: "",
        //     icon: "",
        //     confirmButtonText: "",
        //     cancelButtonText: "",
        //     deleteTitle: "",
        //     deleteText: "",
        //     successTitle: "", 
        //     successText: ""
        // }, async () => {
    
        //     let updatedDetails;


    
        //     // // checking if id from the database is exist
        //     if(mysqlId) {
        //         const { payload } = await dispatch(deleteProposalItem(mysqlId));
        //         const result = payload.affectedRows > 0 ? true : false;
        //         if (result) {
        //             updatedDetails = props.pid.productItemDetails.filter(row => row.id !== rowId);
        //         }

        //     } else {
        //         updatedDetails = props.pid.productItemDetails.filter(row => row.id !== rowId);
        //     }
    
        //     // // Updating state and then calculating total amount
        //     if (updatedDetails) {
        //         props.pid.setProductItemDetails(updatedDetails);
        //         preProductItemsRef.current = [...updatedDetails];
        //         // const totalItemAmount = updatedDetails.reduce((sum, item) => sum + item.amount, 0)
        //         props.setTotalAmount(pre => parseFloat(pre) - parseFloat(row.amount));
        //         props.setTotalAmountref(pre => parseFloat(pre) - parseFloat(row.amount))
        //         return true;
        //     }
        // });
    };
    

    // useEffect(() => {

    //     if(props.pid.productItemDetails && props.pid.productItemDetails.length > 0) {
    //     // for testing total
    //     const taxT = props.tax ? props.tax.reduce((sum, item) => sum + (item.item_total || 0), 0) : 0
    //     const discountT = props.tax ? props.discount.reduce((sum, item) => sum + (item.item_total || 0), 0) : 0
    //     const additionalT = props.tax ? props.additional.reduce((sum, item) => sum + (item.item_total || 0), 0) : 0
    //     const productT = props.pid.productItemDetails ? props.pid.productItemDetails.reduce((sum, item) => sum + (item.amount || 0), 0) : 0


    //     console.log("taxT", taxT)
    //     console.log("discountT", discountT)
    //     console.log("additionalT", additionalT)
    //     console.log("productT", productT)

    //     }

    // }, [props.pid.productItemDetails])
    
    

    const toggleSaveAndEdit = (id) => {
        const checkProduct = props.pid.productItemDetails.find(p => parseInt(p.qty) === 0 || p.name === '');
        const proposalDetails = sessionStorage.getItem("proposalDetails");
        const proposalItemsFromDbTotal = JSON.parse(proposalDetails) ? JSON.parse(proposalDetails).quotationItem.reduce((sum, item) => sum + item.item_total, 0) || 0 : 0;
        
        if (checkProduct) {
            errorDialog("All Fields Are Required");
            return;
        }

        const updatedDetails = props.pid.productItemDetails.map(data => ({
            ...data,
            amount: parseInt(data.qty) * parseInt(data.base_price)
        }));
    
        props.pid.setProductItemDetails(updatedDetails);
    
        // ✅ Initialize reference if undefined
        if (!preProductItemsRef.current || !Array.isArray(preProductItemsRef.current)) {
            preProductItemsRef.current = [];
        }
    
        // ✅ Preserve previous total correctly
        const prevProductTotal = preProductItemsRef.current.reduce((sum, item) => sum + (item.amount || 0), 0);
        const newProductTotal = updatedDetails.reduce((sum, item) => sum + (item.amount || 0), 0);
        const table2Diff = newProductTotal - prevProductTotal;

    
        // ✅ Accumulate the total correctly
        // props.setTotalAmount(prev => {
        //     const getDiff = JSON.parse(proposalDetails) ? prev - proposalItemsFromDbTotal : 0;
        //     return  ((prev + table2Diff) - proposalItemsFromDbTotal) - getDiff;
        // });
        props.setTotalAmountref(prev => {
            const getDiff = JSON.parse(proposalDetails) ? prev - proposalItemsFromDbTotal : 0;
            return  ((prev + table2Diff) - proposalItemsFromDbTotal) - getDiff;
        });
    
        // ✅ Update prevItemsRef AFTER calculations
        preProductItemsRef.current = [...updatedDetails];

        props.computeTotalProposal(null, updatedDetails)
    
        const updatedQuotationItems = updatedDetails.map(data => ({
            proposal_id: 0,
            product_id: data.id,
            quantity: parseInt(data.qty),
            price: parseInt(data.base_price),
            proposal_item_id: data.proposal_item_id || 0,
            sku: data.sku,
            amount: data.amount
        }));
    
        if (JSON.stringify(updatedQuotationItems) !== JSON.stringify(props.qoutationItem)) {
            props.setQoutationItem(updatedQuotationItems);
        }
    
        props.pid.setProductItemDetails(prevDetails =>
            prevDetails.map(row =>
                row.id === id ? { ...row, isEditing: !row.isEditing } : row
            )
        );
    };
    

    // handle product onchange select dropdown
    const handleProductSelection = (e, rowId) => {
        const selectedProductId = parseInt(e.target.value);
        const selectedProduct = products.find(product => product.id === selectedProductId);

        const productExist = props.pid.productItemDetails.find(p => p.id === selectedProductId);

        if (productExist) {
            props.setNotification({
                    message: 'Product Already Exist on the Table',
                    type: 'error'
            })
            return;
        }
        props.pid.setProductItemDetails(prevDetails => prevDetails.map(row => 
            row.id === rowId ? { ...row, ...selectedProduct, isEditing: true, markup_price: selectedProduct.base_price } : row
        ));

    };

    const anyRowEditing = props.pid.productItemDetails.some(row => row.isEditing);

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



            const { payload } = await dispatch(deleteMultipleProposalItems(selectedIds))

            // hindi na kelangan mag lagay ng computeTotalProposal
            // may useeffect ba nag hahandle if nag bago ang amount ref
            
            if(payload.success) {
                props.pid.setProductItemDetails(props.pid.productItemDetails.filter(row => !selectedRow.includes(row.id)));
                return true;
            } else {
                return false;
            }
           
        })

    }


    return (
        <div className="table-editable-container">

          <div className="container mt-4">
            <h5 className="text-muted">Products</h5>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Item#</th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Qty</th>
                       { !screenMobile() && <th>Unit</th> }
                        <th>Price</th>
                        <th>Markup price</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.pid.productItemDetails.map((row, index) => (
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
                                        onChange={(e) => handleProductSelection(e, row.id)}
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
                                    {row.markup_price | 0}
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
                                    <button className="btn btn-success btn-sm" onClick={() => toggleSaveAndEdit(row.id)} disabled={validateNegativeQty}>Save</button>
                                ) : (
                                    <button className="btn btn-primary btn-sm" onClick={() => toggleSaveAndEdit(row.id)}>Edit</button>
                                )}
                                <button className="btn btn-danger ms-2 btn-sm" onClick={() => deleteRow(row.id, row.proposal_item_id, row)} disabled={selectedIds.length}>Delete</button>
                            </td>
                        </tr>

                        
                    ))}
                </tbody>
            </table>
            <button
                className="btn btn-primary btn-sm"
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