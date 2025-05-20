 import React, { useState, useEffect } from 'react';
import './TaxDiscountTable.css';
import { useGlobalRefs } from '../../customs/global/useGlobalRef';

const TaxDiscountTable = (props) => {
  const [nextRowId, setNextRowId] = useState(1);
  const [initialized, setInitialized] = useState(false); // To prevent reinitializing rows on each render

  const { preTaxDiscountRef } = useGlobalRefs();

  useEffect(() => {
    if (!initialized) {
      // Initialize rowId for existing data from props only once
      const updatedRows = props.taxDiscount.taxDiscount.map((row, index) => ({
        ...row,
        rowId: nextRowId + index,
      }));

      // console.log("updated row", updatedRows);

      props.taxDiscount.setTaxDiscount(updatedRows);
      setNextRowId(nextRowId + updatedRows.length); // Update the nextRowId
      setInitialized(true); // Set initialized to true to avoid further updates
    }
  }, [initialized, props.taxDiscount.taxDiscount]); 

  const handleAddRow = () => {
    const newRow = {
      rowId: nextRowId,
      title: '',
      amount_type: '',
      percentage: '',
      item_total: 0,
      option_type: props.type,
      isEditing: true,
    };

    props.taxDiscount.setTaxDiscount([...props.taxDiscount.taxDiscount, newRow]);
    setNextRowId(nextRowId + 1);
  };

  const handleChange = (rowId, e) => {
    const { name, value } = e.target;
    props.taxDiscount.setTaxDiscount(props.taxDiscount.taxDiscount.map(row =>
      row.rowId === rowId ? { ...row, [name]: value, item_total: props.actions.calculateTaxDiscount({...row, [name]: value}) } : row
    ));
  };

  const handleEdit = (rowId, row) => {
    props.taxDiscount.setTaxDiscount(
      props.taxDiscount.taxDiscount.map(row => row.rowId === rowId ? { ...row, isEditing: true } : row)
    );
  };


  const handleDelete = (rowId, type, row) => {

    console.log("row id", row.id);

    if(row.id) {
        props.setDataTotDelete(prev => ({
          ...prev,
          taxDiscount: [...prev.taxDiscount, row.id]
        }));
    } 

    const filteredRows = props.taxDiscount.taxDiscount.filter(row => row.rowId !== rowId);
    // 🔄 Remove the row from the taxDiscount state
    props.taxDiscount.setTaxDiscount(filteredRows);

    // 🔄 Remove the row from merged discount/tax state
    const updatedMergedDiscountTax = props.mergeDiscountTax.filter(row => !(row.rowId === rowId && row.option_type === type));

    // ✅ Initialize ref if undefined
    if (!preTaxDiscountRef.current) {
        preTaxDiscountRef.current = { tax: 0, discount: 0 };
    }

    const updateTax = updatedMergedDiscountTax ? updatedMergedDiscountTax.filter(d => d.option_type === 'tax'): [];
    const updateDiscount = updatedMergedDiscountTax ?  updatedMergedDiscountTax.filter(d => d.option_type === 'discount') : [];
    
    props.computeTotalProposal(null, null, updateTax, updateDiscount);

};


  const handleSave = (rowId) => {
    const proposalDetails = sessionStorage.getItem("proposalDetails");
    const row = props.taxDiscount.taxDiscount.find(row => row.rowId === rowId);
    if (!row) return;

    const itemTotal = props.actions.calculateTaxDiscount(row);

    props.taxDiscount.setTaxDiscount(
        props.taxDiscount.taxDiscount.map(row =>
            row.rowId === rowId
                ? { ...row, item_total: itemTotal, isEditing: false, isSaved: true }
                : row
        )
    );

    // ✅ Initialize `prevMergeDiscountTaxRef` if undefined
    if (!preTaxDiscountRef.current) {
        preTaxDiscountRef.current = { tax: 0, discount: 0 };
    }

    // ✅ Calculate previous and new total for tax & discount
    // const prevTax = preTaxDiscountRef.current.tax || 0;
    // const prevDiscount = preTaxDiscountRef.current.discount || 0;

    // const totalTaxDiscount = props.actions.getTotalTax(props.mergeDiscountTax);
    // const newTax = totalTaxDiscount.tax || 0;
    // const newDiscount = totalTaxDiscount.discount || 0;
    
    // ✅ Compute the difference
    // const taxDiff = newTax - prevTax;
    // const discountDiff = newDiscount - prevDiscount;
    // const taxDiscountDiff = taxDiff - discountDiff;

    const updateTax = props.mergeDiscountTax ? props.mergeDiscountTax.filter(d => d.option_type === 'tax'): [];
    const updateDiscount = props.mergeDiscountTax ?  props.mergeDiscountTax.filter(d => d.option_type === 'discount') : [];
    
    props.computeTotalProposal(null, null, updateTax, updateDiscount);

    // props.setTotalAmount((prev) => {
      
    //   console.log("pre", prev);
    //   // kunin ang labis na total na isinama sa total product 
    //   const getDiffTotalProduct = taxDiscountDiff > 0 && JSON.parse(proposalDetails) ? (parseFloat(prev) - props.totalAmountref) || 0 : 0;

    //   console.log("getDiffTotalProduct", getDiffTotalProduct);

    //   return (parseFloat(prev) + taxDiscountDiff) - getDiffTotalProduct
    // });

    // ✅ Update ref AFTER calculations
    //preTaxDiscountRef.current = { tax: newTax, discount: newDiscount };
};


  return (
    <div className="container mt-4">
      <h4>{ props.type === 'tax' ? 'Tax' : 'Discount' }</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Percentage / Amount (%/₱)</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.taxDiscount.taxDiscount.map((row, index) => (
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
                <select
                  name="amount_type"
                  value={row.amount_type}
                  onChange={(e) => handleChange(row.rowId, e)}
                  disabled={!row.isEditing}
                  className="form-select"
                >
                  <option value="" disabled>Select</option>
                  <option value="percentage">Percentage</option>
                  <option value="amount">Amount</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  name="percentage"
                  value={row.percentage}
                  onChange={(e) => handleChange(row.rowId, e)}
                  disabled={!row.isEditing}
                  className="form-control"
                />
              </td>
              <td>{ row.item_total || 0 }</td>
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
                <button onClick={() => handleDelete(row.rowId, props.type, row)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddRow} className="btn btn-primary btn-sm mb-3">Add Row</button>
    </div>
  );
};

export default TaxDiscountTable;
