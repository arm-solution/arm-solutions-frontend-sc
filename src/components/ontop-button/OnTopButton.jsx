import React, { useState, useEffect } from 'react';
import './Ontop.css';

const OnTopButton = ({ children, onClick }) => {

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
  
    useEffect(() => {
      window.addEventListener('scroll', toggleVisibility);
      return () => {
        window.removeEventListener('scroll', toggleVisibility);
      };
    }, []);


  return (
    <div className="scroll-to-top">
    {isVisible && (
      <button onClick={scrollToTop} className="scroll-button">
        <i className="lni lni-angle-double-up"></i>
      </button>
    )}
  </div>
  )
}

export default OnTopButton