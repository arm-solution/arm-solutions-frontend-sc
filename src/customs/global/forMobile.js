import React, { useEffect, useState} from 'react'

const checkWidth = () => {
    return window.innerWidth < 768;
  };
  
  export const useScreenWidth = () => {
    const [isWidth768, setIsWidth768] = useState(checkWidth());
  
    useEffect(() => {
      const handleResize = () => {
        setIsWidth768(checkWidth());
      };
  
      window.addEventListener('resize', handleResize); // Add event listener for window resize
  
      return () => {
        window.removeEventListener('resize', handleResize); // Clean up event listener on component unmount
      };
    }, []);
  
    return isWidth768;
  };



  