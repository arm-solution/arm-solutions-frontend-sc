import PaySlipForm from '../payslip-form/PaySlipForm'

const FullEarningModal = (props) => {

  return (
    <>
        <div ref={props.earningModalsRef} className="modal fade" id="staticBackdrop" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel"></h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <PaySlipForm _getFullEarnings={props._getFullEarnings} _userById={props._userById}/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary btn-sm">Submit</button>
                </div>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default FullEarningModal