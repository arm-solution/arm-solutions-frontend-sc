import React from 'react';
import './DashboardCard.css';

const DashboardCard = (props) => {
  return (
    <div className="card-dashboard">
        <div className="card-header" style={{ backgroundColor: props.headerColor ? props.headerColor : '#4e73df' }}>
            <div className="card-icon">{ props.cardIcon ? props.cardIcon : '' }</div>
            <h5 className="card-title">{ props.cardTitle ? props.cardTitle : '' }</h5>
        </div>
        <div className="card-body">
            <div className="amount">$40,000</div>
            <p className="description">{ props.cardDescription ? props.cardDescription : '' }</p>
        </div>
        <div className="card-footer">
            <a href="#">View Details</a>
        </div>
    </div>
  )
}

export default DashboardCard