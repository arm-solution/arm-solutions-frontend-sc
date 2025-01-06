import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './AdditionalItems.css';
import { deleteTaxDiscountAdditionalById } from '../../store/features/taxDiscountSlice';
import { deleteConfirmation } from '../../customs/global/alertDialog';

const AdditionalItems = (props) => {
  const [nextRowId, setNextRowId] = useState(1);
  const dispatch = useDispatch();

  // adding row on table
  const handleAddRow = () => {
    const newRow = {
      rowId: nextRowId,
      title: '',
      item_total: '',
      amount_type: 'amount',
      percentage: 0,
      option_type: props.type,
      isEditing: true,
      isSaved: false
    };
    props.additional.setAdditionalQ([...props.additional.additionalQ, newRow]);
    setNextRowId(prevId => prevId + 1);
  };

  const handleInputChange = (rowId, fieldName, value) => {
    props.additional.setAdditionalQ(prevRows =>
      prevRows.map(row =>
        row.rowId === rowId ? { ...row, [fieldName]: value } : row
      )
    );
  };

  const handleSave = (saveRow) => {

    props.additional.setAdditionalQ(
      props.additional.additionalQ.map(row =>
        row.rowId === saveRow.rowId
          ? { ...row, isEditing: false, isSaved: true }
          : row
      )
    );

    // const totalAdditional = props.actions.getTotalTaxDiscountAdditional(props.additional.additionalQ);
    props.totalAmount.setTotalAmount((pre) => pre + parseFloat(saveRow.item_total));
    // props.setTotalAmountref(props.totalAmount.totalAmount + parseFloat(saveRow.item_total))

    console.log("save row", saveRow);
  };

  const handleEdit = (rowId) => {
    props.additional.setAdditionalQ(prevRows =>
      prevRows.map(row =>
        row.rowId === rowId ? { ...row, isEditing: true } : row
      )
    );
  };

  const handleDelete = async (deletedRow) => {

    console.log("Data", deletedRow);

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

    let filteredRows;

    if(deletedRow.id) {
      const { payload } = await dispatch(deleteTaxDiscountAdditionalById(deletedRow.id));
      const result = payload.affectedRows > 0 ? true : false;
      if(result) {
        filteredRows = props.additional.additionalQ.filter(row => row.rowId !== deletedRow.rowId);
      }
    } else {
        filteredRows = props.additional.additionalQ.filter(row => row.rowId !== deletedRow.rowId);
    }

    if(filteredRows) {
      props.additional.setAdditionalQ(filteredRows);
      props.setTotalAmountref((pre) => pre - parseFloat(deletedRow.item_total));
      props.totalAmount.setTotalAmount((pre) => pre - parseFloat(deletedRow.item_total));
      return true;
    }

  });

  };

  return (
    <div className="container mt-4 additonalItemsTable">
      <h5 className="text-muted">Additional Items</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.additional.additionalQ.map(row => (
            <tr key={row}>
              <td>
                <input
                  type="text"
                  value={row.title}
                  onChange={e => handleInputChange(row.rowId, 'title', e.target.value)}
                  className="form-control form-control-sm"
                  disabled={!row.isEditing}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.item_total}
                  onChange={e => handleInputChange(row.rowId, 'item_total', e.target.value)}
                  className="form-control form-control-sm"
                  disabled={!row.isEditing}
                />
              </td>
              <td>
                {row.isEditing ? (
                  <button className="btn btn-success btn-sm m-2" onClick={() => handleSave(row)}>
                    Save
                  </button>
                ) : (
                  <button className="btn btn-primary btn-sm m-2" onClick={() => handleEdit(row.rowId)}>
                    Edit
                  </button>
                )}
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary btn-sm" onClick={handleAddRow}>Add Row</button>
    </div>
  );
};

export default AdditionalItems;
