import React from 'react';
import './DashboardCard.css';

const DashboardCard = (props) => {
  const { headerColor, cardIcon, cardTitle, cardValue, cardDescription } = props;

  // Define classes conditionally based on length
  const amountClass = cardValue && cardValue.toString().length > 12 ? "amount amount-small" : "amount";

  return (
    <div className="card-dashboard">
      <div
        className="card-header"
        style={{ backgroundColor: headerColor ? headerColor : '#4e73df' }}
      >
        <div className="card-icon">{cardIcon ? cardIcon : ''}</div>
        <h5 className="card-title">{cardTitle ? cardTitle : ''}</h5>
      </div>
      <div className="card-body">
        <div className={amountClass}>
          {cardValue ? cardValue : ''}
        </div>
        <p className="description">{cardDescription ? cardDescription : ''}</p>
      </div>
      <div className="card-footer">
        <center>
          <a href="#">View Details</a>
        </center>
      </div>
    </div>
  );
};

export default DashboardCard