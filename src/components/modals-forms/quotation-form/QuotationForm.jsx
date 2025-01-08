import React, { useEffect, useState, useLayoutEffect } from 'react';
import './QuotationForm.css';
import QoutationTableEditable from '../../quotation-table-editable/QuotationTableEditable';
import { getLoggedInFullname } from '../../../customs/global/manageLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCleints, getClientById } from '../../../store/features/clientsSlice';
import { getLoggedInUser } from '../../../customs/global/manageLocalStorage';
import { getCurrentDate, formatDateReadable, dateFormatted } from '../../../customs/global/manageDates';
import { errorDialog, successDialog  } from '../../../customs/global/alertDialog';
import { createProposal, updateProposal } from '../../../store/features/proposalSlice';
import FloatNotification from '../../float-notification/FloatNotification';
import { getProposalItemsByProposalId, saveProposalItems, updateProposalItems } from '../../../store/features/proposalItemSlice'; 
import { postDiscountAndTax, updateTaxAndDiscount } from '../../../store/features/taxDiscountSlice';
import { deepEqual, getModifiedAndNewItems } from '../../../customs/global/manageObjects';
import TaxDiscountTable from '../../tax-table/TaxDiscountTable';
import TotalAmount from '../../total-qoutation/TotalAmount';
import { useNavigate } from 'react-router-dom';
import { getUserById  } from '../../../store/features/userSlice';
import QuotationFormsInputs from '../quotation-form-inputs/QuotationFormInputs';

