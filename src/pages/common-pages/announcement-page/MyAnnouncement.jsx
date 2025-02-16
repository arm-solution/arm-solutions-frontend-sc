import React from 'react'
import './MyAnnouncement.css'
import AnnouncementForm from '../../../components/modals-forms/announcement-form/AnnouncementForm'
import AnnouncementList from '../../../components/announcement-list/AnnouncementList'

const Announcement = () => {
  return (
    <>
    {/* Navbar-style header */}
      <div className="px-4 py-3 text-black fw-bold fs-4 rounded" style={{ backgroundColor: "#ededed", marginBottom: "15px" }}>
      Announcement Management
    </div>

    <div className="container" style={{marginTop : "5%"}}>
      <ul className="nav nav-tabs border-bottom border-primary" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="true"
          >
            List
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="form-tab"
            data-bs-toggle="tab"
            data-bs-target="#form"
            type="button"
            role="tab"
            aria-controls="form"
            aria-selected="false"
          >
            Add New
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade"
          id="form"
          role="tabpanel"
          aria-labelledby="form-tab"
        >
          <AnnouncementForm /> 
        </div>
        <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
          <AnnouncementList />
        </div>
      </div>
    </div>

    </>
  )
}

export default Announcement