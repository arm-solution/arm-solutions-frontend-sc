import React, { useState } from "react";
import "./Announcement.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingNavbar from "../../components/landing-navigation/LandingNavbar";
import LandingFooter from "../../components/footer/LandingFooter";
import headerImage from "./../../assets/images/fire-ext.jpg";
// import headerImage from "./../../assets/images/fire-ext.jpg";

const AnnouncementPage = () => {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const announcements = [
    {
      id: 1,
      title: "Annual Safety Campaign Launch",
      date: "2024-10-08",
      category: "Safety",
      description:
        "Join us to promote fire safety awareness in your community.",
      image: "https://www.bootdey.com/image/800x300/6495ED/000000",
    },
    {
      id: 2,
      title: "New Product Line: Advanced Extinguishers",
      date: "2024-10-12",
      category: "Products",
      description: "Discover our latest range of fire extinguishers.",
      image: "https://www.bootdey.com/image/800x300/FF7F50/000000",
    },
    {
      id: 3,
      title: "Fire Drill Workshop",
      date: "2024-09-25",
      category: "Training",
      description:
        "Learn how to handle fire emergencies in our upcoming workshop.",
      image: "https://www.bootdey.com/image/800x300/FFD700/000000",
    },
  ];

  const filteredAnnouncements = announcements.filter((item) => {
    return (
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
      <div className="container my-5">
        <div className="featured-announcement card mb-5 shadow-lg">
          <img
            src="https://www.bootdey.com/image/800x300/32CD32/000000"
            className="card-img-top"
            alt="Featured Announcement"
          />
          <div className="card-body">
            <h3 className="card-title">🚨 Featured: Safety Week 2024!</h3>
            <p className="card-text">
              Be a part of our safety week to learn more about fire prevention
              and emergency protocols.
            </p>
            <button className="btn btn-primary">Learn More</button>
          </div>
        </div>
      </div>

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
        <div className="row">
          {filteredAnnouncements.map((item) => (
            <div className="col-md-6 mb-4" key={item.id}>
              <div className="card shadow-sm h-100">
                <div className="row g-0">
                  <div className="col-md-5">
                    <img
                      src={item.image}
                      className="img-fluid rounded-start h-100"
                      alt={item.title}
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="text-muted">{item.date}</p>
                      <p className="card-text">{item.description}</p>
                      <button className="btn btn-danger">Read More</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <LandingFooter />
    </>
  );
};

export default AnnouncementPage;