const QoutationForm = (props) => {
    const navigate = useNavigate();

    const [proposalIsSuccess, setProposalIsSuccess] = useState(props.proposalStatus);
    const [creator, setCreator] = useState({ fullname: '', position: '' });
    const [totalAmount, setTotalAmount] = useState(0)
    const [totalAmountref, setTotalAmountref] = useState(0)
    const [tax, setTax] = useState([])
    const [discount, setDiscount] = useState([])
    const [taxDiscountTotal, setTaxDiscountTotal] = useState({ discount: 0, tax: 0 })
    const [clientDetails, setClientDetails] = useState([])
    const [notification, setNotification] = useState({
        message: '',
        type: ''
    });
 
    //  state for the form
    const [quotation, setQuotation] = useState({
        client_id: 0,
        created_by: parseInt(getLoggedInUser().id),
        proposal_date: dateFormatted(getCurrentDate()),
        status: 'pending',
        description: '',
        sub_total: 0,
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
    }, [props.proposalItemData, totalAmount])

    const getClient = async (id) => {
        const { payload } = await dispatch(getClientById(id));

        return payload;
    }

    const getCreatorDetails = async(id) => {
        let position = ''
        const { payload } = await dispatch(getUserById(id));

        if(payload[0].user_type === 'admin') {
            position = 'System Administrator'
        } else if(payload[0].user_type === 'marketing') {
            position = 'Marketing Specialist '
        }

        return {
            fullname: `${payload[0].firstname} ${payload[0].lastname}`,
            position
        };
    }
     
    // useEffect(() => {
    //     if (props.proposalEdit) {
    //         const fetchQuotationDetails = async () => {
    //             const client = await getClient(props.proposalEdit.client_id);
    //             const creatorDet = await getCreatorDetails(props.proposalEdit.created_by)
    //             setCreator(creatorDet)
    //             // console.log('proposal creator', creator);
    //             setClientDetails(client);
    //             setQuotation(props.proposalEdit);
    //             setTotalAmountref(parseInt(props.proposalEdit?.sub_total))
    //             setTotalAmount(parseInt(props.proposalEdit?.grand_total))
    //             setTax(props.taxDiscountData.filter(d => d.option_type === 'additional'))
    //             setDiscount(props.taxDiscountData.filter(d => d.option_type === 'discount'))
    //             setTaxDiscountTotal({ additional: props.proposalEdit?.additional_payments, discount: props.proposalEdit?.deductions })
    //         }

    //         fetchQuotationDetails();
    //     }
    // }, [props.proposalEdit, props.taxDiscountData, props.proposalItemData]);


    useEffect(() => {
        const fetchFromSession = () => {
          const proposalDetails = sessionStorage.getItem('proposalDetails');
      
          if (proposalDetails) {
            const { quotation: quotationData, taxDiscount: taxDiscountData } = JSON.parse(proposalDetails);
              setQuotation(quotationData);
              setTax(taxDiscountData.filter(d => d.option_type === 'tax'));
              setDiscount(taxDiscountData.filter(d => d.option_type === 'discount'));

            //   console.log('dsfjsdf', taxDiscountData)
            
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
          }, { discount: 0, tax: 0 }); // Start with 0 for both additional and discount
        } else {
          return { discount: 0, tax: 0 }; // Default structure if no tax items are provided
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
          
          setTotalAmount((parseFloat(totalAmountref) + parseFloat(totalTaxDiscount.tax)) - parseFloat(totalTaxDiscount.discount));
        }

      }, [calculateAllTaxDiscount, totalAmountref]);

      useEffect(() => {
        if(totalAmountref > 0) {
        const updatedRows = calculateAllTaxDiscount([...tax, ...discount]);

        const taxUpdate = updatedRows.filter(d => d.option_type === 'tax');
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
       
        if (quotation.client_id === 0 || quotation.created_by === 0) {
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
            // console.log("Lance", {
            //     ...quotation,
            //     tax: taxDiscountTotal.tax,
            //     discount: taxDiscountTotal.discount,
            //     sub_total: totalAmountref,
            //     grand_total: totalAmount
            // })

            const quotationResponse = await dispatch(createProposal({
                ...quotation,
                tax: taxDiscountTotal.tax,
                discount: taxDiscountTotal.discount,
                sub_total: totalAmountref,
                grand_total: totalAmount
            }));



            const { lastid, success: qoutationSuccess } = quotationResponse.payload;

            console.log("payload", {
                ...quotation,
                tax: taxDiscountTotal.tax,
                discount: taxDiscountTotal.discount,
                sub_total: totalAmountref,
                grand_total: totalAmount
            });

            if(lastid > 0 && qoutationItem.length > 0) {
                const updatedQoutationItems = qoutationItem.map(data => ({ ...data, proposal_id: parseInt(lastid) }));
                const taxAndDiscountMerge = [...tax, ...discount].map(({ isEditing, isSaved, rowId, ...rest }) => ({ ...rest, proposal_id: parseInt(lastid) }));
                setQoutationItem(updatedQoutationItems);

                console.log("items qoutation", updatedQoutationItems);
                console.log("tax discount ", taxAndDiscountMerge)

                const [saveItemsResponse, saveTaxDiscountResponse] = await Promise.all([
                    dispatch(saveProposalItems(updatedQoutationItems.map(({ proposal_item_id, ...rest }) => rest))),
                    taxAndDiscountMerge.length > 0
                    ? dispatch(postDiscountAndTax(taxAndDiscountMerge))
                    : Promise.resolve({ payload: { success: true } })
                ]);

                const { success: itemsSuccess } = saveItemsResponse.payload;
                const { success: taxDiscountSuccess } = saveTaxDiscountResponse.payload;
        
                if (itemsSuccess && taxDiscountSuccess) {
                    successDialog('Quotation is now available');
                } else {
                    errorDialog('Failed to create a Quotation');
                }

            } else {
                if(qoutationSuccess)  {
                    successDialog('Quotation is now available')
                } else {
                    errorDialog('Failed to create a Quotation ');
                }
            }
        } catch (error) {
            errorDialog('Failed To Save The Quotation');
        }
    };
    

    const handleUpdateQoutation = async () => {

        let status = false 
        const taxDiscountModified = getModifiedAndNewItems(props.taxDiscountData, [...tax, ...discount].map(d => { 
            const { isEditing, isSaved, rowId, ...rest } = d;
            return {...rest, proposal_id: quotation.id};
        }));
        
        let addEditItem = qoutationItem.filter(item2 =>
            !props.proposalItemData.some(item1 => parseInt(item1.qty) === parseInt(item2.quantity) && item2.proposal_item_id > 0)
        );
         
        const { firstname, fullname, user_id, id, lastname, ...dataReshapeItems } = quotation;
        const proposalFinal = {
            ...dataReshapeItems,
            proposal_date: dateFormatted(dataReshapeItems.proposal_date),
            date_created: dataReshapeItems.date_created ? dateFormatted(dataReshapeItems.date_created) : '',
            sub_total: totalAmountref,
            additional_payments: taxDiscountTotal.tax,
            deductions: taxDiscountTotal.discount
        };

        console.log("final data", proposalFinal);
        
        //This is for qoutation/proposal form
        if(!deepEqual(props.proposalEdit, quotation)) {

            dispatch(updateProposal({ proposalFinal, id: quotation.id }));
            status = true;
        } 
        
        // adding proposal id for every items
        const itemsWithProId = addEditItem.map(d =>  ({ ...d, proposal_id: quotation.id}))
        //  this is for proposalItem editable table update
        if(addEditItem.length > 0) {
                // dispatch update the items 
                await dispatch(updateProposalItems(itemsWithProId));
                //  refreshing the table to get the new ID from the database
                await dispatch(getProposalItemsByProposalId(quotation.id));
                setQoutationItem([]);
                status = true;
        }
        if(taxDiscountModified.length > 0) {
            await dispatch(updateTaxAndDiscount(taxDiscountModified));
            status = true;
        }
        
        if(status) {
            successDialog("Updated Successfully");
        } else {
            errorDialog("No changes detected!");
        }
        
    }

    const openPdfFile = () => {
        sessionStorage.setItem("pdfViewerState", JSON.stringify({
            quotation: props.proposalEdit,
            tax: tax,
            discount: discount,
            quotationItem: props.proposalItemData,
            clientDetails: clientDetails,
            creator
        }));

        // Open the new tab and navigate to the desired path
        window.open(`/pdf-viewer/quotation/id/${props.proposalEdit.id}`, "_blank");
    } 

    return (
        <>
            <div className="qoutation">
                <div className="container mt-5 p-5">

                    <QuotationFormsInputs
                     clientData={clientData}
                     quotation={{ quotation, setQuotation}}
                     creator={ creator }
                    />
           

                    {notification.message && ( 
                        <FloatNotification message={notification.message} type={notification.type} onClose={() => setNotification('')}/>
                    )}

                    <div className="row table-editable">
                        <QoutationTableEditable
                         setQoutationItem={setQoutationItem}
                         proposalItemSuccess={props.proposalItemSuccess}
                         setNotification={ setNotification }
                         totalAmount={{ totalAmount, setTotalAmount }}
                         setTotalAmountref={setTotalAmountref}
                         totalAmountref={totalAmountref}
                         actions={{ calculateAllTaxDiscount, calculateTaxDiscount, getTotalTax}}
                         />
                    </div>


                    {parseInt(totalAmount) > 0 && (
                        <>
                        <TaxDiscountTable
                            type="tax"
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

                        {quotation.id > 0 ? 
                        <button className='btn-qoutation' onClick={handleUpdateQoutation}>Save</button>
                        :
                        <button className="btn-qoutation" onClick={handleAddNewQoutation}>Create Qoutation</button>
                        }

                    </div>

                    <div className="row row-btn-pdf"> 
                      { props.proposalEdit && 
                      <button className="btn-pdf mt-3 mr-auto" onClick={openPdfFile}>View on PDF</button>
                      }
                    </div>
                </div>
            </div>
        </>
    );
};

export default QoutationForm;
