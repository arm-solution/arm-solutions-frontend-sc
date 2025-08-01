import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import './QuotationForm.css';
import QoutationTableEditable from '../../quotation-table-editable/QuotationTableEditable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCleints, getClientById } from '../../../store/features/clientsSlice';
import { getLoggedInUser } from '../../../customs/global/manageLocalStorage';
import { getCurrentDate, dateFormatted } from '../../../customs/global/manageDates';
import { errorDialog, successDialog  } from '../../../customs/global/alertDialog';
import { updateProposal } from '../../../store/features/proposalSlice';
import FloatNotification from '../../float-notification/FloatNotification';
import { getProposalItemsByProposalId, saveProposalItems, updateProposalItems, deleteMultipleProposalItems } from '../../../store/features/proposalItemSlice'; 
import { postDiscountAndTax, updateTaxAndDiscount, deleteMultipleTaxDiscount } from '../../../store/features/taxDiscountSlice';
import { postAdditionalItems, updateMultipleAdditionalItems, getAdditionalByProposalID, deleteMultipleAdditionalItems } from '../../../store/features/additional.Slice';
import { getModifiedAndNewItems, shallowEqualArrays } from '../../../customs/global/manageObjects';
import TaxDiscountTable from '../../tax-table/TaxDiscountTable';
import TotalAmount from '../../total-qoutation/TotalAmount';
import { getUserById  } from '../../../store/features/userSlice';
import QuotationFormsInputs from '../quotation-form-inputs/QuotationFormInputs';
import AdditionalItemtable from '../../additional-items-table-editable/AdditionalItemtable';
import { getPositionByDepartmentID } from '../../../customs/global/manageObjects';
import { getDepartmentLoggedIn, getApprovalState } from '../../../customs/global/manageLocalStorage';
import TermsCondition from '../../terms-condition-editor/TermsCondition';
import { createProposal } from '../../../store/features/proposalSlice';

