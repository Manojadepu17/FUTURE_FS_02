import React from 'react';
import './LoadingSpinner.css';

/**
 * Loading Spinner Component
 * Displays animated loading indicator
 */
const LoadingSpinner = ({ size = 'medium', fullPage = false }) => {
  const spinnerClass = `spinner spinner-${size}`;

  if (fullPage) {
    return (
      <div className="spinner-overlay">
        <div className={spinnerClass}></div>
      </div>
    );
  }

  return <div className={spinnerClass}></div>;
};

export default LoadingSpinner;
