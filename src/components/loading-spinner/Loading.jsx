import React from 'react';
import './Loading.css';

const Loading = () => {


  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999, // Make sure it's on top of other elements
    },
    spinner: {
      width: '60px',
      height: '60px',
      border: '6px solid #f3f3f3', // Light grey
      borderTop: '6px solid #3498db', // Blue
      borderRadius: '50%',
      animation: 'spin 1s linear infinite', // Add keyframe animation
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.spinner}></div>
    </div>
  )
}

export default Loading