const QoutationForm = (props) => {
    // const navigate = useNavigate();

    const [addtionalItems, setAddtionalItems] = useState([]);
    // const [first, setfirst] = useState(second)

    const [termsCondition, setTermsCondition] = useState('');
    const [proposalIsSuccess, setProposalIsSuccess] = useState(props.proposalStatus);
    const [creator, setCreator] = useState({ fullname: '', position: '' });
    const [tax, setTax] = useState([])
    const [discount, setDiscount] = useState([])
    const [taxDiscountTotal, setTaxDiscountTotal] = useState({ discount: 0, tax: 0 })
    const [clientDetails, setClientDetails] = useState([])
    const [notification, setNotification] = useState({
        message: '',
        type: ''
    });

    // this is for product details or item
    const [productItemDetails, setProductItemDetails] = useState([]);
 
    const [qoutationItem, setQoutationItem] = useState([]);
    
    //  state for the form
    const [quotation, setQuotation] = useState({
        client_id: 0,
        created_by: parseInt(getLoggedInUser().id),
        proposal_date: dateFormatted(getCurrentDate()),
        description: '',
        sub_total: 0,
        grand_total: 0,
        date_created: dateFormatted(getCurrentDate()),
        contact_person: ''
    });

    // reference for both additional table and product table
    const preAdditionalRef = useRef([]);
    const preProductItemsRef = useRef([]);
    const preTaxDiscountRef = useRef([]);

    const [dataTotDelete, setDataTotDelete] = useState({
        quotationItems: [],
        taxDiscount: [],
        additionalItems: []
    })
    
    const dispatch = useDispatch();

    const { data: clientData } = useSelector(state => state.clients);
    
    useLayoutEffect(() => {
        dispatch(getAllCleints());
    }, [dispatch])

    useEffect(() => {
        setProposalIsSuccess(props.proposalStatus);
    }, [props.proposalStatus, proposalIsSuccess])


    useEffect(() => {
        if(props.totalAmountState.totalAmount < 0) {
            errorDialog("The Grand Total must be not negative!");
        }
    }, [props.proposalItemData, props.totalAmountState.totalAmount])

    const getClient = async (id) => {
        const { payload } = await dispatch(getClientById(id));

        return payload;
    }

    const getCreatorDetails = async(id) => {
        const { payload } = await dispatch(getUserById(id));

        getPositionByDepartmentID(payload.data.department);

        return {
            fullname: `${payload.data.firstname} ${payload.data.lastname}`,
            position: getPositionByDepartmentID(payload.data.department) || 'No Position Specified'
        };
    }

    useEffect(() => {
        // lance
    console.log("props.proposalItemData", props.proposalItemData);
    console.log("tax", tax);
    console.log("discount", discount);
    // console.log("addEditItem", addEditItem)
    console.log("qoutationItem", qoutationItem)
    // console.log("qoutationItem", taxDiscountModified)
    }, [])
    

    // update data from the database when the local storage is not empty
    // this is for delete items
    // useEffect(() => {
    //     const storedProposal = sessionStorage.getItem('proposalDetails');
    //     if (!storedProposal) return;
    
    //     const storedQuotation = JSON.parse(storedProposal).quotation;
    //     const storedSubTotal = parseFloat(storedQuotation?.sub_total || 0);
    
    //     if (storedSubTotal !== props.taf.totalAmountref) {
    //         const updatedQuotation = {
    //             ...quotation,
    //             sub_total: props.taf.totalAmountref,
    //             tax: taxDiscountTotal.tax,
    //             discount: taxDiscountTotal.discount,
    //             additional: addtionalItems.reduce((sum, item) => sum + item.item_total, 0),
    //         };
    
    //         const data = dispatch(updateProposal({ quotation: updatedQuotation, id: quotation.id }));

    //         console.log("data", data);
    //     }
    // }, [props.taf.totalAmountref, taxDiscountTotal, addtionalItems, quotation, dispatch]);
    
    

    useEffect(() => {
        if (props.proposalEdit) {
            const fetchQuotationDetails = async () => {
                const client = await getClient(props.proposalEdit.client_id);
                const creatorDet = await getCreatorDetails(props.proposalEdit.created_by)

                setCreator(creatorDet)
                setClientDetails(client);
            }

            fetchQuotationDetails();
        }
    }, [props.proposalEdit, props.taxDiscountData, props.proposalItemData]);


    useEffect(() => {
        const fetchFromSession = () => {
          const proposalDetails = sessionStorage.getItem('proposalDetails');
      
          if (proposalDetails) {
            const { quotation: quotationData, taxDiscount: taxDiscountData, quotationItem: quotationItemData } = JSON.parse(proposalDetails);
              setQuotation(quotationData);
              setTax(taxDiscountData.filter(d => d.option_type === 'tax'));
              setDiscount(taxDiscountData.filter(d => d.option_type === 'discount'));

            const itemsWithComputationAmount = quotationItemData.map(d => ({
                ...d,
                markup_price: d.base_price,
                amount: parseInt(d.qty) * parseInt(d.base_price)
            }))

            // this is for quotation editable table
            setProductItemDetails(itemsWithComputationAmount);
            
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
    }, []);


    // calculating tax and discount percentage
    const calculateTaxDiscount = (row) => {
        if (props.taf.totalAmountref > 0) {
        return row.amount_type === 'percentage'
            ? (parseFloat(props.taf.totalAmountref) * parseFloat(row.percentage)) / 100
            : parseFloat(row.percentage);
        } else {
        return 0
        }
    }

    const getTotalTax = (tax) => {
        if (Array.isArray(tax) && tax.length > 0) {
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
                ? (parseFloat(props.taf.totalAmountref) * parseFloat(row.percentage)) / 100
                : parseFloat(row.percentage),
          }));
    };

    // call this for every action for compute all table
    const computeTotalProposal = (
        latestAdditionalItems = null,
        latestProductItems = null,
        latestTax = null,
        latestDiscount = null
      ) => {
        const additionalT = (latestAdditionalItems || addtionalItems)
          .reduce((sum, item) => sum + Number(item.item_total || 0), 0);
      
        const productsT = (latestProductItems || productItemDetails)
          .reduce((sum, item) => sum + Number(item.amount || 0), 0);
      
        const taxData = latestTax || tax;
        const discountData = latestDiscount || discount;
      
        let taxDiscountT = { tax: 0, discount: 0 };
        if (props.taf.totalAmountref > 0) {
          const updatedRows = calculateAllTaxDiscount([...taxData, ...discountData]);
          taxDiscountT = getTotalTax(updatedRows);
        }
      
        const totalNew =
          parseFloat(additionalT || 0) +
          parseFloat(taxDiscountT?.tax || 0) +
          parseFloat(productsT || 0) -
          parseFloat(taxDiscountT?.discount || 0);
        
        setTaxDiscountTotal(taxDiscountT);
        props.totalAmountState.setTotalAmount(totalNew);
      
      };

    useEffect(() => {
        if(props.taf.totalAmountref > 0) {
          const updatedRows = calculateAllTaxDiscount([...tax, ...discount]);
          const totalTaxDiscount = getTotalTax(updatedRows);
          
        props.totalAmountState.setTotalAmount(pre => {
            return (parseFloat(pre) + parseFloat(totalTaxDiscount.tax)) - parseFloat(totalTaxDiscount.discount)
        });
   
        }

      }, [props.taf.totalAmountref]);

      useEffect(() => {
        if(props.taf.totalAmountref > 0) {
        const updatedRows = calculateAllTaxDiscount([...tax, ...discount]);

        const taxUpdate = updatedRows.filter(d => d.option_type === 'tax');
        const discountUpdate = updatedRows.filter(d => d.option_type === 'discount');
        // const totalTaxDiscount = getTotalTax(updatedRows);
        
        setTax(taxUpdate);
        setDiscount(discountUpdate);

        computeTotalProposal(null, null, taxUpdate, discountUpdate);
        
        }
      }, [props.taf.totalAmountref])
    
    const handleClearForm = () => {
        const proposalDetails = sessionStorage.getItem('proposalDetails');

        if(JSON.parse(proposalDetails)) {
            sessionStorage.removeItem('proposalDetails');
            setAddtionalItems([]);
            setTax([]);
            setDiscount([]);
            setTaxDiscountTotal({discount: 0, tax: 0})
            props.taf.setTotalAmountref(0);
            setQoutationItem([])
            setProductItemDetails([])
            props.totalAmountState.setTotalAmount(0)
            setQuotation({
                client_id: 0,
                created_by: parseInt(getLoggedInUser().id),
                proposal_date: dateFormatted(getCurrentDate()),
                status: 'pending',
                description: '',
                sub_total: 0,
                grand_total: 0,
                date_created: dateFormatted(getCurrentDate()),
                contact_person: ''
            })
        }
    }

      
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

        console.log("quotation items", qoutationItem);

        try {

            const quotationResponse = await dispatch(createProposal({
                ...quotation,
                tax: taxDiscountTotal.tax,
                discount: taxDiscountTotal.discount,
                sub_total: props.taf.totalAmountref,
                grand_total: props.totalAmountState.totalAmount,
                additional: addtionalItems.reduce((sum, item) => sum + item.item_total, 0),
                previous_department_stage_id: getDepartmentLoggedIn(),
                department_stage_id: getDepartmentLoggedIn(),
                terms_condition: termsCondition,
                status: 'pending'
            }));

            const { lastid, success: qoutationSuccess } = quotationResponse.payload;


            if(lastid > 0 && qoutationItem.length > 0) {
                const updatedQoutationItems = qoutationItem.map(data => ({ ...data, proposal_id: parseInt(lastid) }));
                const taxAndDiscountMerge = [...tax, ...discount].map(({ isEditing, isSaved, rowId, ...rest }) => ({ ...rest, proposal_id: parseInt(lastid) }));
                
                const additionalItemsData = addtionalItems.map(({ isEditing, isSaved, item_total, rowId, ...rest }) => ({
                    ...rest,
                    item_total: item_total,
                    proposal_id: parseInt(lastid), 
                }));


                setQoutationItem(updatedQoutationItems);

                // dispatching 3 dispatch and push it to promises array to make sure execute it simultaneously
                const promises = [
                    dispatch(postAdditionalItems(additionalItemsData)),
                    dispatch(saveProposalItems(updatedQoutationItems.map(({ proposal_item_id, amount, ...rest }) => ({...rest, item_total: amount }))))
                ];
                
                if (taxAndDiscountMerge.length > 0) {
                    promises.push(dispatch(postDiscountAndTax(taxAndDiscountMerge)));
                } else {
                    promises.push(Promise.resolve({ payload: { success: true } }));
                }
                
                const [saveItemsResponse, saveAdditionalItemResponse, saveTaxDiscountResponse] = await Promise.all(promises);
                

                const { success: itemsStatus } = saveItemsResponse.payload;
                const { success: taxDiscountStatus } = saveTaxDiscountResponse.payload;
                const { success: additionalItemStatus } = saveAdditionalItemResponse.payload;
        
                if (itemsStatus && taxDiscountStatus && additionalItemStatus) {
                    successDialog('Quotation is now available');
                } else {
                    errorDialog('Failed to create a Quotation');
                }

            } else {
                if(qoutationSuccess)  {
                    successDialog('Quotation is now available')
                    props.setSelectedTab('tab-one')
                } else {
                    errorDialog('Failed to create a Quotation ');
                }
            }
        } catch (error) {
            errorDialog('Failed To Save The Quotation');
        }
    };
    
    // UPDATE PROPOSAL
    const handleUpdateQoutation = async () => {

        let status = false;
        // use this for compring additional items
        const getLocalStorage = sessionStorage.getItem("proposalDetails");


        // Format tax and discount into consistent structure
        const taxDiscountModified = getModifiedAndNewItems(
            props.taxDiscountData,
            [...tax, ...discount].map(({ isEditing, isSaved, rowId, ...rest }) => ({
                ...rest,
                proposal_id: quotation.id
            }))
        );

        // Determine which items are new or updated
        const addEditItem = qoutationItem.filter(item2 =>
            !props.proposalItemData.some(
                item1 =>
                    parseInt(item1.qty) === parseInt(item2.quantity) &&
                    item2.proposal_item_id > 0
            )
        );
    
        // Destructure and reshape quotation for comparison and dispatch
        const {
            firstname,
            fullname,
            user_id,
            id,
            lastname,
            ...dataReshapeItems
        } = quotation;
    
        const proposalFinal = {
            ...dataReshapeItems,
            proposal_date: dateFormatted(dataReshapeItems.proposal_date),
            date_created: dataReshapeItems.date_created
                ? dateFormatted(dataReshapeItems.date_created)
                : '',
            sub_total: props.taf.totalAmountref,
            tax: taxDiscountTotal.tax,
            discount: taxDiscountTotal.discount,
            additional: addtionalItems.reduce((sum, item) => sum + item.item_total, 0),
            grand_total: props.totalAmountState.totalAmount,
            // previous_department_stage_id: getDepartmentLoggedIn(),
            // department_stage_id: getApprovalState().targetDepartment,
            // status: getApprovalState().status

        };
    
        // Check if proposal has changed by comparing specific fields
        const originalProposal = props.proposalEdit;
        const isProposalModified = Object.entries(proposalFinal).some(
            ([key, value]) => originalProposal[key] !== value
        );

       // update propsal detail 
        if (isProposalModified) {
            await dispatch(updateProposal({ proposalFinal, id: quotation.id }));
            status = true;
        }
        
        // Add proposal_id to items and dispatch updates if necessary
        if (addEditItem.length > 0 || qoutationItem.length > 0) {
            const itemsWithProId = addEditItem.map(({ amount, ...d}) => ({
                ...d,
                proposal_id: quotation.id,
                item_total: amount
            }));
    
            await dispatch(updateProposalItems(itemsWithProId));
            await dispatch(getProposalItemsByProposalId(quotation.id));
    
            
            setQoutationItem([]);
            status = true;
        }

        if(!shallowEqualArrays(JSON.parse(getLocalStorage).additionalItems, addtionalItems)) {           
            // Prepare additional items for update
            const updatedAdditionalItems = addtionalItems.map(
                ({ rowId, isSaved, isEditing, ...rest }) => ({
                    ...rest,
                    proposal_id: quotation.id
                })
            );
    
            // update the additional items
            await dispatch(updateMultipleAdditionalItems(updatedAdditionalItems));
            await dispatch(getAdditionalByProposalID(quotation.id));
        } 


        // Dispatch tax and discount updates if any
        if (Array.isArray(taxDiscountModified) && taxDiscountModified.length > 0) {
            await dispatch(updateTaxAndDiscount(taxDiscountModified));
            status = true;
        }

        // this is for deletion of the items from the database
        if (Array.isArray(dataTotDelete?.additionalItems) && dataTotDelete.additionalItems.length > 0) {
            await dispatch(deleteMultipleAdditionalItems(dataTotDelete.additionalItems));
        }

        if (Array.isArray(dataTotDelete?.quotationItems) && dataTotDelete.quotationItems.length > 0) {
            await dispatch(deleteMultipleProposalItems(dataTotDelete.quotationItems));
        }

        if (Array.isArray(dataTotDelete?.taxDiscount) && dataTotDelete.taxDiscount.length > 0) {
            await dispatch(deleteMultipleTaxDiscount(dataTotDelete.taxDiscount));
        }
    
        // Show success or error message
        if (status) {
            // await dispatch(getAllProposal());
            successDialog("Updated Successfully");
        } else {
            errorDialog("No changes detected!");
        }
        
        handleClearForm()
        props.setSelectedTab('tab-one')
       
    };  
    // // end of update


    const handleQuotationApproval = async () => {

        const { id, status } = quotation;
        const { status: deptStatus, targetDepartment} = getApprovalState(status); 

        const proposalFinalStatus = {
            previous_department_stage_id: getDepartmentLoggedIn(),
            department_stage_id: targetDepartment,
            status: deptStatus
        };


        if(id) {
          const { payload } = await dispatch(updateProposal({ proposalFinal: proposalFinalStatus, id: id }));

          if(payload.success) {
            alert("Submit For Approval");
            handleClearForm();
            props.setSelectedTab('tab-one')
          } else {
            alert("Issue Detected While approving the proposal")
          }
        }
    }
    
    //  open pdf file on new tab
    const openPdfFile = () => {
        sessionStorage.setItem("pdfViewerState", JSON.stringify({
            additional: addtionalItems,
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

    const checkApproval = () => {
        console.log("get approval state", getApprovalState().status)
        console.log("quotation", quotation);
    }

    return (
        <>
            {/* <button onClick={checkApproval}>check approval</button> */}
            <div className="qoutation">
                <div className="container mt-5 p-5">

                    <QuotationFormsInputs
                     clientData={clientData}
                     quotation={{ quotation, setQuotation}}
                     creator={ creator }
                     handleClearForm={handleClearForm}
                    />
           

                    {notification.message && ( 
                        <FloatNotification message={notification.message} type={notification.type} onClose={() => setNotification('')}/>
                    )}

                    
                    <AdditionalItemtable 
                         totalAmount={props.totalAmountState.totalAmount}
                         setTotalAmount={props.totalAmountState.setTotalAmount}
                         additionalState={{ 
                            addtionalItems: Array.isArray(addtionalItems) ? addtionalItems : [], 
                            setAddtionalItems 
                        }}
                         totalAmountref={props.taf.totalAmountref }
                         setTotalAmountref={ props.taf.setTotalAmountref }
                         actions={{ calculateAllTaxDiscount, calculateTaxDiscount, getTotalTax}}
                         reference={{
                            preAdditionalRef: Array.isArray(preAdditionalRef) ? preAdditionalRef : [], 
                            preProductItemsRef}}
                         computeTotalProposal={computeTotalProposal}
                         setDataTotDelete={setDataTotDelete}
                    />

                    <div className="row table-editable">
                        <QoutationTableEditable
                            setQoutationItem={setQoutationItem}
                            proposalItemSuccess={props.proposalItemSuccess}
                            setNotification={ setNotification }
                            totalAmount={ props.totalAmountState.totalAmount }
                            setTotalAmount={ props.totalAmountState.setTotalAmount }
                            setTotalAmountref={props.taf.setTotalAmountref}
                            totalAmountref={props.taf.totalAmountref}
                            actions={{ calculateAllTaxDiscount, calculateTaxDiscount, getTotalTax }}
                            reference={{preAdditionalRef, preProductItemsRef}}
                            pid={{ productItemDetails, setProductItemDetails }}
                            taxDiscountTotal={taxDiscountTotal}
                            tax={tax}
                            discount={discount}
                            additional={addtionalItems}
                            computeTotalProposal={computeTotalProposal}
                            setDataTotDelete={setDataTotDelete}
                         />
                    </div>

                    {parseInt(props.taf.totalAmountref) > 0 && (
                        ["tax", "discount"].map((type) => (
                            <TaxDiscountTable
                                key={type}
                                type={type}
                                totalAmount={ props.totalAmountState.totalAmount }
                                setTotalAmount={ props.totalAmountState.setTotalAmount }
                                taxDiscount={
                                    type === "tax"
                                        ? { taxDiscount: tax, setTaxDiscount: setTax }
                                        : { taxDiscount: discount, setTaxDiscount: setDiscount }
                                }
                                totalAmountref={props.taf.totalAmountref}
                                mergeDiscountTax={[...tax, ...discount]}
                                actions={{ calculateAllTaxDiscount, calculateTaxDiscount, getTotalTax }}
                                preTaxDiscountRef={preTaxDiscountRef}
                                computeTotalProposal={computeTotalProposal}
                                setDataTotDelete={setDataTotDelete}
                            />
                        ))
                    )}

                    <TermsCondition 
                        termsCondition={termsCondition}
                        setTermsCondition={setTermsCondition}
                    />

                    <TotalAmount 
                        totalAmountref={props.taf.totalAmountref}
                        totalAmount={ props.totalAmountState.totalAmount }
                        taxDiscountTotal={taxDiscountTotal}
                        addEditItem={addtionalItems}
                    />

                    <div className="row row-btn-qout mt-3 justify-content-end gap-2">
                    {quotation.id > 0 ? (
                        <>                        
                          {/* <button className="btn-qoutation" onClick={handleUpdateQoutation}>Save</button> */}

                         {quotation.department_stage_id === getDepartmentLoggedIn() && (
                             <button className="btn-qoutation btn-approval" onClick={handleQuotationApproval}>Submit For Approval</button>
                         )}
                        </>
                    ) : (
                        <button className="btn-qoutation" onClick={handleAddNewQoutation}>Create Quotation</button>
                    )}

                    </div>

                    <div className="row row-btn-pdf"> 
                    {props.proposalEdit && sessionStorage.getItem('proposalDetails') && (
                        <button className="btn-pdf mt-3 mr-auto" onClick={openPdfFile}>
                            View on PDF
                        </button>
                    )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default QoutationForm;
