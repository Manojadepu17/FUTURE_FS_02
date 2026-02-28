import React from 'react';
import './StatCard.css';

/**
 * Statistics Card Component
 * Displays lead statistics with animated count
 */
const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="stat-card" style={{ '--card-color': color }}>
      <div className="stat-icon">
        <span>{icon}</span>
      </div>
      <div className="stat-info">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-title">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;
