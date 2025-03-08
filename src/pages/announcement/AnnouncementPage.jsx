import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'; 
import "./Announcement.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingNavbar from "../../components/landing-navigation/LandingNavbar";
import LandingFooter from "../../components/footer/LandingFooter";
import headerImage from "./../../assets/images/fire-ext.jpg";
import { getAllAnnouncements } from "../../store/features/announcementSlice";
import { dateFormat } from '../../customs/global/dateFormat';

const AnnouncementPage = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: allAnnouncements = [], loading: announcementLoading, message } = useSelector(state => state.announcement || {});
  
  useEffect(() => {
    dispatch(getAllAnnouncements());
  }, [dispatch]);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const sortedAnnouncements = [...allAnnouncements].sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
  const featuredAnnouncement = sortedAnnouncements[0];

  const filteredAnnouncements = sortedAnnouncements.filter((item) => {
    return (
      item.id !== featuredAnnouncement.id &&
      (filter === "All" || item.category === filter) &&
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <LandingNavbar />
      {/* Header Section */}
      <div className="overlay-container" style={{ backgroundImage: `url(${headerImage})` }}>
          <div className="text-overlay">
          COMPANY ANNOUNCEMENTS
          </div>
      </div>

      {/* Featured Announcement */}
      {featuredAnnouncement && (
        <div className="container my-5">
          <div className="featured-announcement card mb-5 shadow-lg">
            <img
              src={featuredAnnouncement.image || "https://www.bootdey.com/image/800x300/32CD32/000000"}
              className="card-img-top"
              alt="Featured Announcement"
            />
            <div className="card-body">
              <h3 className="card-title">🚨 Featured: {featuredAnnouncement.title}</h3>
              <p className="text-muted">{dateFormat(featuredAnnouncement.date_created)}</p>
              <p className="card-text">{truncateText(featuredAnnouncement.description, 150)}</p>
              <button className="btn btn-primary">Learn More</button>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="container mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <select
              className="form-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Safety">Safety</option>
              <option value="Products">Products</option>
              <option value="Training">Training</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Announcements Section */}
      <div className="container">
        {filteredAnnouncements.length === 0 && (
          <p className="text-center text-muted">No announcements found.</p>
        )}
        <div className="row">
          {filteredAnnouncements.map((item) => (
            <div className="col-md-6 mb-4" key={item.id}>
              <div className="card shadow-sm h-100">
                <div className="row g-0">
                  <div className="col-md-5">
                    <img
                      // src={item.image}
                      src={item.image || "https://www.bootdey.com/image/800x300/32CD32/000000"}
                      className="img-fluid rounded-start h-100"
                      alt={item.title}
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="text-muted">{dateFormat(item.date_created)}</p>
                      <p className="card-text">{truncateText(item.description, 100)}</p>
                      <button className="btn btn-danger">Read More</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {announcementLoading && (
        <p className="text-center text-muted">Loading announcements...</p>
      )}

      <LandingFooter />
    </>
  );
};

export default AnnouncementPage;
