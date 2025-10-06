import React, { useState, useEffect, useRef } from 'react'
import './DtrRemarks.css'
import { updateMultipleDtrStatus, getAllDtrWithDateRange } from '../../../store/features/dtrSlice'
import { handleConfirmation } from './../../../customs/global/alertDialog'
import { useDispatch } from 'react-redux'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min'

// this is a modal for dtr remarks
const DtrRemarks = (props) => {
  const dispatch = useDispatch()
  const [remarks, setRemarks] = useState('')

  // ✅ Reusable close function (like your camera modal)
  const closeDtrRemarksModal = () => {
    const modalElement = props.modalDtrRemarks.current
    if (modalElement) {
      const modal = Modal.getInstance(modalElement)
      if (modal) {
        // Clear remarks
        setRemarks('')

        // Move focus back to trigger button if exists
        const triggerButton = document.querySelector('[data-bs-target="#staticBackdrop"]')
        if (triggerButton) {
          triggerButton.focus()
        } else {
          document.body.focus() // fallback
        }

        // Hide the modal
        modal.hide()
      }
    }
  }

  const handleApproval = async (event, approvalStatus) => {
    event.preventDefault()

    if (!approvalStatus && !props.selectedDtr) {
      console.error('Missing parameter')
      return
    }

    handleConfirmation(
      {
        title: '',
        text: 'Are you sure you want to proceed this action',
        confirmButtonText: 'Yes',
      },
      async () => {
        let statusFilter = {}

        if (props.department === 'engineering') {
          statusFilter = {
            status: approvalStatus === 'approved' ? 'for approval' : 'reject by engineering',
            engineering_remarks: remarks,
          }
        } else {
          statusFilter = {
            status: approvalStatus === 'approved' ? 'approved' : 'reject by hr',
            hr_remarks: remarks,
          }
        }

        const { payload } = await dispatch(
          updateMultipleDtrStatus({ ...statusFilter, ids: [props.selectedDtr.id] })
        )

        if (payload.success) {
          await dispatch(
            getAllDtrWithDateRange({
              userId: props.userId,
              dtrParams: { status: [props.status] },
            })
          )

          // ✅ Close modal after success
          closeDtrRemarksModal()

          return true
        }

        closeDtrRemarksModal()
        return false
      }
    )
  }

  useEffect(() => {
    console.log('props.selectedDtr', props.selectedDtr)
  }, [])

  return (
    <>
      <div
        ref={props.modalDtrRemarks}
        className="modal fade"
        id="staticBackdrop"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Approval status
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeDtrRemarksModal}
              ></button>
            </div>
            <div className="modal-body">
              <label htmlFor="remarks" className="form-label">
                Enter your remarks
              </label>
              <textarea
                id="remarks"
                className="form-control"
                rows="5"
                placeholder="Type your remarks here..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              ></textarea>

              {props.selectedDtr?.engineering_remarks && (
                <div className="alert alert-dark mt-2" role="alert">
                  <b>Remarks :</b>
                  <p>{props.selectedDtr.engineering_remarks}</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline-success me-2"
                onClick={(e) => handleApproval(e, 'approved')}
              >
                Approve
              </button>
              <button
                className="btn btn-outline-danger me-2"
                onClick={(e) => handleApproval(e, 'rejected')}
              >
                Reject
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
                onClick={closeDtrRemarksModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DtrRemarks
