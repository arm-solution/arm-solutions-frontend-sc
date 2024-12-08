import React from 'react'
import './MyAnnouncement.css'
import AnnouncementForm from '../../../components/modals-forms/announcement-form/AnnouncementForm'
import AnnouncementList from '../../../components/announcement-list/AnnouncementList'

const Announcement = () => {
  return (
    <>
          <div className="container">
      <ul className="nav nav-tabs border-bottom border-primary mt-2" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="form-tab"
            data-bs-toggle="tab"
            data-bs-target="#form"
            type="button"
            role="tab"
            aria-controls="form"
            aria-selected="true"
          >
            Announcement Form
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Announcement List
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="form"
          role="tabpanel"
          aria-labelledby="form-tab"
        >
          <AnnouncementForm /> 
        </div>
        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
          <AnnouncementList />
        </div>
      </div>
    </div>

    </>
  )
}

export default Announcement