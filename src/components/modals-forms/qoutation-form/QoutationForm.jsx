import React, { useEffect, useState, useLayoutEffect } from 'react';
import './QoutationForm.css';
import QoutationTableEditable from '../../qoutation-table-editable/QoutationTableEditable';
import { getLoggedInFullname } from '../../../customs/global/manageLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCleints } from '../../../store/features/clientsSlice';
import { getLoggedInUser } from '../../../customs/global/manageLocalStorage';
import { getCurrentDate, formatDateReadable, dateFormatted } from '../../../customs/global/manageDates';
import { errorDialog, successDialog  } from '../../../customs/global/alertDialog';
import { createProposal, updateProposal } from '../../../store/features/proposalSlice';
import FloatNotification from '../../float-notification/FloatNotification';
import { getProposalItemsByProposalId, saveProposalItems, updateProposalItems } from '../../../store/features/proposalItemSlice'; 
import { postDiscountAndTax } from '../../../store/features/taxDiscountSlice';
import { deepEqual } from './../../../customs/global/manageObjects';
import TaxDiscountTable from '../../tax-table/TaxDiscountTable';
import TotalAmount from '../../total-qoutation/TotalAmount';

const QoutationForm = (props) => {
    const currentDate = new Date();

    const [proposalIsSuccess, setProposalIsSuccess] = useState(props.proposalStatus);
    const [creator, setCreator] = useState('');
    const [totalAmount, setTotalAmount] = useState(0)
    const [totalAmountref, setTotalAmountref] = useState(0)
    const [tax, setTax] = useState([])
    const [discount, setDiscount] = useState([])
    const [taxDiscountTotal, setTaxDiscountTotal] = useState({ additional: 0, discount: 0 })
    const [notification, setNotification] = useState({
        message: '',
        type: ''
    });
 
    const [qoutation, setQoutation] = useState({
        client_id: 0,
        created_by: parseInt(getLoggedInUser().id),
        proposal_date: dateFormatted(getCurrentDate()),
        status: 'pending',
        description: '',
        sub_total: 0,
        deductions: 0,
        additional_payments: 0,
        grand_total: 0,
        date_created: dateFormatted(getCurrentDate()),
        contact_person: ''
    });

    const [qoutationItem, setQoutationItem] = useState([]);
    

    const dispatch = useDispatch();

    const { data: clientData } = useSelector(state => state.clients);
    
    useLayoutEffect(() => {
        dispatch(getAllCleints());
    }, [dispatch])

    useEffect(() => {
        setProposalIsSuccess(props.proposalStatus);
    }, [props.proposalStatus, proposalIsSuccess])

    useEffect(() => {
        if(totalAmount < 0) {
            errorDialog("The Grand Total must be not negative!");
        }
    }, [totalAmount])
    

    useEffect(() => {
        if (props.proposalEdit) {
            const t = props.taxDiscountData.filter(d => d.option_type === 'additional')
            setQoutation(props.proposalEdit);
            setTotalAmountref(props.proposalEdit?.sub_total)
            setTotalAmount(props.proposalEdit?.grand_total)
            console.log('data', props.taxDiscountData)
            setTax(t)
            setDiscount(props.taxDiscountData.filter(d => d.option_type === 'discount'))
            setTaxDiscountTotal({ additional: props.proposalEdit?.additional_payments, discount: props.proposalEdit?.deductions })
        }
    }, [props.proposalEdit, props.taxDiscountData]);

    const handleQoutationInput = (event) => {
        const { name, value } = event.target;
        setQoutation(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

      // calculating tax and discount percentage
  const calculateTaxDiscount = (row) => {
    if (totalAmountref > 0) {
      return row.amount_type === 'percentage'
        ? (parseFloat(totalAmountref) * parseFloat(row.percentage)) / 100
        : parseFloat(row.percentage);
    } else {
      return 0
    }
  }

    const getTotalTax = (tax) => {
        if (tax.length > 0) {
          return tax.reduce((totals, item) => {
            const type = item.option_type || 'other'; // Default to 'other' if no type is provided
      
            // Initialize the total for this type if not already there
            if (!totals[type]) {
              totals[type] = 0;
            }
      
            // Add the amount to the respective type, parsing as float and defaulting to 0 if invalid
            totals[type] += parseFloat(item.item_total) || 0;
            return totals;
          }, { additional: 0, discount: 0 }); // Start with 0 for both additional and discount
        } else {
          return { additional: 0, discount: 0 }; // Default structure if no tax items are provided
        }
      };
    
        // Calculate total amount for each row and return updated rows
     const calculateAllTaxDiscount = (rows) => {
          return rows.map((row) => ({
            ...row,
            item_total:
              row.amount_type === 'percentage'
                ? (parseFloat(totalAmountref) * parseFloat(row.percentage)) / 100
                : parseFloat(row.percentage),
          }));
    };

    useEffect(() => {
        if(totalAmountref > 0) {
          const updatedRows = calculateAllTaxDiscount([...tax, ...discount]);
          const totalTaxDiscount = getTotalTax(updatedRows);
          
          setTotalAmount(parseFloat(totalAmountref) + parseFloat(totalTaxDiscount.additional) - parseFloat(totalTaxDiscount.discount));
        }

      }, [calculateAllTaxDiscount, totalAmountref]);

      useEffect(() => {
        if(totalAmountref > 0) {
        const updatedRows = calculateAllTaxDiscount([...tax, ...discount]);

        const taxUpdate = updatedRows.filter(d => d.option_type === 'additional');
        const discountUpdate = updatedRows.filter(d => d.option_type === 'discount');
        // const totalTaxDiscount = getTotalTax(updatedRows);
        
        setTax(taxUpdate);
        setDiscount(discountUpdate);
        
        }
      }, [totalAmountref])

      useEffect(() => {
        if(totalAmountref > 0) {
            const updatedRows = calculateAllTaxDiscount([...tax, ...discount]);
            const totalTaxDiscount = getTotalTax(updatedRows);
  
            setTaxDiscountTotal(totalTaxDiscount);
          }
      }, [tax, discount])
      
      

    const handleAddNewQoutation = async () => {
       
        if (qoutation.client_id === 0 || qoutation.created_by === 0) {
                setNotification({
                    message: 'All Fields Are Required',
                    type: 'error'
                });
            return;
        }

        const checkEditing = [...tax, ...discount].find(d => d.isEditing === true);

        if(checkEditing) {
            setNotification({
                message: 'Need to save some changes',
                type: 'error'
            });
            return;
        } 
       
        try {
            const qoutationResponse = await dispatch(createProposal({
                ...qoutation,
                additional_payments: taxDiscountTotal.additional,
                deductions: taxDiscountTotal.discount,
                sub_total: totalAmountref,
                grand_total: totalAmount
            }));

            const { lastid, success: qoutationSuccess } = qoutationResponse.payload;

            if(lastid > 0 && qoutationItem.length > 0) {
                const updatedQoutationItems = qoutationItem.map(data => ({ ...data, proposal_id: parseInt(lastid) }));
                const taxAndDiscountMerge = [...tax, ...discount].map(({ isEditing, isSaved, rowId, ...rest }) => ({ ...rest, proposal_id: parseInt(lastid) }));
                setQoutationItem(updatedQoutationItems);

                const [saveItemsResponse, saveTaxDiscountResponse] = await Promise.all([
                    dispatch(saveProposalItems(updatedQoutationItems.map(({ proposal_item_id, ...rest }) => rest))),
                    taxAndDiscountMerge.length > 0
                    ? dispatch(postDiscountAndTax(taxAndDiscountMerge))
                    : Promise.resolve({ payload: { success: true } })
                ]);

                const { success: itemsSuccess } = saveItemsResponse.payload;
                const { success: taxDiscountSuccess } = saveTaxDiscountResponse.payload;
        
                if (itemsSuccess && taxDiscountSuccess) {
                    successDialog('Qoutation is now available');
                } else {
                    errorDialog('Failed to create a Qoutation');
                }

            } else {
                if(qoutationSuccess)  {
                    successDialog('Qoutation is now available')
                } else {
                    errorDialog('Failed to create a Qoutation ');
                }
            }
        } catch (error) {
            errorDialog('Failed To Save The Qoutation');
        }
    };
    

    const handleUpdateQoutation = async () => {
        let status = false 

        let addEditItem = qoutationItem.filter(item2 =>
            !props.proposalItemData.some(item1 => parseInt(item1.qty) === parseInt(item2.quantity) && item2.proposal_item_id > 0)
        );
         
        const {firstname, fullname, user_id, id, lastname, ...dataReshapeItems } = qoutation;
        const proposalFinal = {...dataReshapeItems, date_created: dataReshapeItems.date_created ? dateFormatted(dataReshapeItems.date_created) : '' };
        
        // This is for qoutation/proposal form
        if(!deepEqual(props.proposalEdit, qoutation)) {
            dispatch(updateProposal({proposalFinal, id: qoutation.id}));
            status = true;
        } 
        
        // adding proposal id for every items
        const itemsWithProId = addEditItem.map(d =>  ({ ...d, proposal_id: qoutation.id}))
        //  this is for proposalItem editable table update
        if(addEditItem.length > 0) {
                // dispatch update the items 
                await dispatch(updateProposalItems(itemsWithProId));
                //  refreshing the table to get the new ID from the database
                await dispatch(getProposalItemsByProposalId(qoutation.id));
                setQoutationItem([]);
                status = true;
        }
        
        if(status) {
            successDialog("Updated Successfully");
        } else {
            errorDialog("No changes detected!");
        }
        
    }

    return (
        <>
            <div className="qoutation">
                <div className="container mt-5 p-5">
                    <h2>Create Qoutation</h2>

                    <div className="row mt-5">
                        <div className="col col-md-6">
                            <div className="form-group">
                                <label htmlFor="client">Client</label>
                                <select className="form-select form-select-sm" name='client_id' aria-label=".form-select-sm example" onChange={handleQoutationInput} value={qoutation.client_id} >
                                    <option value='0' disabled>Select Client</option>
                                    {clientData.map(client => <option key={client.id} value={client.id}>{client.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="col col-md-6">
                            <div className="form-group justify-content-center">
                                <label htmlFor="date">Date : </label>
                                <p>{props.proposalEdit ? formatDateReadable(props.proposalEdit.date_created) : currentDate.toDateString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col col-md-6">
                            <div className="form-group">
                                <label htmlFor="client">Contact Person</label>
                                <input type="text" className="form-control" name='contact_person' onChange={handleQoutationInput} value={qoutation.contact_person}/>
                            </div>
                        </div>
                        <div className="col col-md-6 ">
                            <div className="form-group justify-content-center">
                                <label htmlFor="date">Prepared By </label>
                                <p>{ creator ? creator : getLoggedInFullname() }</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group">
                            <label> Subject / Title</label>
                            <textarea className="form-control" id="subject" name='description' onChange={handleQoutationInput} rows="5" value={qoutation.description} ></textarea>
                        </div>
                    </div>


                    {notification.message && ( 
                        <FloatNotification message={notification.message} type={notification.type} onClose={() => setNotification('')}/>
                    )}

                    <div className="row table-editable">
                        <QoutationTableEditable
                         setQoutationItem={setQoutationItem}
                         proposalItemEdit={props.proposalItemData}
                         proposalItemSuccess={props.proposalItemSuccess}
                         setNotification={ setNotification }
                         totalAmount={{ totalAmount, setTotalAmount }}
                         setTotalAmountref={setTotalAmountref}
                         actions={{ calculateAllTaxDiscount, calculateTaxDiscount, getTotalTax}}
                         />
                    </div>


                    {parseInt(totalAmount) > 0 && (
                        <>
                        <TaxDiscountTable
                            type="additional"
                            totalAmount={totalAmount}
                            setTotalAmount={setTotalAmount}
                            taxDiscount={{ taxDiscount: tax, setTaxDiscount: setTax }}
                            totalAmountref={totalAmountref}
                            mergeDiscountTax={[...tax, ...discount]}
                            actions={{ calculateAllTaxDiscount, calculateTaxDiscount, getTotalTax}}
                        />

                        <TaxDiscountTable
                            type="discount"
                            totalAmount={totalAmount}
                            setTotalAmount={setTotalAmount}
                            taxDiscount={{ taxDiscount: discount, setTaxDiscount: setDiscount }}
                            totalAmountref={totalAmountref}
                            mergeDiscountTax={[...tax, ...discount]}
                            actions={{ calculateAllTaxDiscount, calculateTaxDiscount, getTotalTax}}
                        />
                        </>
                    )}

                    <TotalAmount 
                        totalAmountref={totalAmountref}
                        totalAmount={totalAmount}
                        taxDiscountTotal={taxDiscountTotal}
                    />

                    <div className="row row-btn-qout mt-3 mr-auto">

                        {props.proposalEdit ? 
                        <button className='btn-qoutation' onClick={handleUpdateQoutation}>Save</button>
                        :
                        <button className="btn-qoutation" onClick={handleAddNewQoutation}>Create Qoutation</button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default QoutationForm;
